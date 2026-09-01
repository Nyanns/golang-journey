---
name: go-backend-mastery
description: Production-grade Go (Golang) backend engineering standards based on Uber Go Style Guide, Clean Layered Architecture, concurrency safety, GORM/database-sql, slog structured logging, and performance patterns.
---

# 🚀 Go Backend Mastery & Enterprise Standards

Inspired by **Uber Go Style Guide**, **Google Go Best Practices**, and **Production Clean Architecture**.

---

## 1. 🏛️ Layered Clean Architecture (Decoupling)
```
[ HTTP / Controller Layer ] (Gin handlers, request binding, HTTP status codes, JSON responses)
           ↓
[ Service / Usecase Layer ] (Pure business logic, validation rules, transaction boundary)
           ↓
[ Repository Layer ] (DB queries, GORM/sqlx, interfaces defined at consumer package)
           ↓
[ Database / Cache ] (PostgreSQL, Redis)
```

- **Interface Segregation**: Define interfaces where they are **consumed**, not where they are implemented.
  - *Example*: `UserService` defines `type UserRepository interface { ... }`.
- **Dependency Injection**: Pass dependencies explicitly via constructor functions (`NewUserService(repo UserRepository) UserService`).
- **Domain Independence**: Domain models (`User`, `Artwork`, `Comment`) should not leak HTTP or framework-specific luggage.

---

## 2. 🛡️ Error Handling & Context Propagation
- **Wrap with Context**: Never swallow or blindly return `err`. Use `fmt.Errorf("userRepo.FindByID failed for id %s: %w", id, err)`.
- **Custom Domain Sentinel Errors**:
  - `var ErrNotFound = errors.New("record not found")`
  - `var ErrUnauthorized = errors.New("unauthorized access")`
  - Check with `errors.Is(err, domain.ErrNotFound)`.
- **Context First**: Always accept `ctx context.Context` as the first argument in database and network operations (`FindByID(ctx context.Context, id uint) (*User, error)`).

---

## 3. ⚡ Concurrency & Goroutine Safety
- **No Goroutine Leaks**: Every spawned goroutine must have a deterministic exit path (listening on `ctx.Done()` or bounded by a worker pool).
- **Parallel Work Coordination**: Use `golang.org/x/sync/errgroup` for parallel I/O with unified error handling and context cancellation.
- **Race Condition Prevention**: Protect shared memory with `sync.RWMutex` or eliminate shared state by communicating via channels.
- **Never Run Naked Goroutines in HTTP Handlers** without error recovery or panic trapping (`defer func() { if r := recover(); r != nil { ... } } ()`).

---

## 4. 🗄️ Database & GORM Production Practices
- **Explicit Transactions**: Use explicit `db.Transaction(func(tx *gorm.DB) error { ... })` for multi-step mutations.
- **Avoid N+1 Queries**: Use `.Preload()` or targeted JOIN queries with select fields (`.Select("id", "username", "email")`).
- **Database Migrations**: Keep SQL schema changes in versioned migrations (`golang-migrate` files: `000001_xxx.up.sql` / `down.sql`).
- **Connection Pool Tuning**: Configure `SetMaxOpenConns`, `SetMaxIdleConns`, and `SetConnMaxLifetime` appropriately.

---

## 5. 🪵 Logging, Metrics & Config (12-Factor App)
- **Structured Logging**: Use Go 1.21+ `log/slog` with JSON handler for production-ready logs:
  - `slog.Info("user logged in", "user_id", user.ID, "ip", c.ClientIP())`
  - `slog.Error("failed to process image", "error", err, "artwork_id", artworkID)`
- **Configuration Management**: Strictly load configurations from `.env` or environment variables via structured configs (e.g. `viper` or `godotenv`).
