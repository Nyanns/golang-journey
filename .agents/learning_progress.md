# 📚 Learning Progress - Sandi's Go Backend Journey

## Terakhir Diupdate: 2026-09-01

## Status: Sesi 10 & Email Auth Enterprise + Anti-Slop Architecture SELESAI ✅ (Lanjut ke Sesi 11: Docker, Swagger, CI/CD)

---

## 🗂️ Struktur Folder Project

```
~/Documents/Golang_Learn/
├── 02-belajar-api-dasar/    → Contoh tutorial (dibuat oleh AI, sebagai referensi)
├── 02-api-sendiri/          → API Produk (latihan pertama, tema toko online)
├── 03-sesi1-waifu/          → SESI 1: Waifu API (GET only, ditulis sendiri)
├── 04-sesi2-manga/          → SESI 2: Manga API (GET + POST + GET by ID, ditulis sendiri)
├── 05-sesi3-gin/            → SESI 3: Anime API dengan Gin Framework (CRUD lengkap, ditulis sendiri)
├── 06-sesi4-structure/      → SESI 4: Clean Architecture (Handler-Service-Repo Pattern)
├── 07-sesi5-config/         → SESI 5: Config Management (.env, godotenv, fallback defaults)
└── 08-sesi6-database/       → SESI 6: MyAnimeTracker API (PostgreSQL + GORM + Clean Architecture)
```

---

## ✅ Konsep yang Sudah Dikuasai

### Go Fundamentals
- [x] package main, func main()
- [x] import (multiple packages, termasuk external package)
- [x] struct dengan json tags
- [x] struct dengan binding tags (`binding:"required"`)
- [x] slice of struct ([]Struct)
- [x] var global (dan paham konvensi exported vs unexported: `Animes` vs `animes`)
- [x] for range loop (dengan index `i` dan tanpa `_`)
- [x] if condition
- [x] error handling (if err != nil)
- [x] multiple return values (id, err := strconv.Atoi())
- [x] slice manipulation: append, delete (`append(s[:i], s[i+1:]...)`)

### net/http (Standar Library)
- [x] http.HandleFunc(pattern, handler)
- [x] http.ListenAndServe(":port", nil)
- [x] Handler signature: func(w http.ResponseWriter, r *http.Request)
- [x] w.Write([]byte("text")) — kirim teks biasa
- [x] w.Header().Set("Content-Type", "application/json")
- [x] w.WriteHeader(http.StatusCreated) — set status code
- [x] Perbedaan route "/" (exact) vs "/manga/" (prefix/wildcard)
- [x] r.Method == "GET" / "POST" — method checking

### Gin Framework ✨ (Sesi 3)
- [x] `go get -u github.com/gin-gonic/gin` — install external package
- [x] `gin.Default()` — membuat router dengan Logger + Recovery middleware
- [x] Paham perbedaan `gin.Default()` vs `gin.New()`
- [x] `r.GET / r.POST / r.PUT / r.DELETE` — method-specific routing
- [x] `c *gin.Context` — pengganti w + r, satu objek untuk semua
- [x] `c.JSON(statusCode, data)` — otomatis set header + encode + kirim
- [x] `c.Param("id")` — ambil path parameter dari URL (misal `/animes/:id`)
- [x] `c.ShouldBindJSON(&struct)` — decode JSON body ke struct
- [x] `gin.H{}` — shortcut untuk `map[string]any`
- [x] `binding:"required"` — validasi input otomatis oleh Gin
- [x] Paham bahwa Gin membungkus net/http, bukan menggantikan
- [x] Paham kenapa `(3 handlers)` muncul di log (Logger + Recovery + handler)
- [x] CRUD lengkap: GET all, GET by ID, POST, PUT, DELETE
- [x] Route grouping
- [x] Middleware custom (Logger)

