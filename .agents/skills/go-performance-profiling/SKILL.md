---
name: go-performance-profiling
description: Advanced Go performance optimization, memory management, escape analysis, pprof profiling (CPU/Heap/Mutex), zero-allocation techniques, sync.Pool, and benchstat analysis.
---

# ⚡ Go Performance Engineering & Profiling Standard

Based on **Official Go Performance Guides**, **Uber Go Performance Patterns**, and **Dave Cheney High-Performance Go**.

---

## 1. 🔬 Golden Rule: "Measure, Don't Guess"
- **Zero Premature Optimization**: Never refactor for performance without establishing a verifiable baseline.
- **Statistical Benchmarking**:
  - Run benchmarks: `go test -bench=. -benchmem -count=5 > old.txt`
  - Apply changes and rerun: `go test -bench=. -benchmem -count=5 > new.txt`
  - Compare with `benchstat`: `benchstat old.txt new.txt` (must show statistically significant delta, p < 0.05).
- **Go 1.24+ Benchmark Loop**: Use `for b.Loop() { ... }` to prevent compiler dead-code elimination.

---

## 2. 🩻 Profiling with `pprof`
- **Expose Runtime Endpoints** in development/internal networks:
  ```go
  import _ "net/http/pprof"
  // Runs on debug server: http://localhost:6060/debug/pprof/
  ```
- **Diagnostic Modes**:
  - **CPU Profile**: `go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30`
  - **Heap / Allocations**: `go tool pprof -alloc_space http://localhost:6060/debug/pprof/heap`
  - **Goroutine Leaks**: `go tool pprof http://localhost:6060/debug/pprof/goroutine`
  - **Mutex & Block Contention**: `go tool pprof http://localhost:6060/debug/pprof/mutex`
- **Diffing Profiles**: `go tool pprof -base base.pprof current.pprof` to isolate memory regressions.

---

## 3. 🧠 Escape Analysis & Heap Elimination
- **Inspect Escape Decisions**:
  - `go build -gcflags="-m -m" ./...`
- **Key Escape Scenarios to Avoid in Hot Paths**:
  - Returning pointers to short-lived local structs.
  - Passing concrete structs into `any` / `interface{}` parameters (causes boxing allocation).
  - Capturing variables across long-lived closures.
  - Slices growing dynamically beyond capacity (pre-allocate with `make([]T, 0, capacity)`).

---

## 4. ♻️ Zero-Allocation Patterns & `sync.Pool`
- **Buffer & Object Reuse**:
  - Use `sync.Pool` for heavy, frequently allocated objects (`bytes.Buffer`, temporary JSON encoders):
    ```go
    var bufPool = sync.Pool{
        New: func() any { return new(bytes.Buffer) },
    }
    buf := bufPool.Get().(*bytes.Buffer)
    buf.Reset()
    defer bufPool.Put(buf)
    ```
- **String vs Byte Slices**: Avoid copying allocations when converting ASCII/UTF-8 between `[]byte` and `string` in read-only scenarios (use `unsafe.StringData` / `bytes.Equal` where appropriate).

---

## 5. 🎛️ Runtime & GC Tuning
- **GOMEMLIMIT**: Set memory target to prevent container Out-Of-Memory (OOM) kills in Docker/K8s.
- **GOGC**: Adjust GC frequency (default 100). Increase (e.g. 200) for batch throughput, decrease for low-memory constraints.
