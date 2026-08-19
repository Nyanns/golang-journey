# 📚 Learning Progress - Sandi's Go Backend Journey

## Terakhir Diupdate: 2026-08-18

## Status: Sesi 6 SELESAI ✅ (Lanjut ke Sesi 7 NijiArt)

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
- [x] Testing CRUD via Postman

### Sesi 7: Database Relations & Professional Setup 🎨 (NijiArt)
> Mulai project baru: **NijiArt** — Platform sharing fan art anime (Pixiv-like)
> Mulai sesi ini, kita pakai standar industri dari HARI PERTAMA!
- [ ] Setup project baru dengan Clean Architecture
- [ ] **Git Flow**: Branch `main`, `develop`, dan `feature/*`
- [ ] **Makefile**: `make run`, `make build`, `make test`
- [ ] **golangci-lint**: Setup linter untuk jaga kualitas kode
- [ ] Model: User, Artwork, Tag
- [ ] GORM Relations (One-to-Many: User → Artworks, Many-to-Many: Artwork ↔ Tags)
- [ ] Preload & Eager Loading
- [ ] **Pagination** (`?page=1&limit=20`, GORM `.Offset()` & `.Limit()`)
- [ ] golang-migrate (up/down migration files)
- Folder: `09-sesi7-relations/`

### Sesi 8: Authentication (JWT + Bcrypt) 🎨 (NijiArt)
- [ ] Model: User (username, email, password_hash, bio, avatar_url)
- [ ] Register (hash password dengan bcrypt)
- [ ] Login (validasi password → generate JWT Token)
- [ ] Auth Middleware (cek token di setiap request)
- [ ] Protected routes (upload artwork) vs Public routes (browse artwork)
- Folder: `10-sesi8-auth/`

### Sesi 9: Redis (Caching) 🎨 (NijiArt)
- [ ] Install & jalankan Redis (via Docker)
- [ ] Cache popular artworks & trending tags
- [ ] GET: cek cache → miss → ambil dari DB → simpan ke cache
- [ ] Cache invalidation (hapus cache saat POST/PUT/DELETE)
- [ ] TTL (Time To Live)
- Folder: `11-sesi9-redis/`

### Sesi 10: Testing (Unit Test + Mocking) 🎨 (NijiArt)
> Dipindah ke sini agar kebiasaan menulis test terbentuk lebih awal!
- [ ] Go testing basics (`_test.go`, `go test`)
- [ ] Table-driven tests
- [ ] Mocking dengan testify/mock
- [ ] Test coverage
- [ ] Praktik: test Service Layer & Handler Layer NijiArt
- Folder: `12-sesi10-testing/`

### Sesi 11: WebSocket (Real-time) 🎨 (NijiArt)
- [ ] Client connect via WebSocket
- [ ] Real-time notification: "Ada yang like karya kamu!"
- [ ] Server broadcast pesan ke semua client
- [ ] Handling connect/disconnect
- [ ] Menulis test untuk WebSocket handler
- Folder: `13-sesi11-websocket/`

### Sesi 12: Goroutines, Concurrency & File Upload 🎨 (NijiArt)
> Upload gambar ke Cloudinary + background processing
- [ ] goroutine basics (go func)
- [ ] Channels untuk komunikasi antar goroutine
- [ ] WaitGroup & Mutex
- [ ] **File Upload**: Multipart form upload di Gin
- [ ] **Cloudinary**: Upload gambar → dapat URL → simpan URL ke DB
- [ ] Praktik: user upload artwork → goroutine resize thumbnail di background
- Folder: `14-sesi12-goroutines/`

### Sesi 13: Docker & Docker Compose 🎨 (NijiArt)
- [ ] Dockerfile untuk Go app
- [ ] docker-compose.yml (Go + PostgreSQL + Redis)
- [ ] Multi-stage build
- [ ] Environment variables di Docker
- Folder: `15-sesi13-docker/`

### Sesi 14: Swagger API Docs & CI/CD Pipeline 🎨 (NijiArt)
- [ ] Swagger annotations & generate docs
- [ ] Serve Swagger UI
- [ ] **CI/CD**: Setup GitHub Actions workflow
- [ ] Auto-run `make test` & `golangci-lint` setiap kali Pull Request ke `develop`
- Folder: `16-sesi14-swagger-cicd/`

