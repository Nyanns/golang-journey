---
name: api-security-hardening
description: Enterprise API security guidelines including OWASP API Top 10, constant-time comparisons, anti-enumeration, strict JWT lifecycle, security headers, and defensive validation.
---

# 🛡️ API Security Hardening Standard (OWASP Top 10 & Defense-in-Depth)

Designed for high-security Go backends (HTB Level 10 mindset & Enterprise Standards).

---

## 1. ⏱️ Timing-Attack Prevention
- **Constant-Time Comparison**:
  - Always use `crypto/subtle.ConstantTimeCompare([]byte(tokenA), []byte(tokenB))` when comparing sensitive tokens, HMACs, or hashes.
  - Never use direct string equality (`==`) on secrets to eliminate side-channel timing attacks.

---

## 2. 🥷 Anti-Account Enumeration & Data Leakage
- **Uniform Authentication Responses**:
  - `Login`, `ForgotPassword`, `ResendVerification` must return uniform responses regardless of whether the user/email exists.
  - *Example*: Always respond with `"If your email is registered, we have sent instructions."` with indistinguishable response latency (or handled via async workers).
- **Masking Internal Errors**:
  - Never expose SQL errors, stack traces, or internal server paths in production HTTP responses. Return sanitized domain messages.

---

## 3. 🔑 JWT Lifecycle & Token Security
- **Short-Lived Access Tokens (e.g. 15m) + Secure Refresh Tokens (e.g. 7d)**.
- **Strict Claims Validation**: Validate `iss` (issuer), `aud` (audience), `exp` (expiration), and `nbf` (not before).
- **Token Blacklisting / Revocation**:
  - Store invalidated JWT IDs (`jti`) or user token versions in Redis with an expiration matching the token TTL for instantaneous revocation.

---

## 4. 🌐 Defensive HTTP Headers & CSP
- **Enforce Strict Security Headers**:
  - `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`

---

## 5. 🧱 Input Validation & Defense-in-Depth
- **Strict Request Binding**: Use Gin struct tags with rigid validation (`binding:"required,email,max=255"`).
- **Rate Limiting**: Protect authentication endpoints (`/login`, `/register`, `/forgot-password`) with IP-based and user-based rate limiters (Redis sliding window / token bucket).
- **SQL Injection Defense**: Always use parameterized queries (GORM prepared statements) — NEVER string concatenate input into SQL clauses.