### Clean Architecture & Project Structure (Sesi 4)
- [x] handler / service / repository pattern
- [x] Dependency injection (inject struct pointer via constructor)
- [x] Paham pemisahan tugas (Gudang = Akses Data, Koki = Logika Bisnis, Pelayan = HTTP/Gin)
- [x] Method receiver pointer `func (s *Service)` vs variable assignment
- [x] `r.Group()` untuk routing yang lebih rapi
- [x] **Architecture Decision**: Client-Side Search (filter di JS/Frontend) vs Server-Side Search (filter pakai Query di Backend). Paham kapan harus menggunakan masing-masing.

### JSON Encoding/Decoding
- [x] json.NewEncoder(w).Encode(data) — struct → JSON → kirim ke client
- [x] json.NewDecoder(r.Body).Decode(&target) — JSON dari client → struct
- [x] Paham kenapa pakai & (pointer/alamat) di Decode
- [x] c.ShouldBindJSON(&struct) — versi Gin yang lebih ringkas

### URL Parsing
- [x] strings.TrimPrefix(r.URL.Path, "/manga/") — potong URL ambil parameter (net/http)
- [x] c.Param("id") — versi Gin yang lebih clean
- [x] strconv.Atoi(str) — string ke int (untuk parse ID, masih dipakai di Gin)

### HTTP Status Codes
- [x] 200 OK (default)
- [x] 201 Created (StatusCreated)
- [x] 400 Bad Request (StatusBadRequest)
- [x] 404 Not Found (StatusNotFound)
- [x] 405 Method Not Allowed (StatusMethodNotAllowed)

### Input Validation
- [x] `binding:"required"` — field wajib diisi, Gin otomatis reject jika kosong
- [x] Paham prinsip "Never Trust the Client" — semua input harus divalidasi
- [x] Paham kenapa ID tidak pakai `binding:"required"` (karena auto-generated)

### Developer Tools
- [x] go mod init
- [x] go run main.go
- [x] go build
- [x] go get -u (download external package)
- [x] curl untuk testing API
- [x] **Postman** — API testing tool industri standar
  - [x] Buat Collection
  - [x] Send GET / POST / PUT / DELETE request
  - [x] Set Body → raw → JSON
  - [x] Baca response + status code
  - [x] Installed via tarball (bukan Snap, karena Snap crash di Linux)
  - [x] Desktop shortcut dibuat manual (`~/.local/share/applications/postman.desktop`)
- [x] gofmt / format on save di VS Code
- [x] Paham kenapa unused import dihapus otomatis oleh Go
- [x] `lsof -ti:PORT | xargs kill -9` — kill process yang pakai port tertentu

---

## ⬜ Konsep yang Belum Dipelajari (Roadmap Selanjutnya — REVISED)

> **Prinsip: 1 Sesi = 1 Teknologi = 1 Mini Project Praktik**

### Sesi 6: PostgreSQL + GORM — CRUD with DB ✅ (SELESAI)
- [x] Koneksi ke PostgreSQL via GORM (`config/database.go`)
- [x] Pemahaman Mendalam DSN (Data Source Name)
- [x] Konsep `AutoMigrate` (Code-First Database Schema)
- [x] Repository Layer (CRUD via GORM)
  - [x] `r.db.Find(&animes)` — Ambil banyak data
  - [x] `r.db.First(&anime, id)` — Ambil 1 data spesifik
  - [x] `r.db.Create(&anime)` — Tambah data baru & Auto-ID
  - [x] `r.db.Save(&anime)` — Update data
  - [x] `r.db.Delete(&models.Anime{}, id)` — Hapus data dengan struct kosong
- [x] Service Layer (Business Logic + Validation sebelum Repo)
- [x] Handler Layer (HTTP/Gin → Service)
- [x] Wiring di `main.go` (DI chain: DB → Repo → Service → Handler → Router)
- [x] Testing

