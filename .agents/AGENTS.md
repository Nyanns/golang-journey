# User Preferences & Roadmap
The user is following a Go Backend Developer roadmap ("Menuju Mid-Level Go Backend Developer").
Main project: **NijiArt** — Platform sharing fan art anime (Pixiv-like, redesigned).
GoAntri (Smart Queue Management) is a future personal challenge project to be built independently.

## Learning Progress
- **ALWAYS read `.agents/learning_progress.md` first** when starting a new conversation to recall what has been learned, what's next, and the user's learning style.
- Current status: Sesi 6 SEDANG BERJALAN (MyAnimeTracker — PostgreSQL + GORM + Clean Architecture)
- Sesi 7-17: NijiArt (1 sesi = 1 teknologi)
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

## NijiArt Frontend Preferences (AI builds the frontend)
- **Theme**: Light mode (sesuai Pixiv), BUKAN dark mode
- **Design**: Redesign Pixiv — terinspirasi tapi lebih baik dan unik, BUKAN copy
- **NO glassmorphism** — terlihat AI slop, hindari sepenuhnya
- **Animations**: Framer Motion (smooth, ringan)
- **Performance**: Cepat dan tidak berat. Prioritaskan kecepatan loading
- **Anti AI-slop**: Gunakan skill `anti-slop` untuk memastikan desain terasa human-crafted
- **Skill reference**: Gunakan skill `frontend-design` untuk design system

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
