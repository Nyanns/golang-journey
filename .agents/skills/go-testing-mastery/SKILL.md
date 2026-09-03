---
name: go-testing-mastery
description: Production Go testing standards including table-driven tests, testify mocking, integration tests with real DB, coverage enforcement, and fuzz testing. Based on Go testing best practices and testify v1.9+ patterns.
---

# 🧪 Go Testing Mastery — Unit, Integration & Fuzz

> **References**: pkg.go.dev/testing, github.com/stretchr/testify, go.dev/doc/fuzz, go.dev/blog/table-driven-tests

---

## 1. 📐 Table-Driven Tests — The Go Standard

```go
func TestCreateUser(t *testing.T) {
    tests := []struct {
        name    string
        input   CreateUserRequest
        wantErr bool
        errType error
    }{
        {name: "valid user", input: CreateUserRequest{Username: "sandi", Email: "sandi@example.com", Password: "SecurePass123!"}},
        {name: "duplicate email", input: CreateUserRequest{Username: "other", Email: "sandi@example.com", Password: "Pass123!"}, wantErr: true, errType: domain.ErrConflict},
        {name: "empty username", input: CreateUserRequest{Username: "", Email: "a@b.com", Password: "Pass123!"}, wantErr: true},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel()
            svc := setupUserService(t)
            _, err := svc.CreateUser(context.Background(), tt.input)
            if tt.wantErr {
                require.Error(t, err)
                if tt.errType != nil { require.ErrorIs(t, err, tt.errType) }
                return
            }
            require.NoError(t, err)
        })
    }
}
```

---

## 2. 🎭 Mocking with Testify (mockery)

```bash
# Generate mock for interface:
mockery --name=UserRepository --dir=./internal/domain --output=./internal/mocks --outpkg=mocks
```

```go
func TestUserService_GetByID(t *testing.T) {
    mockRepo := new(mocks.UserRepository)
    expectedUser := &domain.User{ID: 1, Username: "sandi"}
    mockRepo.On("FindByID", mock.Anything, uint(1)).Return(expectedUser, nil)

    svc := service.NewUserService(mockRepo)
    user, err := svc.GetByID(context.Background(), 1)

    require.NoError(t, err)
    assert.Equal(t, "sandi", user.Username)
    mockRepo.AssertExpectations(t) // Fail if expected calls were not made
}
```

---

## 3. 🏗️ Integration Tests — Real PostgreSQL (testcontainers-go)

```go
func TestArtworkRepo_Integration(t *testing.T) {
    if testing.Short() { t.Skip("skip integration") }
    ctx := context.Background()
    pg, _ := postgres.RunContainer(ctx,
        testcontainers.WithImage("postgres:16-alpine"),
        postgres.WithDatabase("testdb"), postgres.WithUsername("test"), postgres.WithPassword("test"),
    )
    defer pg.Terminate(ctx)
    connStr, _ := pg.ConnectionString(ctx, "sslmode=disable")
    db, _ := gorm.Open(gormpg.Open(connStr), &gorm.Config{})
    db.AutoMigrate(&domain.Artwork{})
    repo := repository.NewArtworkRepository(db)
    // ... real DB assertions
}
```

```bash
go test ./... -run Integration -v    # Only integration tests
go test ./... -short                 # Skip integration tests
```

---

## 4. 🎯 assert vs require

| Function | Behavior | Use When |
|---|---|---|
| `assert.Equal` | Continues on failure | Non-critical checks |
| `require.NoError` | Stops test immediately | After ops that MUST succeed |
| `require.ErrorIs` | Stops + checks error type | Verifying sentinel errors |

**Rule**: Use `require` when subsequent assertions would be meaningless after a failure.

---

## 5. 🌊 Fuzz Testing (Go 1.18+)

```go
func FuzzParseTag(f *testing.F) {
    f.Add("action")
    f.Add("sci-fi")
    f.Fuzz(func(t *testing.T, tag string) {
        result, _ := ParseTag(tag)
        if result != "" && len(result) > 100 {
            t.Errorf("tag too long: %d chars", len(result))
        }
    })
}
```
```bash
go test -fuzz=FuzzParseTag -fuzztime=30s ./...
```

---

## 6. 📊 Coverage Gates

```bash
go test -cover -coverprofile=coverage.out ./...
go tool cover -html=coverage.out           # HTML report
go tool cover -func=coverage.out           # Per-function breakdown
```

**Minimum targets**: Service ≥ 80%, Repository ≥ 70%, Handler ≥ 60%.

---

## 7. 🚀 HTTP Handler Tests (httptest)

```go
func TestArtworkHandler_Create(t *testing.T) {
    gin.SetMode(gin.TestMode)
    mockSvc := new(mocks.ArtworkService)
    mockSvc.On("Create", mock.Anything, mock.AnythingOfType("domain.CreateArtworkRequest")).
        Return(&domain.Artwork{ID: 1, Title: "Lumi Fan Art"}, nil)

    handler := handler.NewArtworkHandler(mockSvc)
    router := gin.New()
    router.POST("/artworks", handler.Create)

    body := `{"title":"Lumi Fan Art","description":"test","tags":["fan-art"]}`
    req := httptest.NewRequest(http.MethodPost, "/artworks", strings.NewReader(body))
    req.Header.Set("Content-Type", "application/json")
    w := httptest.NewRecorder()
    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusCreated, w.Code)
    mockSvc.AssertExpectations(t)
}
```