### Sesi: SRE & API Resilience (Lumiina)
- Tanggal: 2026-09-01
- Konsep dipelajari: Structured Logging (slog), Graceful Shutdown (os.Signal, context.WithTimeout), Global Error Recovery, Context Timeout Middleware, Swagger Setup.
- File yang dibuat/dimodifikasi: `cmd/api/main.go`, `config/config.go`, `internal/middleware/error_handler.go`, `internal/middleware/timeout.go`
- Keputusan arsitektur: Menggunakan standard lib Go `slog` untuk logging, dan membungkus `gin-gonic` router di dalam `http.Server` standar untuk memungkinkan graceful shutdown.

### Sesi 7: Database Relations & Professional Setup 🎨 (Lumiina) ✅ (SELESAI)
> Mulai project baru: **Lumiina** — Platform sharing fan art anime (Pixiv-like)
> Mulai sesi ini, kita pakai standar industri dari HARI PERTAMA!
- [x] Setup project baru dengan Clean Architecture
- [x] **Git Flow**: Branch `main`, `develop`, dan `feature/*`
- [x] **Makefile**: `make run`, `make build`, `make test`
- [x] **golangci-lint**: Setup linter untuk jaga kualitas kode
- [x] Model: User (dengan Role: Admin & Regular), Artwork, Tag
- [x] GORM Relations (One-to-Many: User → Artworks, Many-to-Many: Artwork ↔ Tags)
- [x] Preload & Eager Loading
- [x] **Pagination** (`?page=1&limit=20`, GORM `.Offset()` & `.Limit()`)
- [x] golang-migrate (up/down migration files)
- Folder: lumiina/ (Proyek Utama)

### Sesi 8: Authentication & RBAC ✅ (SELESAI)
- [x] Register (Bcrypt) & Login (JWT).
- [x] Auth Middleware (Validasi Token `Bearer`).
- [x] RBAC Middleware (Validasi Role `admin` & `regular`).
- [x] Mendukung Login ganda (Email ATAU Username).
- [x] Memecahkan Bug Klasik Go: Bahaya `json:"-"` pada struct unmarshalling (solusi: buat `RegisterRequest`).

### Sesi 9: Core Features & Cloudinary Upload ✅ (SELESAI)
- [x] CRUD Artwork (Upload multipart/form-data).
- [x] Relasi Many-to-Many (Tags) menggunakan GORM `FirstOrCreate`.
- [x] Cloudinary Integration (SDK v2, Upload ke cloud server).
- [x] Keamanan Siber: Validasi ukuran file (Max 20MB).
- [x] Keamanan Siber: Pengecekan *Magic Bytes* (MIME type via `http.DetectContentType`) untuk mencegah ekstensi palsu (.exe disamar .jpg).
- [x] Keamanan Siber: CORS Middleware agar API bisa diakses Frontend (Vite/React).
- [x] Performa: GORM Indexing pada Foreign Key (`UserID`).
- [x] Pengenalan *Manual API Testing* via Postman sebagai fondasi QA.

### Sesi 10: Redis Caching, Comments, Security Hardening & Email Auth ✅ (SELESAI)
- [x] Setup Redis (Install via Docker).
- [x] Implementasi Rate Limiting Atomik (Redis `TxPipeline` untuk cegah Brute Force).
- [x] Implementasi Data Caching & Singleflight (Anti-Cache Stampede + Cache Invalidation).
- [x] **Sistem Komentar Artwork** (Migration 000003, B-Tree Indexes, Pagination, Selective Preload).
- [x] **Email Verification & Password Reset**:
  - [x] Database Migration 000004 (`is_verified` column di PostgreSQL).
  - [x] Gmail SMTP integration (`net/smtp`) dengan Custom Responsive HTML Email Templates (Branding Lumiina: Lumi & Ina).
  - [x] Non-blocking Asynchronous Goroutine (pengiriman email di background tanpa membuat API lemot).
  - [x] Ephemeral Tokens di Redis (TTL 24 jam untuk aktivasi email, TTL 15 menit untuk reset password).
  - [x] Cyber Defense: Anti-Account Enumeration Defense pada endpoint `forgot-password`.
