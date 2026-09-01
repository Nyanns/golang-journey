# User Preferences & Roadmap
The user is following a Go Backend Developer roadmap ("Menuju Mid-Level Go Backend Developer").
Main project: **Lumiina** — Platform sharing fan art anime (Pixiv-like, redesigned). Mascots: Lumi & Ina.
GoAntri (Smart Queue Management) is a future personal challenge project to be built independently.

## Learning Progress
- **ALWAYS read `.agents/learning_progress.md` first** when starting a new conversation to recall what has been learned, what's next, and the user's learning style.
- Current status: Sesi 6 SEDANG BERJALAN (MyAnimeTracker — PostgreSQL + GORM + Clean Architecture)
- Sesi 7-17: Lumiina (1 sesi = 1 teknologi)
- The user prefers to **write code themselves** with step-by-step guidance, NOT copy-paste from AI.

## User Background
- S1 Informatika (Sarjana Ilmu Komputer)
- Familiar with Go, Python, and JavaScript
- Cybersecurity background — HTB Level 10
- High aptitude learner — treat them accordingly (skip basics, go deep fast)

## Project Stack
- Backend: Go (Golang) v1.21+, gin-gonic/gin, PostgreSQL, gorm or database/sql, golang-migrate, golang-jwt/jwt/v5, bcrypt
- Frontend: Vite + React + TailwindCSS
- Infra: Docker & Docker Compose

## Lumiina Frontend Preferences (AI builds the frontend)
- **Theme**: Light mode (sesuai Pixiv), BUKAN dark mode
- **Design**: Redesign Pixiv — terinspirasi tapi lebih baik dan unik, BUKAN copy
- **NO glassmorphism** — terlihat AI slop, hindari sepenuhnya
- **Animations**: Framer Motion (smooth, ringan)
- **Performance**: Cepat dan tidak berat. Prioritaskan kecepatan loading
- **Anti AI-slop**: Gunakan skill `anti-slop` untuk memastikan desain terasa human-crafted
- **Skill reference**: Gunakan skill `frontend-design` untuk design system

## Installed Agent Skills & Standards
- `context-engineering`: Token-per-task economics, observation masking (4-tier), anchored iterative compression, KV-cache optimization.
- `persistent-memory`: 3-layer memory hierarchy, first-turn protocol, `learning_progress.md` tracking, mistake journaling, structured handoffs.
- `self-improvement`: Reflexion loops (Generate→Execute→Critique→Refine), 3-part failure mining, post-session evaluation, bounded self-editing.
- `go-backend-mastery`: Uber Go style guide, clean layered architecture, GORM/Postgres patterns, concurrency safety.
- `harness-engineering`: 4-surface classification (locked/editable/append-only/human), deterministic verification gates, durable state, governance.
- `api-security-hardening`: OWASP API security, constant-time token comparison, anti-enumeration, defensive headers.
- `go-performance-profiling`: `pprof` profiling (CPU/Heap/Mutex), escape analysis, zero-alloc patterns, `sync.Pool`, `benchstat`.
- `distributed-systems-resilience`: Transactional Outbox (`FOR UPDATE SKIP LOCKED`), Redis Lua idempotency, circuit breakers.
- `database-internals-sql-tuning`: `EXPLAIN ANALYZE`, composite/partial/GIN indexing, row locking, connection pool tuning.
- `sre-observability-resilience`: RED method, OpenTelemetry tracing, `slog` correlation IDs, `/livez` & `/readyz` probes.
- `anti-slop`: Anti-AI slop standards for backend code, UI, and domain data.
- `frontend-design`: Modern UI/UX system (light mode, Pixiv blue accents, Framer Motion).

## Additional Topics (Wajib Dipelajari)
- Swagger/OpenAPI docs (swaggo/swag) — dokumentasi API profesional
- .env & config management — menggunakan godotenv atau viper
- Git workflow — conventional commits, branching strategy (feature/fix/chore)
- Testing (unit test + mocking dengan testify)
- Message Queue (RabbitMQ)
- gRPC (inter-service communication)

## Communication Style & Pedagogy
- **Visuals & Analogies**: ALWAYS use Mermaid Flowcharts and Real-world Analogies when explaining new architectural concepts, workflows, or complex logic.
- The user is a visual learner and appreciates this style for faster pattern recognition.
- **Teaching mode (Beginner Mode)**: JANGAN menganggap user sudah ahli. Ajari layaknya pemula dari awal (fresh). Selalu bimbing step-by-step super pelan. Biarkan user tulis kode sendiri. Jelaskan konsep + analogi SEBELUM user menulis kode. Jangan lompat langkah.
- **Bahasa**: Campur Bahasa Indonesia + istilah teknis English.
- **Analogi favorit**: warung makan, kantor pos, satpam mall, amplop surat, lemari baju.
