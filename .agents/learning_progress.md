# 📚 Learning Progress - Sandi's Go Backend Journey

## Terakhir Diupdate: 2026-08-13

## Status: Sesi 6 SEDANG BERJALAN ⏳ (MyAnimeTracker — Anime Tracking & Collection API with PostgreSQL & GORM)

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

## ⬜ Konsep yang Belum Dipelajari (Roadmap Selanjutnya)

### Sesi 3 (Lanjutan — Gin Framework)
- [x] Route grouping (`/api/v1/animes/...`)
- [x] Middleware custom (Logger)

### 4. Config & Environment
- [ ] Config management (.env, viper/godotenv)

### 5. Database (PostgreSQL + GORM)
- [x] Koneksi ke PostgreSQL via GORM (`config/database.go`)
- [x] Pemahaman Mendalam DSN (Data Source Name)
- [x] Konsep `AutoMigrate` (Code-First Database Schema)
- [ ] CRUD operations via GORM
- [ ] golang-migrate

### Konsep Mendalam (Deep Dives)
- [x] **Pointers (`*` & `&`)**: Paham analogi Loker (`variabel`), Amplop (`*int`), dan Minta Alamat (`&`). Paham membedakan *pass by value* vs *pass by reference* untuk efisiensi memori.
- [x] **Multiple Return Values**: Paham kenapa fungsi seperti `gorm.Open` mereturn `(*gorm.DB, error)`. Paham pentingnya error checking sebagai fondasi keamanan Go.
- [x] **Package Scope & Import**: Paham aturan import antar folder (huruf kapital) dan kenapa file di folder yang sama (`package config`) tidak perlu di-import.
- [x] **Clean Architecture Dependency Rule**: Paham aturan "Satu Arah" (Handler → Service → Repository → Models). Pantang melakukan *Circular Dependency*.
- [x] **Career Pivot Strategy**: Paham nilai lebih dari latar belakang S1 + HTB Level 10 (Cybersecurity) di ekosistem Go, dan jalur *pivot* yang menjanjikan (SDET, SOC, AppSec/DevSecOps).
- [x] **Microservices & Security Architecture**: Paham evolusi arsitektur dari Monolitik (1 Container) ➡️ Microservices per Fitur (Stack/Cluster) ➡️ Serverless/FaaS (Level Dewa). Menguasai pola pikir *Red Teamer*: paham konsep *Blast Radius*, *Lateral Movement*, dan bagaimana memecah container dapat mengisolasi serangan RCE (Mencegah *Total System Compromise*).

### 6. Authentication
- [ ] bcrypt password hashing
- [ ] JWT token (golang-jwt/jwt/v5)
- [ ] Auth middleware

### 7. Docker & Deployment
- [ ] Dockerfile untuk Go
- [ ] docker-compose (Go + PostgreSQL + Redis)

### 8. API Documentation
- [ ] Swagger/OpenAPI (swaggo/swag)

### 9. Final Project: GoAntri (Smart Queue Management)
- [ ] Backend Go API (Sandi)
- [ ] Frontend Vite + React + TailwindCSS (AI)
- [ ] Full integration & Deployment (Bareng)

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
7. **Bahasa pengantar** — campur Bahasa Indonesia + istilah teknis English
8. **Analogi favorit** — warung makan, kantor pos, satpam mall, amplop surat, lemari baju, restoran modern
9. **Murid yang sangat baik** — cepat, tapi mau paham mendalam. Kombinasi langka.

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

## 🚀 FINAL PROJECT: GoAntri — Smart Queue Management System

### Tagline: "Smart Queue, No More Waiting"

### Konsep Utama
Aplikasi antrean digital untuk toko/klinik/barbershop.
- **Pemilik Toko**: Daftar akun → Buat toko → Dapat QR Code/Link unik → Kelola antrean dari dashboard
- **Pelanggan**: Scan QR / klik link → Isi nama (TANPA AKUN!) → Dapat nomor antrean → Terima notifikasi real-time saat giliran tiba

### Pembagian Kerja
- **Backend (Sandi)**: Go + Gin + GORM + PostgreSQL + Redis + WebSocket + JWT
- **Frontend (AI)**: Vite + React + TailwindCSS
- **Deployment (Bareng)**: Render (API) + Supabase (DB) + Vercel (Frontend) — GRATIS tanpa kartu kredit

### Fitur yang Akan Dibangun
| No | Fitur | Untuk Siapa |
|----|-------|:-----------:|
| 1 | Register & Login | Pemilik Toko |
| 2 | Buat Toko + QR Code / Link unik | Pemilik Toko |
| 3 | Scan QR → Daftar antrean (tanpa akun, isi nama saja) | Pelanggan |
| 4 | Real-time posisi antrean (WebSocket) | Pelanggan |
| 5 | Buzzer digital (layar hijau + bunyi saat giliran tiba) | Pelanggan |
| 6 | Tombol "NEXT" (panggil pelanggan berikutnya) | Pemilik Toko |
| 7 | Estimasi waktu tunggu | Pelanggan |
| 8 | Analytics dashboard (jam sibuk, rata-rata pelanggan/hari, rata-rata waktu layanan) | Pemilik Toko |
| 9 | Swagger API Docs | Developer |
| 10 | Docker Compose (Go + PostgreSQL + Redis) | DevOps |

### Endpoint API (Rancangan Awal)
| Endpoint | Siapa | Auth? |
|----------|:-----:|:-----:|
| POST /api/v1/auth/register | Pemilik | — |
| POST /api/v1/auth/login | Pemilik | — |
| POST /api/v1/stores | Pemilik | ✅ JWT |
| GET /api/v1/stores/:id/queue | Pemilik | ✅ JWT |
| POST /api/v1/stores/:id/queue/next | Pemilik | ✅ JWT |
| GET /api/v1/stores/:id/analytics | Pemilik | ✅ JWT |
| POST /api/v1/q/:code/join | Pelanggan | ❌ |
| GET /api/v1/q/:code/status/:ticket | Pelanggan | ❌ |
| WS /api/v1/q/:code/live/:ticket | Pelanggan | ❌ |

### Teknologi yang Dipelajari dari Project Ini
1. REST API (Gin)
2. PostgreSQL + GORM
3. Database Relations (One-to-Many)
4. JWT + Bcrypt
5. Redis (Caching)
6. WebSocket (Real-time)
7. Goroutines (Background analytics)
8. SQL Aggregation (Analytics queries)
9. Docker Compose
10. Swagger/OpenAPI

### Level Project: Mid-Level (Strong Junior Portfolio)