- [x] **Enterprise Security Hardening**:
  - [x] HTTP Security Headers Middleware (CSP, X-Frame-Options, nosniff, Referrer-Policy).
  - [x] Trusted Proxies configuration (Anti-IP Spoofing).
  - [x] Stored XSS Input Sanitization (`html.EscapeString`).
  - [x] PostgreSQL Connection Pool Optimization (`MaxOpenConns: 100`, `MaxIdleConns: 10`).
- [x] Konsep Synchronous vs Asynchronous.
- [x] **Unit Testing Backend** menggunakan Mocking (User & Comment Service Testify Suites - 100% PASS).

### Sesi 11: Docker, Swagger, CI/CD (QA Ops)
- [ ] Containerize seluruh aplikasi dengan Docker & Docker Compose.
- [ ] Generate Swagger UI untuk dokumentasi API.
- [ ] Setup GitHub Actions (Mulai testing API secara otomatis di pipeline).

### Sesi 12: Frontend AI & E2E Testing
- [ ] AI generate Frontend Vite + React (Light Theme Pixiv).
- [ ] Integrasi ke API lokal.
- [ ] **Fase QA Automation (PROJECT TERPISAH):** Menulis script Playwright untuk E2E testing UI. Script QA akan disimpan di folder dan GitHub Repo tersendiri (contoh: `lumiina-qa-automation`) terpisah dari source code Lumiina agar standar industrinya terasa.
- [ ] **Referensi QA Roadmap:** Kita akan berpedoman penuh pada standar global [roadmap.sh/qa](https://roadmap.sh/qa) agar kamu menjadi QA utuh secara teori dan praktik (Manual, SDLC, API, Automation, CI/CD).

### 🏆 Sesi 13: Final Deployment (Lumiina MVP Selesai)
- [ ] Deploy DB ke Supabase, API ke Render, Frontend ke Vercel.
- [ ] Portofolio QA Selesai dan Siap Masuk CV! 🎉

## 🛑 Pindah ke Backlog (V2)
Fitur-fitur ini sangat bagus, tapi akan memperlambat penyelesaian MVP QA. Disimpan untuk dikerjakan nanti:
- [ ] WebSocket (Real-time notifications)
- [ ] RabbitMQ (Message Queue)
- [ ] gRPC (Inter-service communication)
- [ ] Dashboard UI Khusus Admin di Frontend
- [ ] Kontes / Art Challenge
- [ ] Remix Tree (Visualisasi karya turunan)

### 🎯 Tantangan Mandiri (Lain Waktu): GoAntri — Smart Queue Management
> Project ini untuk membuktikan bahwa Sandi bisa membangun aplikasi LENGKAP dari NOL secara MANDIRI, tanpa bimbingan. Ujian sejati seorang Mid-Level Dev.
- [ ] Backend Go API (Sandi — 100% sendiri)
- [ ] Frontend (Sandi — boleh pakai AI untuk assist)
- [ ] Full deployment

### Konsep Mendalam (Deep Dives) — Sudah Dikuasai
- [x] **Pointers (`*` & `&`)**: Paham analogi Loker (`variabel`), Amplop (`*int`), dan Minta Alamat (`&`). Paham membedakan *pass by value* vs *pass by reference* untuk efisiensi memori.
- [x] **Multiple Return Values**: Paham kenapa fungsi seperti `gorm.Open` mereturn `(*gorm.DB, error)`. Paham pentingnya error checking sebagai fondasi keamanan Go.
- [x] **Package Scope & Import**: Paham aturan import antar folder (huruf kapital) dan kenapa file di folder yang sama (`package config`) tidak perlu di-import.
- [x] **Clean Architecture Dependency Rule**: Paham aturan "Satu Arah" (Handler → Service → Repository → Models). Pantang melakukan *Circular Dependency*.
- [x] **Career Pivot Strategy (Taktik Mourinho - Pragmatic Play)**: **(UPDATE)** Strategi "Batu Loncatan": Lanjutkan belajar Go Backend (Lumina) sebagai "Senjata Rahasia" saat interview QA (Kalimat sakti: *"Saya paham cara ngetes API karena saya bisa bikin API skala industri pakai Go"*). Jika 1-2 bulan *apply* Backend buntu, LANGSUNG PIVOT belajar Katalon/Playwright selama sebulan, lalu lamar QA Automation/SDET. Profil (S1 + HTB + Go Backend) akan langsung dilirik HRD karena minimnya pelamar QA yang punya fundamental *backend* & *security* sedalam ini.
- [x] **Microservices & Security Architecture**: Paham evolusi arsitektur dari Monolitik (1 Container) ➡️ Microservices per Fitur (Stack/Cluster) ➡️ Serverless/FaaS (Level Dewa). Menguasai pola pikir *Red Teamer*: paham konsep *Blast Radius*, *Lateral Movement*, dan bagaimana memecah container dapat mengisolasi serangan RCE (Mencegah *Total System Compromise*).
- [x] **GORM & Pointers Mechanics**: Memahami bahwa `&anime` di GORM adalah pemberian "ember kosong" untuk diisi, dan pointer receiver `(r *AnimeRepository)` mencegah fotocopy memori. Serta paham keajaiban *Method Chaining* (misal `.Error`).
- [x] **Constructor & Dependency Injection**: Paham analogi "Pabrik / Bidan" (`NewAnimeRepository`) yang bertugas mencetak objek nyata dan menyuntikkan "senjata" berupa koneksi database (`db *gorm.DB`).
- [x] **High-Level Portofolio Mindset**: Mengetahui arsitektur tingkat dewa yang bisa diciptakan dengan Go (Custom Redis, Mini-Docker, Tsunami Load Tester, Custom Blockchain) berbekal dasar Networking dan Concurrency.
- [x] **REST API Response Pattern**: Paham bahwa PUT/POST sebaiknya me-return data terbaru agar Frontend tidak perlu request GET tambahan. Paham bahwa Backend itu pasif (hanya menjawab request), bukan aktif push data — kecuali pakai WebSocket.

---

## 🧠 Catatan tentang Gaya Belajar Sandi

1. **Visual learner** — butuh diagram, flowchart, analogi sebelum kode
2. **Ingin paham, bukan sekadar bisa** — selalu tanya "kenapa?" bukan "apa?"
3. **Lebih baik tulis sendiri** — minta bimbingan step-by-step, bukan copy-paste
4. **Pemula Aktif & Analitis** — bukan pemula pasif, punya inisiatif (contoh: minta pakai Postman untuk skill industri)
5. **Background kuat** — S1 Informatika, Python, JS, cybersecurity (HTB Level 10)
6. **Kecepatan belajar meningkat drastis**:
   - Sesi 1: butuh bimbingan per baris
   - Sesi 2: sudah nulis handler sendiri sebelum diinstruksikan
   - Sesi 3: nulis 5 endpoint CRUD + error handling hampir tanpa bantuan
   - Sesi 6: nulis Service Layer sendiri (CreateAnime duluan sebelum diminta), bertanya kritis soal alur data Frontend-Backend
7. **Bahasa pengantar** — campur Bahasa Indonesia + istilah teknis English
8. **Analogi favorit** — warung makan, kantor pos, satpam mall, amplop surat, lemari baju, restoran modern
9. **Murid yang sangat baik** — cepat, tapi mau paham mendalam. Kombinasi langka.
10. **Anti AI-slop** — menolak glassmorphism karena terlihat AI-generated. Preferensi desain: clean, light theme, human-crafted.
11. **Mematikan autocomplete saat belajar** — ingin benar-benar menulis sendiri tanpa bantuan IntelliSense.

---

## 📝 Bug/Error yang Pernah Dialami & Dipelajari

1. **Variable shadowing** — pakai `w` untuk loop variable padahal `w` sudah dipakai sebagai ResponseWriter
2. **Typo HandlerFunc vs HandleFunc** — `http.HandlerFunc` (tipe) vs `http.HandleFunc` (fungsi pendaftaran)
3. **Import hilang saat save** — Go auto-remove unused imports (bukan bug, fitur)
4. **Port already in use** — perlu kill process lama sebelum start baru (`lsof -ti:PORT | xargs kill -9`)
5. **`c.param` vs `c.Param`** — Go method harus huruf kapital (exported). `c.param` tidak exist → compile error
6. **Route path typo** — `/anime/:id` vs `/animes/:id` (kurang 's'). Harus konsisten dengan route lain
7. **Urutan operasi PUT** — harus set ID dulu (`updateAnimes.ID = anime.ID`) SEBELUM timpa slice (`animes[i] = updateAnimes`), bukan sebaliknya
8. **Route tanpa leading slash** — `"animes/"` harus `"/animes"`. Gin butuh `/` di depan
9. **Postman Snap crash** — Versi Snap di Linux crash karena AppArmor memblokir akses ke gnome-keyring. Solusi: install via tarball ke `~/Postman/`
10. **CORS (Cross-Origin Resource Sharing)** — React (port 5173) diblokir saat akses Go (port 8080). Solusi: Pasang middleware `gin-contrib/cors`.
11. **Trailing Slash Redirect (Gin Gotcha)** — `anime.GET("/")` dibaca Gin sebagai `/animes/`. Jika dipanggil `/animes` (tanpa slash), Gin mengirim status 301 Redirect. Redirect ini membuang header CORS dan bikin React error. Solusi: Ubah jadi `anime.GET("")`.
12. **JSON Tag Mismatch (Go vs JS)** — Struct Go pakai `Title` (huruf besar agar public), tapi punya tag `` `json:"title"` ``. Saat sampai di React, variabelnya jadi `anime.title` (huruf kecil). Memanggil `anime.Title` di JS akan `undefined` dan bikin crash.
13. **Variable Shadowing di Looping** — Kesalahan umum di Go: menggunakan nama variabel yang sama untuk parameter `anime` dan variabel loop `for i, anime := range r.animes`. Akibatnya, `anime.Title` menunjuk ke data lama, bukan data update. Solusi: Bedakan nama variabel (contoh: `updatedAnime`).
14. **Alur Return (True/False)** — Repository me-return `bool` agar Handler tahu apakah data ditemukan (200 OK) atau tidak (404 Not Found). Service hanya bertugas sebagai perantara (meneruskan return dari Repo ke Handler).

---

## 🔧 Setup & Environment Notes

- **OS**: Linux
- **Editor**: VS Code (dengan Gemini/Antigravity IDE)
- **Go Version**: 1.21+
- **Postman**: Installed via tarball di `~/Postman/Postman` (BUKAN Snap)
- **Postman Desktop Shortcut**: `~/.local/share/applications/postman.desktop`

---

## 🎨 MAIN PROJECT: Lumiina — Platform Sharing Fan Art Anime

### Tagline: "Your Art, Your World" (Mascot: Lumi & Ina)

### Konsep Utama
Platform sharing fan art anime (terinspirasi Pixiv, tapi redesign yang lebih baik).
- **Mascots**: Dua karakter ikonik bernama **Lumi** dan **Ina**.
- **Artist**: Register → Upload karya → Dapat followers → Lihat statistik
- **Viewer**: Browse artwork → Like/Bookmark → Follow artist → Komentar
- **UI/UX**: Infinite Scroll, Masonry Grid Layout (ukuran organik), Micro-interactions (Framer Motion saat hover), Skeleton Loading.

### Pembagian Kerja
- **Backend (Sandi)**: Go + Gin + GORM + PostgreSQL + Redis + WebSocket + JWT + RabbitMQ + gRPC
- **Frontend (AI)**: Vite + React + TailwindCSS + Framer Motion
- **Design**: Light theme (Pixiv-inspired redesign), anti AI-slop, performance-first
- **Deployment**: Render (API) + Supabase (DB) + Cloudinary (Images) + Vercel (Frontend)

### Dibangun Cicil-cicil dari Sesi 7-17
| Sesi | Teknologi | Fitur Lumina yang Ditambahkan |
|------|-----------|-------------------------------|
| 7 | DB Relations | Model User, Artwork, Tag + relasi + pagination |
| 8 | Auth | Register/Login artist |
| 9 | Redis | Cache popular artworks + Art Challenge leaderboard |
| 10 | Testing | Unit test & mocking (kebiasaan pro!) |
| 11 | WebSocket | Notifikasi real-time (like/follow) + Live vote Art Challenge |
| 12 | Goroutines + File Upload | Upload artwork ke Cloudinary + background resize |
| 13 | Docker | Containerize seluruh stack |
| 14 | Swagger & Git | API docs + professional git workflow |
| 15 | RabbitMQ | Async notification processing |
| 16 | gRPC | Internal Remix Tree service |
| 17 | Polish & Deploy | Frontend + deploy production |

### 🌟 Fitur Unik Lumina (Bukan Sekadar Clone Pixiv!)

#### v1 — Dibangun Bersama di Sesi 7-17:
1. **🎯 Art Challenge (Kontes Mingguan)**
   - Admin/komunitas bikin challenge bertema → Artist submit karya → Viewer vote → Leaderboard real-time → Badge pemenang
   - Teknologi: Redis (leaderboard + vote counter), WebSocket (live votes), Scheduled Jobs (auto start/end)
   - Nilai: Bikin komunitas hidup dan kompetitif, fitur yang Pixiv nggak punya

2. **🔗 Remix Tree (Karya Turunan)**
   - Dengan izin artist asli, user lain bisa bikin "remix/redraw" → Sistem bikin visual tree rantai inspirasi (Original → Remix A → Remix B)
   - Teknologi: Graph Relationships di DB (parent-child tree), gRPC internal service
   - **Visualisasi**: Obsidian-like Graph Node (pohon faktor/node interaktif). Frontend pakai React Flow atau D3.js force-directed graph. User bisa klik node, zoom, drag. Setiap node = 1 artwork dengan thumbnail.
   - Nilai: Konsep genuinely fresh, bikin komunitas kolaboratif bukan kompetitif

#### v2 — Backlog (Dikerjakan Nanti Kalau v1 Selesai):
3. **💬 Sistem Komentar (Comments)** — User bisa memberikan komentar per artwork. (Relasi One-to-Many dari Artwork ke Comments). Menggunakan `golang-migrate` sequence kedua (000002) untuk latihan migrasi bertahap.
4. **🛒 Komisi System** — Artist buka slot komisi, Client pesan artwork custom, status tracking + chat real-time
5. **⏳ Ephemeral Exhibition** — Pameran sementara yang otomatis hilang setelah X hari (Redis TTL + FOMO)
6. **🎨 Color Palette Extraction** — Auto-extract warna dominan dari artwork, search by color palette (image processing + Goroutine)

### Level Project: Mid-Level Portfolio

---

## 🎯 TANTANGAN MANDIRI (Lain Waktu): GoAntri — Smart Queue Management

> Project ini untuk membuktikan bahwa Sandi bisa membangun aplikasi LENGKAP dari NOL secara MANDIRI.
> Ujian sejati seorang Mid-Level Dev. Disimpan untuk dikerjakan setelah semua sesi selesai.

### Konsep: Aplikasi antrean digital untuk toko/klinik/barbershop.
- Backend Go API (100% sendiri)
- Frontend (boleh pakai AI assist)
- Full deployment
