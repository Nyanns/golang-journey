---
name: api-security-hardening
description: Enterprise API security guidelines including OWASP API Top 10 2023, constant-time comparisons, anti-enumeration, strict JWT lifecycle, security headers, and defensive validation.
---

# 🛡️ API Security Hardening Standard (OWASP API Top 10 2023 & Defense-in-Depth)

> **References**: owasp.org/API-Security/editions/2023/en/0x00-header/, portswigger.net/web-security, nist.gov/sp800-63

---

## 1. ⏱️ Timing-Attack Prevention
- **Constant-Time Comparison**: Always use `crypto/subtle.ConstantTimeCompare([]byte(a), []byte(b))` for secret tokens and HMAC verification. Never use `==` on sensitive strings.
- **Dummy Bcrypt for Non-Existent Users**: When a login identifier doesn't exist in DB, still compute `bcrypt.CompareHashAndPassword(dummyHash, []byte(password))` (~70-130ms) so response time is identical regardless of user existence — eliminates **timing-based account enumeration**.

---

## 2. 🥷 OWASP API Top 10 2023 — Updated Coverage

| ID | Vulnerability | Go Mitigation |
|---|---|---|
| API1 | Broken Object Level Authorization | Verify `userID == resource.OwnerID` in every handler, not just middleware |
| API2 | Broken Authentication | Short-lived JWTs, `nbf`/`iss`/`aud` claims, Redis revocation blacklist |
| API3 | Broken Object Property Level Authorization | Explicit `Select()` in GORM, never return raw structs with all fields |
| API4 | Unrestricted Resource Consumption | `http.MaxBytesReader`, pagination with max-limit clamp, rate limiting |
| API5 | Broken Function Level Authorization | Role-based middleware, admin endpoints behind separate auth check |
| API6 | Unrestricted Access to Sensitive Business Flows | Rate limit + CAPTCHA on registration, forgot-password, payment flows |
| API7 | SSRF (Server-Side Request Forgery) | Whitelist allowed domains, never fetch user-supplied URLs directly |
| API8 | Security Misconfiguration | Security headers, non-root Docker user, localhost-only DB ports |
| API9 | Improper Inventory Management | Swagger docs, version your APIs (`/api/v1/`), deprecate old versions explicitly |
| API10 | Unsafe Consumption of APIs | Validate and sanitize third-party API responses, don't trust blindly |

---

## 3. 🔑 JWT Lifecycle & Token Security
- **Short-Lived Access Tokens**: 15-30 minutes max.
- **Strict Claims Validation**: `iss`, `aud`, `exp`, `nbf` (not-before), `iat` (issued-at).
- **Token Revocation via Redis Blacklist**: Store `jti` or token hash in Redis with TTL = token remaining lifetime. Check on every authenticated request.
- **Rotate Secrets**: Use asymmetric RS256 or EdDSA for stateless microservice scenarios. HS256 only for single-service monoliths.
- **Invalidate on Password Reset**: Always revoke all active sessions when user changes password.

---