### Sesi 15: Message Queue (RabbitMQ) 🎨 (NijiArt)
- [ ] Install & jalankan RabbitMQ (via Docker)
- [ ] Producer & Consumer pattern
- [ ] Publish event saat ada artwork baru → consumer kirim notifikasi
- [ ] Dead Letter Queue (handling failed messages)
- [ ] Praktik: async notification processing untuk NijiArt
- Folder: `17-sesi15-rabbitmq/`

### Sesi 16: gRPC (Inter-service Communication) 🎨 (NijiArt)
- [ ] Protocol Buffers (protobuf) — define service & message
- [ ] Unary RPC (request-response biasa)
- [ ] Server Streaming RPC
- [ ] gRPC vs REST — kapan pakai yang mana
- [ ] Praktik: internal artwork recommendation service via gRPC
- Folder: `18-sesi16-grpc/`

### 🏆 Sesi 17: FINAL — NijiArt Polish & Deploy
> NijiArt sudah dibangun cicil-cicil dari Sesi 7-16. Sekarang saatnya menyempurnakan!
- [ ] Code review & refactor seluruh codebase
- [ ] Frontend: Vite + React + TailwindCSS + Framer Motion (AI bantu buat)
- [ ] Full integration Backend + Frontend
- [ ] Deploy: Render (API) + Supabase (DB) + Cloudinary (Images) + Vercel (Frontend)
- [ ] Final testing & demo

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
- [x] **Career Pivot Strategy**: Paham nilai lebih dari latar belakang S1 + HTB Level 10 (Cybersecurity) di ekosistem Go, dan jalur *pivot* yang menjanjikan (SDET, SOC, AppSec/DevSecOps).
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

## 🎨 MAIN PROJECT: NijiArt — Platform Sharing Fan Art Anime

### Tagline: "Your Art, Your World"

### Konsep Utama
Platform sharing fan art anime (terinspirasi Pixiv, tapi redesign yang lebih baik).
- **Artist**: Register → Upload karya → Dapat followers → Lihat statistik
- **Viewer**: Browse artwork → Like/Bookmark → Follow artist → Komentar

### Pembagian Kerja
- **Backend (Sandi)**: Go + Gin + GORM + PostgreSQL + Redis + WebSocket + JWT + RabbitMQ + gRPC
- **Frontend (AI)**: Vite + React + TailwindCSS + Framer Motion
- **Design**: Light theme (Pixiv-inspired redesign), anti AI-slop, performance-first
- **Deployment**: Render (API) + Supabase (DB) + Cloudinary (Images) + Vercel (Frontend)

### Dibangun Cicil-cicil dari Sesi 7-17
| Sesi | Teknologi | Fitur NijiArt yang Ditambahkan |
|------|-----------|-------------------------------|
| 7 | DB Relations | Model User, Artwork, Tag + relasi + pagination |
| 8 | Auth | Register/Login artist |
| 9 | Redis | Cache popular artworks |
| 10 | Testing | Unit test & mocking (kebiasaan pro!) |
| 11 | WebSocket | Notifikasi real-time (like/follow) |
| 12 | Goroutines + File Upload | Upload artwork ke Cloudinary + background resize |
| 13 | Docker | Containerize seluruh stack |
| 14 | Swagger & Git | API docs + professional git workflow |
| 15 | RabbitMQ | Async notification processing |
| 16 | gRPC | Internal recommendation service |
| 17 | Polish & Deploy | Frontend + deploy production |

### Level Project: Mid-Level Portfolio

---

## 🎯 TANTANGAN MANDIRI (Lain Waktu): GoAntri — Smart Queue Management

> Project ini untuk membuktikan bahwa Sandi bisa membangun aplikasi LENGKAP dari NOL secara MANDIRI.
> Ujian sejati seorang Mid-Level Dev. Disimpan untuk dikerjakan setelah semua sesi selesai.

### Konsep: Aplikasi antrean digital untuk toko/klinik/barbershop.
- Backend Go API (100% sendiri)
- Frontend (boleh pakai AI assist)
- Full deployment
