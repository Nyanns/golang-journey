---
name: database-internals-sql-tuning
description: Production PostgreSQL query optimization, execution plan analysis (EXPLAIN ANALYZE), index design (B-Tree/GIN/Partial), lock contention mitigation, and connection pool sizing.
---

# 🗄️ Database Internals & PostgreSQL Query Tuning Standard

High-throughput PostgreSQL and SQL optimization patterns for senior backend engineers.

---

## 1. 🔍 Query Plan Analysis (`EXPLAIN (ANALYZE, BUFFERS)`)
- **Key Metrics to Inspect**:
  - **Sequential Scans (`Seq Scan`)**: Red flag on large tables; indicates missing or unindexed search predicates.
  - **Index Scan vs Index Only Scan**: `Index Only Scan` is the fastest because PostgreSQL doesn't read the table heap.
  - **Buffer Hits**: High `shared read` indicates disk I/O; high `shared hit` indicates RAM cache efficiency.
  - **Cost Estimation vs Actual Time**: Wide discrepancy indicates stale statistics (`ANALYZE table_name;`).

---

## 2. 📇 Index Engineering & Best Practices
- **B-Tree Composite Index Column Ordering**:
  - Place equality columns first (`WHERE status = 'ACTIVE' AND created_at > ...` → `INDEX (status, created_at)`).
  - High-cardinality columns first for equality filters.
- **Partial Indexes**:
  - Index only relevant subsets to save disk space and RAM:
    ```sql
    CREATE INDEX idx_unverified_users ON users (created_at) WHERE is_verified = false;
    ```
- **GIN & GiST Indexes**:
  - Use `GIN` for JSONB containment (`@>`), full-text search (`tsvector`), and tag arrays (`tags text[]`).
- **Never Index Low-Cardinality Booleans Wholesale** (e.g. `is_active` where 99% are true).

---

## 3. 🔒 Concurrency, Locking & Deadlock Elimination
- **Row-Level Locking**:
  - Use `SELECT ... FOR UPDATE` for transactional state transitions.
  - Use `FOR UPDATE SKIP LOCKED` for worker queues.
- **Consistent Lock Ordering**:
  - Always acquire row locks in deterministic order (e.g. sorted by `id ASC`) to eliminate deadlocks between concurrent transactions.
- **Transaction Scope**:
  - Keep transactions as short as possible. Never make network/HTTP calls or send emails inside open database transactions.

---

## 4. 🏊 Connection Pool Sizing & Saturation
- **Formula**: `Max Connections ≈ (Core Count * 2) + Disk Spindle Count`.
  - More connections do NOT mean more speed; excessive connections cause context switching and memory starvation.
- **Go `sql.DB` / GORM Pool Configuration**:
  ```go
  sqlDB.SetMaxOpenConns(25)
  sqlDB.SetMaxIdleConns(10)
  sqlDB.SetConnMaxLifetime(15 * time.Minute)
  sqlDB.SetConnMaxIdleTime(5 * time.Minute)
  ```
- **PGBouncer**: Use external connection poolers (Transaction Pooling mode) for workloads exceeding 100+ concurrent Go microservice instances.