## 4. 🌐 Defensive HTTP Headers & CSP
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 5. 🧱 Input Validation & Defense-in-Depth
- **Strict Request Binding**: Gin struct tags (`binding:"required,email,max=255"`).
- **Rate Limiting**: Atomic Redis Lua script (`INCR` + conditional `EXPIRE` only on first hit). Include RFC-standard headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`.
- **SQL Injection Defense**: Always use GORM parameterized queries. Never concatenate user input into SQL.
- **XSS Prevention**: Sanitize user-generated HTML content server-side (e.g., `bluemonday`). Enforce `Content-Type: application/json` on all API responses.

---

## 6. 🐳 Container & Infrastructure Security
- **Non-Root User**: Dockerfile runner stage must use `adduser -S appuser && USER appuser`.
- **Minimal Base Image**: Use `alpine` or `distroless` — avoid full Debian/Ubuntu base for production.
- **Localhost Port Binding**: Never expose DB/Redis ports to `0.0.0.0`. Use `127.0.0.1:5432` in `docker-compose.yml`.
- **Secrets Management**: Use Docker secrets or environment variables. Never `COPY` secret files into image layers.

---

## 7. 🔬 Slowloris & DoS Defense
Configure `http.Server` timeouts (critical — Go's default has NO timeout):
```go
server := &http.Server{
    ReadHeaderTimeout: 5 * time.Second,   // Slowloris mitigation
    ReadTimeout:       30 * time.Second,
    WriteTimeout:      30 * time.Second,
    IdleTimeout:       120 * time.Second,
    MaxHeaderBytes:    1 << 20,           // 1MB
}
```

---

## 8. 🌐 Anti-OWASP CORS Misconfiguration (Strict Origin Whitelisting)
- **The Danger**: Blindly reflecting request `Origin` with `Access-Control-Allow-Credentials: true` allows any malicious website to execute authenticated API requests using the victim's session/cookies.
- **The Mitigation**: Maintain an explicit `originSet` whitelist. Never echo untrusted origins:
  ```go
  func CORSMiddleware(allowedOrigins ...string) gin.HandlerFunc {
      originSet := make(map[string]bool)
      for _, o := range allowedOrigins { originSet[o] = true }
      return func(c *gin.Context) {
          origin := c.Request.Header.Get("Origin")
          if origin != "" && originSet[origin] {
              c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
              c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
              c.Writer.Header().Set("Vary", "Origin")
          }
          c.Next()
      }
  }
  ```

---

## 9. 🔑 Fail-Fast Cryptographic Secret Length Enforcement
- `JWT_SECRET` must be strictly enforced to ≥ 32 characters (256 bits) during startup.
- Insecure default placeholders (e.g. `"secret"`, `"password"`, `"changeme"`) must trigger immediate process termination (`os.Exit(1)`).

---

## 10. 🔒 Password Complexity & Strength Enforcement
- Enforce character diversity across 4 sets (uppercase `[A-Z]`, lowercase `[a-z]`, digits `[0-9]`, symbols `[!@#$%^&*...]`).
- Enforce strict confirmation matching using Gin's `binding:"eqfield=Password"`.
- Reject user registrations and password resets immediately at the validation layer before running expensive `bcrypt` hashing, preventing CPU exhaustion attacks.

---

## 11. 🛡️ Security Audit Trails on Authentication Events
- **Log Failed Logins (WARN)**: Record `identifier`, `ip`, and `request_id` for intrusion detection / SIEM monitoring:
  ```go
  slog.Warn("Security Audit: Failed authentication attempt", "identifier", sanitize.Log(id), "ip", sanitize.Log(c.ClientIP()), "request_id", reqID)
  ```
- **Log Success Events (INFO)**: Record user registration and login events.
- **Zero-Secret Logging Guarantee**: Never log raw passwords, hashes, reset tokens, or bearer tokens in logs.

---

## 12. ✉️ Anti-Email Header & Content Injection (CWE-093 / CWE-20)
- **Header Injection Defense**: Always validate email recipients with `net/mail.ParseAddress` and aggressively strip carriage returns (`\r`) and newlines (`\n`) from email addresses and subjects before MIME header assembly:
  ```go
  cleanTo := strings.ReplaceAll(strings.ReplaceAll(strings.TrimSpace(to), "\r", ""), "\n", "")
  cleanSubject := strings.ReplaceAll(strings.ReplaceAll(strings.TrimSpace(subject), "\r", ""), "\n", "")
  parsed, err := mail.ParseAddress(cleanTo)
  ```
- **Email Body XSS Prevention**: Always HTML-escape user parameters (`html.EscapeString(username)`) injected into HTML email templates to prevent phishing or script injection in desktop/web email clients.

---

## 13. 🪵 Anti-Log Injection & Log Forgery (CWE-117)
- **The Threat**: Attackers inject fake log entries, split log lines, or corrupt SIEM analytics via CRLF characters (`\r\n`) or terminal escape codes.
- **The Rule**: Never pass raw user inputs (`identifier`, `username`, `email`, `ip`, `c.Request.URL.Path`) directly to logger calls.
- **Sanitizer Pattern**:
  ```go
  func Log(s string) string {
      s = strings.ReplaceAll(s, "\r", "")
      s = strings.ReplaceAll(s, "\n", "")
      return strings.Map(func(r rune) rune {
          if r < 32 || r == 127 { return -1 }
          return r
      }, s)
  }
  ```

---

## 14. 🌐 DOM-Based XSS & File Preview Sanitization (CWE-079)
- **Object URL Safety**: When rendering user-uploaded file previews via `URL.createObjectURL(file)`, ensure the URL protocol is strictly verified (`blob:`):
  ```javascript
  const safePreviewUrl = previewUrl && previewUrl.startsWith('blob:') ? previewUrl : null;
  ```
- **Lifecycle Cleanup**: Always revoke object URLs on component unmount or when the file changes (`URL.revokeObjectURL(previewUrl)`) in a `useEffect` cleanup return to prevent browser memory leaks.





