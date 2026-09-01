---
name: distributed-systems-resilience
description: Enterprise distributed systems architecture, transactional outbox pattern, distributed idempotency with Redis Lua, circuit breakers, rate limiting, and failure resilience.
---

# 🌐 Distributed Systems Architecture & Resilience Standard

Designed for high-reliability, fault-tolerant backend architectures (Sairyss System Design Patterns & Enterprise Standards).

---

## 1. 📦 Transactional Outbox Pattern (Dual-Write Solution)
```
[ Client Request ] → [ Start DB Transaction ]
                         ├── 1. Write Business Data (e.g. users, orders)
                         └── 2. Insert Event into `outbox_events` table
                     [ Commit DB Transaction ] (Atomic Guaranteed)
                                ↓
                     [ Relay Worker / Debezium / CDC ]
                     SELECT * FROM outbox_events WHERE status = 'PENDING'
                     FOR UPDATE SKIP LOCKED
                                ↓
                     [ Publish to RabbitMQ / Kafka / Redis Stream ]
                                ↓
                     [ Mark Event as 'PROCESSED' ]
```
- **Why**: Eliminates inconsistent state when message broker fails after database commit.
- **Concurrency Safety**: Always use `FOR UPDATE SKIP LOCKED` in the relay polling query to enable multiple concurrent relay workers without race conditions.

---

## 2. 🔑 Distributed Idempotency (Redis + Lua Script)
- **Problem**: Network retries causing duplicate mutations (e.g. double charging, double registration).
- **Solution**: Client passes `Idempotency-Key: <UUID>` in HTTP headers.
- **Atomic Check-and-Set with Redis Lua Script**:
  ```lua
  -- KEYS[1] = "idempotency:" .. key
  -- ARGV[1] = payload_hash, ARGV[2] = ttl_seconds
  if redis.call("EXISTS", KEYS[1]) == 1 then
      return {1, redis.call("GET", KEYS[1])} -- Already processed
  else
      redis.call("SET", KEYS[1], ARGV[1], "EX", ARGV[2])
      return {0, "OK"} -- First time execution
  end
  ```

---

## 3. ⚡ Distributed Circuit Breakers & Fallbacks
- **State Transition**: `Closed` (Normal) → `Open` (Trip on threshold failure) → `Half-Open` (Canary test).
- **Distributed State**: Use Redis-backed circuit breakers (`gobreaker-redis`) to synchronize trip states across horizontal Go pod replicas.
- **Graceful Fallbacks**: When circuit is open or downstream fails, return cached responses or informative cached fallback state instead of hanging the client.

---

## 4. 🚰 Rate Limiting & Backpressure
- **Token Bucket / Leaky Bucket**:
  - Implement Redis sliding window log or token bucket for public endpoints (`/login`, `/register`, `/api/v1/artworks/upload`).
  - Return `HTTP 429 Too Many Requests` with `Retry-After: <seconds>` header.
- **Dead Letter Queues (DLQ)**:
  - If a message fails consumption after N retries with exponential backoff + jitter, route to a DLQ for manual inspection and alerting.
