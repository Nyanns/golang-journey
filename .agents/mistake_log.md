# 🚨 Mistake Log — Persistent Error Journal

This file tracks recurring mistakes, their root causes, and prevention rules.
Each entry uses a 3-part failure signature (Verifier Cause → Causal Status → Abstract Mechanism).

---

<!-- Entries will be appended here as errors are encountered -->

### [2026-09-04] [Category: RUNTIME_DESYNC]
- **Context**: Testing like / unlike toggle synchronization after backend route changes.
- **Error**: Frontend state was inverted / unable to cancel like because `is_liked` always returned `false`.
- **Root Cause**: Go server was launched as a daemon task (`go run cmd/api/main.go`) earlier in the session. Edits to Go files do not hot-reload running binaries. The server was executing stale compiled code.
- **Fix Applied**: Terminated stale daemon task (`manage_task kill`), ran `go build ./...`, and relaunched server daemon.
- **Prevention Rule**: Whenever `.go` files are modified in a project without air/hot-reload, immediately kill the old daemon task and restart with the recompiled binary before browser testing.
- **Files Affected**: `cmd/api/main.go`, `internal/handler/artwork_handler.go`

### [2026-09-04] [Category: ARCHITECTURE_MISTAKE]
- **Context**: JWT claims extraction in Gin context across authentication and business logic handlers.
- **Error**: HTTP 401 Unauthorized returned on `POST /artworks/:id/like` for authenticated users.
- **Root Cause**: Handler performed strict type assertion `userIDVal.(float64)`. When JWT claims or context held a different numeric representation or missing type check, it returned 401. The frontend response interceptor reacted to 401 by immediately wiping `lumiina_token` from `localStorage`, causing silent cascading logouts.
- **Fix Applied**: Replaced direct type assertion with a defensive `switch v := userIDVal.(type)` covering `float64`, `uint`, `int`, `int64`.
- **Prevention Rule**: Never assume single concrete type for unmarshaled numeric claims in Go context. Always write defensive type switch helpers (`extractCurrentUserID`).
- **Files Affected**: `internal/handler/like_handler.go`, `internal/handler/artwork_handler.go`

### [2026-09-04] [Category: RUNTIME_PANIC]
- **Context**: Rendering error messages on React authentication forms (LoginPage & RegisterPage).
- **Error**: `Uncaught Error: Objects are not valid as a React child (found: object with keys {code, message, request_id}).`
- **Root Cause**: Backend uses standardized RFC 7807 JSON error responses (`{"error": {"code": "...", "message": "..."}}`). Frontend code directly rendered `{error}` where `error = err.response?.data?.error` (an object, not a string).
- **Fix Applied**: Safely extracted string via `typeof errPayload === 'object' ? errPayload.message || errPayload.code : errPayload`.
- **Prevention Rule**: When handling API errors in frontend components, always sanitize the payload to guaranteed string before passing to React JSX.
- **Files Affected**: `web/src/pages/LoginPage.jsx`, `web/src/pages/RegisterPage.jsx`

### [2026-09-05] [Category: SECURITY_AUDIT_HARDENING]
- **Context**: SQL ORDER BY clauses, session revocation epoch check, and CSP hardening.
- **Error**: `fmt.Sprintf` in SQL clause order, session revocation key set in Redis during password reset but never checked in `AuthMiddleware`, and `unsafe-inline` in CSP.
- **Root Cause**:
  1. String interpolation `fmt.Sprintf` in SQL queries creates bad precedents and vulnerability vectors.
  2. Redis revocation key (`user_revocation:<id>`) was stored on password reset, but `AuthMiddleware` omitted comparing token `iat` against this epoch.
  3. CSP header included `'unsafe-inline'` in `script-src`, weakening XSS defenses.
- **Fix Applied**:
  1. Parameterized GORM ORDER BY expressions with `gorm.Expr("...", userID)`.
  2. Added Redis epoch comparison in `AuthMiddleware`: aborts request if `iat < epoch`.
  3. Hardened CSP to `script-src 'self'`.
- **Prevention Rule**:
  1. Never use `fmt.Sprintf` for SQL query construction under any circumstances — always use `?` placeholders or `gorm.Expr`.
  2. Every revocation mechanism written in service layers must have a corresponding verification step in the authentication middleware.
  3. Keep CSP policies as restrictive as possible, omitting `unsafe-inline` from script execution contexts.
- **Files Affected**: `internal/repository/artwork_repository.go`, `internal/middleware/auth_middleware.go`, `internal/middleware/security_headers.go`

