---
name: database-internals-sql-tuning
description: Production PostgreSQL query optimization, execution plan analysis (EXPLAIN ANALYZE), index design (B-Tree/GIN/Partial/BRIN), lock contention mitigation, pg_trgm fuzzy search, and connection pool sizing. Updated with PostgreSQL 16/17 features.
---

# 🗄️ Database Internals & PostgreSQL Query Tuning Standard

> **References**: postgresql.org/docs/current/, use-the-index-luke.com, pganalyze.com/blog, dalibo.github.io/pev2

---

## 1. 🔍 Query Plan Analysis (`EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)`)
- **Key Metrics to Inspect**:
  - **Sequential Scans (`Seq Scan`)**: Red flag on large tables — indicates missing index on predicate columns.
  - **Index Scan vs Index Only Scan**: `Index Only Scan` is fastest — PostgreSQL reads only the index B-tree, not the heap.
  - **Buffer Hits**: `shared read` = disk I/O (slow), `shared hit` = RAM cache (fast). Tune `shared_buffers` (PostgreSQL) if too many reads.
  - **Cost Discrepancy**: `(cost=X..Y)` vs `(actual time=...)` — wide gap = stale statistics. Fix: `ANALYZE table_name;`.
- **Visualization**: Use [PEV2](https://explain.dalibo.com) to visualize JSON query plans (`EXPLAIN (ANALYZE, FORMAT JSON)`).

---

## 2. 📇 Index Engineering & Best Practices

### B-Tree Composite Index — Column Ordering
- Equality columns go **first** in composite indexes:
  ```sql
  -- Query: WHERE status = 'ACTIVE' AND created_at > '2024-01-01'
  -- Correct: equality (status) first, range (created_at) second
  CREATE INDEX idx_artworks_status_created ON artworks (status, created_at DESC);
  ```

### Partial Indexes — Surgical Precision
```sql
-- Index only unverified users (tiny working set, massive size savings)
CREATE INDEX idx_unverified_users ON users (created_at) WHERE is_verified = false;

-- Index only published artworks for feed queries
CREATE INDEX idx_published_artworks ON artworks (created_at DESC, likes_count DESC)
WHERE status = 'PUBLISHED';
```

### GIN Indexes — Full-Text Search & JSONB
```sql
-- Fuzzy search via pg_trgm (trigram similarity) — supports ILIKE fast:
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_artworks_title_trgm ON artworks USING GIN (title gin_trgm_ops);
CREATE INDEX idx_users_username_trgm ON users USING GIN (username gin_trgm_ops);

-- JSONB containment query:
CREATE INDEX idx_artworks_metadata ON artworks USING GIN (metadata jsonb_path_ops);
```

### BRIN Indexes — Append-Only Time-Series Tables (PostgreSQL 9.5+)
```sql
-- Extremely small index for timestamp columns in append-only tables (e.g. logs, notifications):
CREATE INDEX idx_notifications_created_brin ON notifications USING BRIN (created_at);
-- 300x smaller than B-Tree for sequential inserts. Perfect for audit logs / activity feeds.
```

### Never Index Low-Cardinality Booleans
- `is_active` where 99% are `true` — the planner will prefer Seq Scan anyway. Waste of space.
- Use **partial index** instead: `WHERE is_active = false` (indexes only the minority rows).

---

## 3. 🔒 Concurrency, Locking & Deadlock Elimination
- **Row-Level Locking**: `SELECT ... FOR UPDATE` for state transitions, `FOR UPDATE SKIP LOCKED` for queues.
- **Consistent Lock Ordering**: Always acquire locks in sorted `id ASC` order to prevent deadlocks between concurrent transactions.
- **Short Transactions**: Never make HTTP calls, send emails, or call external services inside open DB transactions.
- **Advisory Locks** (PostgreSQL): `SELECT pg_try_advisory_xact_lock(user_id)` — distributed mutex without external Redis for single-node scenarios.

---

## 4. 🏊 Connection Pool Sizing & Saturation
- **Formula**: `Max Connections ≈ (CPU Core Count × 2) + Effective Spindle Count`
  - More connections ≠ more speed. Excess connections = OS context-switching overhead + memory starvation.
- **Go `sql.DB` / GORM Pool Configuration**:
  ```go
  sqlDB.SetMaxOpenConns(50)
  sqlDB.SetMaxIdleConns(25)
  sqlDB.SetConnMaxLifetime(15 * time.Minute)
  sqlDB.SetConnMaxIdleTime(5 * time.Minute)
  ```
- **PGBouncer**: Use Transaction Pooling mode when running 100+ concurrent microservice instances.

---

## 5. 🆕 PostgreSQL 16/17 Notable Features (2024-2025)

### Parallel Query Improvements (PG 16)
- `FULL JOIN` now supports parallel execution.
- `DISTINCT` aggregations can run in parallel mode.
- Force parallel for testing: `SET max_parallel_workers_per_gather = 4;`

### Logical Replication Enhancements (PG 16)
- Subscribers can now run DML (`UPDATE`/`DELETE`) during logical replication.
- Useful for zero-downtime migrations and multi-region read replicas.

### `VACUUM` Tuning — Prevent Table Bloat
```sql
-- Per-table vacuum tuning for high-write tables:
ALTER TABLE artworks SET (
    autovacuum_vacuum_scale_factor = 0.01,   -- Trigger at 1% dead tuples (default 20%)
    autovacuum_analyze_scale_factor = 0.005  -- Trigger ANALYZE at 0.5% changes
);
```

### `pg_stat_io` View (PG 16) — I/O Visibility
```sql
-- See exactly where your I/O time is going:
SELECT backend_type, object, reads, writes, read_time, write_time
FROM pg_stat_io
ORDER BY read_time DESC;
```

---

## 6. 🩺 Health & Monitoring Queries
```sql
-- Find slow queries (requires pg_stat_statements):
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC LIMIT 10;

-- Find unused indexes (wasting RAM & disk):
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND indexname NOT LIKE '%_pkey';

-- Check table bloat (dead tuple ratio):
SELECT relname, n_dead_tup, n_live_tup,
       round(n_dead_tup::numeric / NULLIF(n_live_tup + n_dead_tup, 0) * 100, 2) AS dead_pct
FROM pg_stat_user_tables
ORDER BY dead_pct DESC;
```

---

## 7. 🐢 Application Slow Query Logging & Migration Tracking
- **GORM Slow Query Threshold**:
  Configure ORM logger to log any query taking > 200ms at `WARN` level:
  ```go
  gormLogger := logger.New(
      log.New(os.Stdout, "\r\n", log.LstdFlags),
      logger.Config{
          SlowThreshold:             200 * time.Millisecond,
          LogLevel:                  logger.Warn,
          IgnoreRecordNotFoundError: true,
      },
  )
  ```
- **Migration Tracking Visibility**:
  `golang-migrate` tracks applied migrations in the `schema_migrations` table (`version`, `dirty`). Always expose CLI targets to check the live database version:
  ```makefile
  migrate-version:
      migrate -path db/migrations -database "$$DATABASE_URL" version
  ```




