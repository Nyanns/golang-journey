---
name: go-backend-mastery
description: Production-grade Go (Golang) backend engineering standards based on Uber Go Style Guide, Clean Layered Architecture, concurrency safety, GORM/database-sql, slog structured logging, and performance patterns. Updated with Go 1.23/1.24 features.
---

# 🚀 Go Backend Mastery & Enterprise Standards

Inspired by **Uber Go Style Guide**, **Google Go Best Practices**, **Go 1.24 Release Notes**, and **Production Clean Architecture**.

> **References**: go.dev/doc/go1.24, github.com/uber-go/guide, google.github.io/styleguide/go

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
- **Dependency Injection**: Pass dependencies explicitly via constructor functions (`NewUserService(repo UserRepository) UserService`).
- **Domain Independence**: Domain models should not leak HTTP or framework-specific luggage.

---

## 2. 🛡️ Error Handling & Context Propagation
- **Wrap with Context**: `fmt.Errorf("userRepo.FindByID failed for id %s: %w", id, err)`.
- **Custom Domain Sentinel Errors**: `var ErrNotFound = errors.New("record not found")`, check with `errors.Is(err, domain.ErrNotFound)`.
- **Context First**: Always accept `ctx context.Context` as first argument in DB and network ops.

---

## 3. ⚡ Concurrency & Goroutine Safety
- **No Goroutine Leaks**: Every goroutine must have a deterministic exit path (`ctx.Done()` or bounded worker pool).
- **Parallel Work**: Use `golang.org/x/sync/errgroup` for parallel I/O with unified error handling.
- **Race Prevention**: Protect shared memory with `sync.RWMutex` or use channel-based communication.
- **Panic Recovery**: Always add `defer func() { if r := recover(); r != nil { ... } }()` in long-running goroutines.

---

## 4. 🗄️ Database & GORM Production Practices
- **Explicit Transactions**: `db.Transaction(func(tx *gorm.DB) error { ... })` for multi-step mutations.
- **Avoid N+1 Queries**: Use `.Preload()` or targeted JOIN with `.Select("id", "username")`.
- **GORM Performance Flags**:
  - `SkipDefaultTransaction: true` — removes implicit tx wrap on single writes (~30-50% faster).
  - `PrepareStmt: true` — caches SQL execution plans per connection.
- **Connection Pool**: `MaxOpenConns(50)`, `MaxIdleConns(25)`, `ConnMaxLifetime(15m)`, `ConnMaxIdleTime(5m)`.

---

## 5. 🆕 Go 1.23 / 1.24 Modern Patterns (2024-2025)

### Swiss Tables Map Performance (Go 1.24)
Go 1.24 replaces map internals with **Swiss Tables** (Google Abseil design): ~30-60% faster lookups on large maps. Zero code changes needed — auto-applied on Go 1.24+.
```bash
# To disable for regression debugging only:
GOEXPERIMENT=noswissmap go build
```

### `os.Root` — Secure File Access (Go 1.24)
Prevents **path traversal attacks** at kernel level when handling user-uploaded files:
```go
// VULNERABLE — allows ../../etc/passwd traversal:
os.Open("/uploads/" + userFilename)

// SECURE — path traversal blocked by os.Root:
root, _ := os.OpenRoot("/uploads")
defer root.Close()
f, err := root.Open(userFilename) // ../../etc/passwd returns error
```

### `range-over-func` Iterators (Go 1.23)
```go
func Artworks(db *gorm.DB) iter.Seq[*Artwork] {
    return func(yield func(*Artwork) bool) {
        rows, _ := db.Model(&Artwork{}).Rows()
        defer rows.Close()
        for rows.Next() {
            var a Artwork
            db.ScanRows(rows, &a)
            if !yield(&a) { return }
        }
    }
}
for artwork := range Artworks(db) { process(artwork) }
```

### Tool Directives in `go.mod` (Go 1.24)
Replaces the `tools.go` blank-import hack:
```
tool (
    github.com/swaggo/swag/cmd/swag
    github.com/golangci/golangci-lint/cmd/golangci-lint
)
```
Install with: `go tool swag init -g cmd/api/main.go`

### Generic Type Aliases (Go 1.24)
```go
type APIResponse[T any] = struct {
    Data    T      `json:"data"`
    Message string `json:"message,omitempty"`
    Total   int    `json:"total,omitempty"`
}
```

---

## 6. 🪵 Logging, Metrics & Config (12-Factor App)
- **Structured Logging**: Go 1.21+ `log/slog` with JSON handler:
  ```go
  slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo})))
  slog.Info("user logged in", "user_id", user.ID, "ip", c.ClientIP())
  ```
- **Build Metadata**: `go build -ldflags="-X main.version=$(git rev-parse --short HEAD) -w -s"`
- **Config**: Load from env with `godotenv` or `viper`. Never hardcode secrets.

---

## 7. 🔬 Static Analysis & CI Quality Gates
- `go vet ./...` — mandatory on every PR.
- `go test -race ./...` — mandatory for any goroutine/shared-state code.
- `go build -json` (Go 1.24) — structured build output for CI pipelines.

---

## 8. 🚦 Fail-Fast Configuration Pattern (Zero Silent Fallbacks)
- **The Golden Rule**: An application must abort on startup (`os.Exit(1)`) rather than running with insecure or missing credentials.
- **Enkapsulasi `Validate() error`**:
  ```go
  func (c *Config) Validate() error {
      var errs []string
      if len(c.JWTSecret) < 32 {
          errs = append(errs, "JWT_SECRET must be at least 32 characters for HMAC-SHA256")
      }
      if c.CloudinaryURL == "" || !strings.HasPrefix(c.CloudinaryURL, "cloudinary://") {
          errs = append(errs, "CLOUDINARY_SECRET must start with 'cloudinary://'")
      }
      if c.DBHost == "" || c.DBName == "" {
          errs = append(errs, "DB_HOST and DB_NAME are mandatory")
      }
      if len(errs) > 0 {
          return errors.New("config validation failed:\n - " + strings.Join(errs, "\n - "))
      }
      return nil
  }
  ```
- **Prohibit Default Fallbacks for Secrets**: Never provide `"supersecret"` or `"password"` in code. Force explicit `.env` or container env declaration.

---

## 9. 📈 Prometheus Go Runtime & HTTP Metrics (`promhttp`)
- Integrate `github.com/prometheus/client_golang/prometheus/promhttp`:
  ```go
  r.GET("/metrics", gin.WrapH(promhttp.Handler()))
  ```
- Automatically exposes `go_goroutines`, `go_memstats_alloc_bytes`, `go_gc_duration_seconds` for scraping by Prometheus and visualizing in Grafana with zero overhead on hot business routes.

---

## 10. 🏛️ Architecture Decision Records (ADR) Discipline
- Every architectural choice (Clean Architecture, Redis rate limiting, database trigram indexing) must be documented in `docs/adr/`.
- Structure: **Title**, **Status** (Accepted/Proposed), **Context** (problem), **Decision** (solution & justification), **Consequences** (trade-offs).
- Kept alongside source code in version control to preserve engineering rationale across team generations.


