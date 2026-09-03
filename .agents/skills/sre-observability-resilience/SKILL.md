---
name: sre-observability-resilience
description: Site Reliability Engineering (SRE) patterns, RED/USE metrics with Prometheus, distributed tracing with OpenTelemetry, correlation ID propagation, and graceful degradation.
---

# 📊 SRE Observability & Production Reliability Standard

Standards for enterprise observability, monitoring, metrics, and incident resilience.

---

## 1. 📈 The RED Method for HTTP APIs
- **Rate**: Number of incoming requests per second (`http_requests_total`).
- **Errors**: Number of failed requests per second (`http_requests_total{status=~"5.."}`).
- **Duration**: Latency distribution histogram (`http_request_duration_seconds_bucket`).
  - Track **p50, p95, p99** percentiles to detect tail latency anomalies.

---

## 2. 🛰️ Distributed Tracing (OpenTelemetry)
- **Context Propagation**:
  - Propagate `traceparent` headers (`W3C Trace Context`) across HTTP calls and message queues.
- **Span Granularity**:
  - Create spans for: HTTP Handler entry, Service method business operations, Database queries, Cache lookups, External API calls.
  - Attach domain tags (`user_id`, `artwork_id`, `tenant_id`) to spans for rapid incident diagnosis.

---

## 3. 🆔 Structured Logging & Correlation IDs
- **Correlation ID Middleware**:
  - Generate or extract `X-Request-ID` / `X-Correlation-ID` on incoming requests.
  - Inject correlation ID into `slog` context logger:
    ```go
    logger := slog.With("request_id", reqID, "path", c.Request.URL.Path, "method", c.Request.Method)
    ```
- **Error Breadcrumbs**: Include stack traces only on `5xx` / unhandled panic errors; use concise domain messages on `4xx`.

---

## 4. 🩺 Health Probes & Graceful Shutdown
- **Liveness Probe (`/livez`)**:
  - Returns `200 OK` if the process is alive and not deadlocked (checks basic memory/runtime).
- **Readiness Probe (`/readyz`)**:
  - Returns `200 OK` ONLY if DB connection, Redis cache, and essential downstream dependencies are healthy.
- **Graceful Shutdown Protocol**:
  ```go
  quit := make(chan os.Signal, 1)
  signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
  <-quit

  ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
  if err := srv.Shutdown(ctx); err != nil {
      slog.Error("Server forced to shutdown", "error", err)
  }
  ```

---

## 5. 📊 Prometheus Metrics Scraping (`/metrics`) & Error Envelopes
- **Prometheus Scrape Endpoint**:
  ```go
  import "github.com/prometheus/client_golang/prometheus/promhttp"
  r.GET("/metrics", gin.WrapH(promhttp.Handler()))
  ```
  Exposes runtime stats (`go_goroutines`, `go_memstats_alloc_bytes`, `go_gc_duration_seconds`).
- **Standard Error Envelopes (RFC 7807 inspired)**:
  Always bundle `request_id` into error JSON responses for cross-system customer support & log correlation:
  ```json
  {
    "error": {
      "code": "RESOURCE_NOT_FOUND",
      "message": "Artwork not found",
      "request_id": "d3b62afb-0abc-4361-af98-9915257aa909"
    }
  }
  ```

