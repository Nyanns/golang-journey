# 📚 Learning Progress - Sandi's Go Backend Journey

## Terakhir Diupdate: 2026-09-06

## Status: Sesi 13 SELESAI 🚀 — Lumiina Cloud Production Live & Hardened!
- **Sesi 13 (Cloud Deployment, Database Pooling & Production Launch)**: **SELESAI ✅**
  - **Official Live Domain**: `https://lumiina-art.vercel.app` (100% Free Tier, No Credit Card)
  - **Cloud Database (Supabase PostgreSQL - Singapore)**: Connected via IPv4 Supavisor Pooler (`aws-0-ap-southeast-1.pooler.supabase.com:6543`), all 10 SQL migrations applied cleanly.
  - **Cloud Cache & Rate Limiting (Upstash Redis - Singapore)**: Connected via TLS (`REDIS_USE_TLS=true`).
  - **Single Fullstack Executable (`//go:embed`)**: Production React + Vite + PWA build baked directly into the Go binary. Instant memory serving, zero disk I/O, robust SPA client fallback.
  - **Post-Launch Bug Fixes & Latency Overhaul**:
    - **Prepared Statement Conflict (SQLSTATE 42P05)**: Di Supabase Supavisor Transaction Pooler, pgx statement cache bentrok antar koneksi (`prepared statement "stmtcache_..." already exists`). Diperbaiki dengan mengaktifkan `PreferSimpleProtocol: true` pada konfigurasi GORM postgres driver.
    - **Profile Not Found Fix**: Mengisolasi builder query GORM (`baseProfileQuery()`) agar pointer query tidak saling tumpang tindih saat resolving identifier (ID numeric, vanity username, atau hashid).
    - **Feed Empty After Upload**: Upload sebenarnya sukses (karya "SHigaraki Tomura" tersimpan aman di DB & Cloudinary), namun `GetAllArtworks` sebelumnya return 500 akibat SQLSTATE 42P05. Begitu `PreferSimpleProtocol` aktif, feed langsung menampilkan karya dengan sempurna.
    - **Ultra-Low Latency & Region Alignment**: Vercel Serverless Function sebelumnya berjalan di `iad1` (Washington D.C.), menyebabkan latency lintas benua ~250ms per query ke Supabase Singapore. Ditambahkan `"regions": ["sin1"]` di `vercel.json` sehingga function berjalan di Singapore, menurunkan latency hingga <10ms.
    - **Serverless Cache Invalidation**: `InvalidateArtworkCache` dijadikan synchronous dengan bounded timeout 2s untuk mencegah goroutine dibekukan/dimatikan oleh lifecycle Vercel serverless, dan diperluas mencakup seluruh pattern `artworks:*`.
    - **Browser Cache-Control & Real-time State**: Menghapus `Cache-Control: public, max-age=...` pada endpoint dinamis dan menggantinya dengan `no-cache, no-store, must-revalidate`, sehingga aksi hapus karya tidak tertinggal di cache browser lokal pembaca.
    - **Vercel Edge vs Function Gzip**: Melewati middleware `gzip.Gzip` ketika berjalan di Vercel (`os.Getenv("VERCEL") == ""`) agar tidak terjadi double compression / broken chunked encoding dengan Vercel Edge.
    - **User Acceptance**: Sandi mengonfirmasi langsung di production bahwa seluruh aplikasi berfungsi sempurna, sinkron, dan loading super cepat! ⚡
- **Sesi 12 (Frontend UI/UX, Mobile RWD, PWA & Containerization)**: SELESAI ✅
- **Bagian 1 (Backend Hardening & Enterprise Standard A+)**: SELESAI ✅
  - **Fail-Fast & Security**: `cfg.Validate()`, Request-ID Correlation Tracing, Strict CORS Whitelisting.
  - **Phase 1 Critical Fixes**:
    - Struct-Level Input Validation (`binding:"required,alphanum,min=3,max=30,eqfield=Password"`).
    - Enterprise Password Complexity (`ValidatePasswordStrength`: Upper, Lower, Digit, Symbol, min 8).
    - Standardized `AppError` Architecture (RFC 7807 JSON error envelopes with `request_id`).
    - GORM Slow Query Logger (`SlowThreshold: 200ms`, `LogLevel: logger.Warn`).
    - Security Audit Logging (`slog.Warn` on failed logins, `slog.Info` on registrations).
    - Migration Tracking (`make migrate-version`, active version: 5).
  - **CodeQL SAST Hardening (100% Resolved Alerts)**:
    - Fixed Critical Email Header/Content Injection (CWE-093): `net/mail.ParseAddress`, CRLF stripping, and `html.EscapeString`.
    - Fixed High DOM XSS (CWE-079): `blob:` scheme enforcement and `URL.revokeObjectURL` lifecycle cleanup.
    - Fixed Medium Log Injection (CWE-117): `internal/pkg/sanitize/log.go` applied to `user_handler.go`, `user_service.go`, and `error_handler.go`.
    - Pruned unused frontend imports (`Sparkles`, `LogIn`, `UserPlus`, `KeyRound`, `UserIcon`).
  - **Unit Testing**: 100% PASS race-detector clean across all packages.
  - **Observability & ADRs**: Prometheus `/metrics` endpoint, 4 ADRs, and 4 production runbooks.
- **Bagian 2 (Frontend UI/UX Redesign, Business Logic & Polish)**: **SELESAI ✅**
  - **Full Platform Completion**: Seluruh core features & UI/UX galeri seni Lumiina telah diimplementasikan penuh, diuji, dan bebas flicker / crash.
  - **Brand Identity Integration**: Menggunakan logo resmi `lumiina_logo_hd.jpg` di navbar, favicon, dan auth. Palet warna primer Lumiina Blue / Pixiv Sky Blue (`#0096fa`).
  - **Multi-Page Dedicated Routes (`react-router-dom`)**:
    - `/` & `/explore`: HomePage 2-kolom (Feed di kiri + Sidebar kanan: Sorotan Hari Ini, Tag Populer, Komunitas Lumi & Ina).
    - `/artworks/:id`: ArtworkDetailPage (Cinema viewer split stage, info kreator, tombol interaksi Like/Share, dan kolom diskusi rapi).
    - `/upload`: UploadPage (Studio unggah karya 2-kolom dengan drag-and-drop & tag suggestions).
    - `/login` & `/register` & `/forgot-password`: Halaman autentikasi mandiri yang fokus dan profesional dengan background artwork resmi Lumi & Ina di art studio.
    - `/about`, `/guidelines`, `/terms`, `/privacy`: Hub Dokumentasi & Legalitas Terpadu (`LegalInfoPage.jsx`) dengan navigasi tab instan, URL synchronization, dan konten otentik anti-slop (100% hak cipta seniman, zero unsolicited AI scraping, standar klasifikasi konten, jaminan tanpa penjualan data).
    - `/profile/:id`: ProfilePage ala X/Twitter (Banner luas, avatar bulat bertumpuk, bio, statistik, dan galeri karya).
  - **HD Mascot Artwork & Art Studio Composition**: Mengadopsi art style referensi baru dengan garis tinta tajam, warna vibran, cel-shading dinamis, dan latar belakang studio gambar HD yang jernih. Komposisi widescreen 16:9 membingkai kartu login di tengah dengan Lumi di sisi kiri dan Ina di sisi kanan tanpa tertutup.
  - **Zero Glassmorphism (Anti AI-Slop)**: Menghapus seluruh `backdrop-blur-*` dan menggantikannya dengan kanvas putih bersih, border tegas 1px `border-slate-200`, dan bayangan mikro.
  - **Authentic Artwork Card**: Metadata judul, avatar, dan nama kreator selalu terlihat di bawah gambar (tidak tersembunyi di balik hover gelap).
  - **Business Logic Hardening & Pixiv Header Standards**:
    - Navbar logo disempurnakan (hover zoom dinonaktifkan, ukuran proporsional `h-7 sm:h-[30px]`).
    - Guest Mode Header dibersihkan (hanya ada tombol Theme Mode + Sign In murni tanpa icon pintu/tombol Sign Up).
    - Guest Like Protection & Real Persistence: Migrasi DB 6 (`likes` table), Go Backend API (`POST /api/v1/artworks/:id/like`), Redis cache invalidation, dan agregasi batch `LikeCount`. Tamu tidak bisa like, tetapi tetap melihat total like riil komunitas (`isLiked: false`, `count: 1`).
    - Recommended Users Logic: Tamu tidak melihat widget rekomendasi akun, user login tidak merekomendasikan dirinya sendiri (`u.id !== user.id`), dan section otomatis kosong jika belum ada user lain.
    - Clean Sidebar Footer & Carousel Divider: Menghapus Privacy & English (US), serta menambahkan pembatas horizontal antara seksi Trending & Recommended Artwork. Halaman "Show all" direncanakan dengan batas maksimal 20 artwork.
  - **UX Font Audit & Typography Standard**:
    - Menghapus Plus Jakarta Sans (yang terlalu lebar/mencolok dan bersaing dengan artwork).
    - Menetapkan **Inter** sebagai satu font terbaik untuk antarmuka galeri seni (*"Artwork is the Hero"*), dilengkapi *fallback stack* font sistem Jepang (`Hiragino Sans`, `Yu Gothic UI`, `Meiryo`, `system-ui`) agar teks CJK/anime ter-render alami dan mulus seperti Pixiv.
  - **Like & Unlike (Pembatalan Like) 100% Sinkronisasi**:
    - **Root Cause Fix**: Memperbaiki daemon Go backend yang sebelumnya masih menjalankan binary lama, sehingga middleware `optionalAuth` rute feed dan detail karya aktif sepenuhnya.
    - **Safe Type Assertion**: Handler backend menggunakan *type switch* aman (`float64`, `uint`, `int`, `int64`) untuk context `user_id` guna mencegah error 401 palsu yang memicu penghapusan token di interceptor.
    - **Authoritative Server State**: Memperbaiki `LikesContext.jsx` dengan menghapus blokade `if (!prev[id])`, menormalisasi `Number(id)`, dan mereset state saat logout.
    - **Detail Page Integration**: `GetArtworkByID` mendukung `currentUserID` untuk `repo.GetByIDForUser`, dan `ArtworkDetailPage.jsx` memanggil `syncFromServer`.
    - **React Error Boundary Guard**: Memperbaiki `LoginPage.jsx` dan `RegisterPage.jsx` agar mengekstrak `.message` dari objek error RFC 7807 JSON (`{code, message, request_id}`) agar tidak menyebabkan React crash.
  - **Lumiina Upload Studio (`/upload`) Advanced Artist Tools & Contrast Overhaul**:
    - **Advanced Digital Artist Tools**:
      - *Value Check Mode (明度/Grayscale)*: Toggle hitam-putih untuk memeriksa hierarki kontras pencahayaan dan kedalaman tone sebelum karya dipublikasikan (standar digital painting & ilustrasi).
      - *Feed Crop Simulator*: Simulator thumbnail 1:1 persegi dengan pilihan titik fokus (*Top* untuk wajah/kepala karakter, *Center*, *Bottom* untuk aksi/detail).
      - *Studio Backdrop Switcher*: 4 latar kanvas (18% Neutral Gray standar colorist studio, OLED Dark untuk uji lineart/glow, Pure White untuk uji kontras light mode, dan Checkerboard untuk deteksi lubang transparansi alpha PNG).
      - *Harmonic Palette Extractor*: Ekstraksi 5 warna dominan otomatis dari gambar via kanvas offscreen dengan fitur 1-klik salin HEX dan tombol *Copy Palette*.
      - *Watermark Safety Preview*: Pratinjau letak watermark sudut `© [artist] • Lumiina` agar artist yakin watermark tidak menutupi tanda tangan atau mata karakter.
      - *Resolution & Quality Intelligence Matrix*: Menghitung dimensi, MP, rasio aspek, ukuran file, serta tier kualitas (`4K Ultra HD`, `2K QHD Crisp`, `Full HD`).
      - *1:1 Native Resolution Inspector*: Modal layar penuh untuk memeriksa goresan kuas, kebersihan garis, dan anti-aliasing.
    - **Header Navigasi Minimalis (Standar ArtStation/Figma/Cara)**:
      - Menata bagian kiri atas menjadi tombol navigasi taktil `[ ← Feed ]` yang rapi, pemisah vertikal tipis `|`, serta breadcrumb informatif `Upload • New Illustration`.
    - **Perbaikan Kontras Warna Menyeluruh (Light Mode & Dark Mode)**:
      - Memperbaiki kontras tombol *Publish Artwork* (disabled state tidak lagi samar/gelap di Dark Mode, kini memiliki border tegas dan teks yang jelas terbaca).
      - Memperbaiki kontras label formulir (`text-slate-900` / `text-white`), placeholder input, dan tombol *Cancel*.
      - Memperbaiki kontras chip tag dan tombol tag populer dengan border tegas.
  - **ArtStation-Style HashID URL Obfuscation & Vanity Profiles (Anti-Enumeration & Enterprise Privacy)**:
    - **Vulnerability Remediation**: Menghapus seluruh URL sekuensial telanjang (`/artworks/1`, `/profile/1`, `/comments/1`) yang rentan IDOR / ID Enumeration, scraping data otomatis, dan kebocoran metrik bisnis ke pihak luar.
    - **Sqids Obfuscation Engine (`internal/pkg/hashid`)**: Mengintegrasikan algoritma Sqids dengan panjang minimal 6 karakter alfanumerik acak (`1` $\rightarrow$ `H1rJsY`, `2` $\rightarrow$ `Wkyz19`).
    - **Zero Database Migration**: PostgreSQL tetap menggunakan `id BIGINT PRIMARY KEY` dengan indeks B-Tree yang ultra-cepat ($O(\log N)$).
    - **Bi-Directional JSON Serialization**: `Artwork.MarshalJSON()` dan `Comment.MarshalJSON()` otomatis mengonversi ID menjadi string slug, dan Gin Handler mendecode slug menjadi `uint` ID.
    - **Vanity Profile URLs (`/profile/:username`)**: Mengikuti standar industri global (Cara, ArtStation, GitHub, X), profil kreator menggunakan handle unik (`http://localhost:5173/profile/Nyanns`).
    - **Smart User Profile Resolver (`user_repository.go`)**: Mendukung pencarian profil multi-layer:
      1. Numerik murni (misal `/profile/1` untuk backward compatibility).
      2. Case-insensitive username (`LOWER(username) = LOWER(?)` atau `@username`).
      3. Fallback HashID slug.
    - **Seamless Canonical URL Auto-Redirection**: Jika pengguna membuka link lama atau numerik langsung (`/artworks/1` atau `/profile/1`), frontend secara instan dan mulus meng-canonicalize URL di bilah alamat peramban menjadi `/artworks/H1rJsY` atau `/profile/Nyanns` tanpa reload halaman.
    - **Profile Share Feature**: Tombol salin tautan profil taktil dengan umpan balik visual *"Link Copied!"*.
    - **Email Localization Hardening**: Seluruh subjek email di `mailer.go` dan template HTML dinormalisasi 100% ke dalam Bahasa Inggris profesional.
  - **Full Security Audit & Code Quality Remediation (14/14 Findings Remediated)**:
    - **🔴 Critical Fixes**:
      - *C1 (Credential Leak Check)*: Audit riwayat Git mengonfirmasi `.env` **0 commit** di Git history (aman dari kebocoran masa lalu).
      - *C2 (Session Revocation Epoch)*: `AuthMiddleware` memeriksa `user_revocation:<id>` epoch dari Redis jika password direset, langsung menolak token JWT lama (`iat < epoch`).
      - *C3 (CSP Hardening)*: Menghapus `'unsafe-inline'` dari directive `script-src` pada `security_headers.go` untuk menutup vektor eksekusi XSS.
    - **🟡 High Fixes**:
      - *H1 (SQL Injection Defense)*: Menghapus `fmt.Sprintf` raw formatting pada klausa `.Order()` di `artwork_repository.go`, menggantikannya dengan `gorm.Expr` parameterized query.
      - *H2 (Panic Elimination)*: Mengganti semua type assertion rawan panic `.(float64)` di seluruh handler Gin dengan safe type switch via helper `extractCurrentUserID(c)`.
      - *H3 (Pagination Clamping)*: Menambahkan sanitasi batas ketat `limit: [1, 50]` dan `page >= 1` pada `comment_handler.go` dan `user_handler.go` untuk mencegah *negative offset* dan DoS request besar.
      - *H4 (DRY Cache Invalidation)*: Mengekstrak logic invalidasi cache Redis yang terduplikasi 3x ke package bersama `internal/pkg/cache/invalidator.go` yang membersihkan keys artwork, tags populer, dan feed secara batched.
      - *H5 (Optimized Login Payload)*: Menambahkan metadata user (`id` hashid, `username`, `role`) pada response login untuk mengeliminasi round-trip tambahan ke `/users/me`.
    - **🔵 Medium Fixes**:
      - *M1 (Data Minimization)*: Endpoint registrasi kini hanya mengembalikan pesan status konfirmasi email bersih tanpa membocorkan objek user internal.
      - *M2 (Structured Observability)*: Mengganti legacy `log.Printf` di `user_service.go` dengan structured logging `log/slog`.
      - *M3 (Serialization Precedence)*: Mendokumentasikan Go struct shadowing pada `Artwork.MarshalJSON` terkait field ID.
      - *M4 (CORS Expose-Headers)*: Menambahkan `Access-Control-Expose-Headers` untuk `X-RateLimit-*` dan `X-Request-ID` agar browser JavaScript dapat membaca kuota rate limit.
      - *M5 (Unique Index Integrity)*: Menambahkan composite constraint `uniqueIndex:idx_user_artwork` pada GORM model `Like` sinkron dengan constraint database PostgreSQL.
      - *M6 (Information Leakage Masking)*: Menghapus forwarding error mentah `err.Error()` dari Cloudinary ke client pada `CreateArtwork`, menyembunyikan stack trace / detail cloud.
    - **Verification**: `go vet ./...` 0 issues, `go test -race ./...` 100% PASS (0 data race), endpoint `/readyz` deep probe PostgreSQL & Redis berstatus `ready`.
  - **Artwork Detail Page (`/artworks/:id`) UI/UX Overhaul (Pixiv & ArtStation Gold Standard)**:
    - **Double-Header Elimination**: Menyembunyikan Navbar global feed pada rute `/artworks/:id` di `App.jsx`, mengeliminasi penumpukan header 112px yang memakan tinggi layar.
    - **Single Unified Gallery Header (52px)**: Header tunggal yang bersih dengan tombol `[ ← Feed ]` (shortcut `Esc`), breadcrumb judul karya & handle kreator, tombol hapus karya (dengan safe dialog modal), dan tombol tema yang tersinkronisasi.
    - **Synchronized Theme Switcher**: Mengadopsi **Segmented Tactile Pill Switcher** (`☀️ Sun` & `🌙 Moon` dengan active knob) seragam dengan Navbar dan Studio Upload.
    - **Cinema Canvas & Backdrop Switcher**: Kanvas adaptif dengan 3 pilihan latar: OLED Deep Dark (`#080a0e`), 18% Neutral Studio Gray (`#1e2229`), dan Clean Bright (`#f8fafc`) yang disajikan sebagai floating overlay elegan di dalam kanvas gambar.
    - **Full-Screen Lightbox Inspector**: Modal layar penuh dengan backdrop blur, opsi fit-to-screen atau zoom 100% resolusi native, dan navigasi escape.
    - **Smart Creator Card & Dynamic Follow CTA**:
      - Jika karya milik orang lain: tombol interaktif `+ Follow` / `✓ Following` (Pixiv Blue `#0096fa`, transisi taktil).
      - Jika karya milik sendiri (owner): tombol navigasi `Profile` ke halaman akun pribadi.
    - **Symmetric & Compact Discussion Section (YouTube Standard)**:
      - *Horizontal Symmetry*: Menambahkan avatar akun aktif di sebelah kiri input box `Write your thoughts...`, sehingga avatar input lurus sejajar 100% dengan avatar komentar di bawahnya.
      - *Compact Vertical Spacing*: Mencegah flex stretch dengan `items-start`, memangkas padding berlebih menjadi `py-2.5`, dan menstabilkan line-height agar komentar 1 kata tidak menyisakan ruang kosong besar.
      - *YouTube 3-Dots Action Popover*: Mengganti teks `Delete` telanjang menjadi tombol titik tiga (`MoreVertical`) rapi di pojok kanan atas komentar, yang membuka dropdown popover `🗑️ Delete` dengan listener click-outside.
    - **"More from this Artist" Discovery Loop**: Menampilkan strip karya lain dari seniman yang sama secara horizontal di bawah kanvas untuk meningkatkan retensi penjelajahan.
  - **Pixiv-Inspired Modern Profile Overhaul & Customization**:
    - **Penghapusan Badge `REGULAR`**: Menghapus label `REGULAR` dari kartu profil sehingga tampilan kreator lebih bersih dan terfokus pada karya serta status verified.
    - **Database Migration v7 (`000007_add_profile_fields_to_users`)**: Menambahkan kolom `display_name`, `bio`, `avatar_url`, `banner_url`, `location`, `website`, dan `social_links` (JSONB) pada tabel `users`.
    - **Backend Endpoints & File Security**: Menambahkan endpoint `PUT /api/v1/users/profile`, `POST /api/v1/users/avatar`, dan `POST /api/v1/users/banner` lengkap dengan Magic Bytes MIME sniffing (JPEG/PNG/WebP/GIF) dan upload Cloudinary.
    - **Social Media Icons Bar (Pixiv Standard)**: Integrasi ikon SVG presisi tinggi untuk X (Twitter), Instagram, Pawoo/Mastodon, GitHub, YouTube, DeviantArt, dan Website pribadi dengan auto-formatting URL.
    - **Interactive Studio Modal (`EditProfileModal.jsx`)**: Pratinjau live foto avatar bulat & banner sampul, form Nickname (`0/50`), Self Introduction (`0/1000`) dengan toggle *View profile*, dan manager akun media sosial dinamis.
    - **Anti-Slop Pixiv/LinkedIn Image Cropping Studio (`ImageCropModal.jsx`)**:
      - *Eliminasi AI-Slop & Border Dashed*: Menghapus border putus-putus dan gradasi neon ungu/indigo di Navbar, ProfilePage, dan EditProfileModal; digantikan kanvas slate netral Pixiv (`bg-slate-100 dark:bg-[#181c24]`) dan aperture mask vignette solid (`ring-2 ring-white/95 shadow-[0_0_0_9999px_rgba(10,13,20,0.78)]`).
      - *Bounded Dragging Math (Zero Blank Gaps)*: Gambar diskalakan presisi (`scaleBase = Math.max(cropW / effW, cropH / effH)`) dengan batasan geser ketat `[-maxPanX, maxPanX]` sehingga gambar tidak pernah menyisakan celah kosong.
      - *Dimension Guidelines & Sharpness Detection*: Menampilkan aturan spesifikasi teknis (Avatar: Rec. 500×500 px, Min. 200×200 px, Max 5MB; Banner: Rec. 1920×640 px, Min. 960×320 px, Max 10MB) dengan auto-detection status ketajaman (`✓ Optimal Sharpness` vs `⚠️ Under minimum`).
      - *Subtle Adaptive Rule-of-Thirds Grid*: Garis panduan 1px yang aktif saat drag/zoom dan redup saat diam.
      - *Live Circular Mini Preview*: Menampilkan replika potongan avatar 28px secara real-time di sudut kontrol.
      - *Full Control Suite*: Step rotation lossless $\pm 90^\circ$, smooth mouse wheel / pinch zoom (100% - 300%), dan export HTML5 Canvas JPEG kualitas 92%.
    - **Pixiv Login & Register Experience Redesign (`LoginPage.jsx`, `RegisterPage.jsx`, `AuthLayout.jsx`)**:
      - *Official Lumi & Ina Mascot Background*: Latar belakang ilustrasi anime resolusi tinggi *full-bleed* menampilkan maskot resmi Lumi (pirang ceria) & Ina (perak anggun) dengan art style cat air/komorebi, kartu akreditasi di pojok kanan bawah (`Lumi & Ina — Sunny Meadow • Art by @lumiina_studio • LUMIINA OFFICIAL MASCOTS`), serta tautan legal di pojok kiri bawah.
      - *Pure White Floating Pixiv Card*: Card tengah putih solid (`rounded-[28px]`, `shadow-2xl`) dengan logo wordmark resmi dan tagline *"Your creative journey awaits"*.
      - *Social Login Quick Bar*: 4 tombol lingkaran sentuh untuk Apple, Google, X (Twitter), dan Facebook.
      - *Soft Inset Input Fields*: Input abu-abu lembut (`bg-slate-100`) dengan tombol toggle show/hide kata sandi inline (`Eye` / `EyeOff`).
      - *Pill Action Buttons*: Tombol primer Pixiv Sky Blue (`#0096fa`) dan tombol sekunder abu-abu lembut (`bg-slate-100`).
      - *Real-time Password Strength Matrix*: Kriteria validasi terpadu (8+ karakter, huruf besar & kecil, angka, simbol) yang sinkron dengan fungsi backend `ValidatePasswordStrength`.
  - **Follow & Unfollow System End-to-End + Followers/Following Modal (Branch `feature/follow-system`)**:
    - **Database Migration v8 (`000008_create_follows_table`)**:
      - Tabel `follows` dengan composite unique constraint `(follower_id, following_id)`.
      - `CONSTRAINT check_prevent_self_follow CHECK (follower_id <> following_id)` mencegah self-follow di level PostgreSQL.
      - Dual bidirectional B-Tree indexes: `idx_follows_follower` dan `idx_follows_following` untuk `O(log N)` bidirectional query.
    - **Go Backend Clean Architecture**:
      - Model: `internal/model/follow.go` (`Follow`, `FollowStatusResponse`, `FollowUserItem`, pagination envelopes).
      - Repository: `internal/repository/follow_repository.go` (`ToggleFollow`, `IsFollowing`, `GetFollowCounts`, `GetFollowers`, `GetFollowing`, `BatchCheckFollowing`).
      - Service: `internal/service/follow_service.go` & `internal/service/follow_service_test.go` (100% passing tests).
      - Handler: `internal/handler/follow_handler.go` (`ToggleFollow`, `GetFollowStatus`, `GetFollowers`, `GetFollowing`) mendukung vanity handle, numeric ID, dan HashID.
    - **Dynamic `IsFollowing` Resolution on Discovery Endpoints**:
      - Menyuntikkan `followRepo` ke dalam `UserHandler` dan `ArtworkHandler`.
      - Rute discovery publik (`/users/search`, `/users/:id`, `/artworks/:id`) diintegrasikan dengan `optionalAuthMiddleware`.
      - Jika ada user login, backend otomatis mempopulasikan `is_following: true/false` pada hasil pencarian dan profil karya menggunakan `BatchCheckFollowing` secara efisien.
    - **Frontend Follow Architecture (`FollowContext.jsx`)**:
      - Preload otomatis daftar kreator yang di-follow oleh user saat login (`followsAPI.getFollowing`).
      - Menyinkronkan `following_count` di `AuthContext` (`updateUser`) setiap kali toggle follow berhasil.
      - Optimistic UI update dengan instant revert saat terjadi network error.
    - **Pixiv-Style Followers & Following Modal (`FollowListModal.jsx`)**:
      - Modal interaktif yang dapat diakses dengan mengklik angka **Followers** atau **Following** di halaman `ProfilePage`.
      - Tab switcher mulus antara "Followers" dan "Following" lengkap dengan counter badge.
      - Daftar kreator menampilkan avatar, display name, handle, bio singkat, link profil, dan tombol aksi Follow/Unfollow interaktif langsung dari dalam modal.
    - **Branch Follow System**: `feature/follow-system` (Commit: `7240aaf`, 100% tests pass, build clean).
  - **Pixiv-Style Artwork Bookmark & Collection System (Branch `feature/bookmark-system`)**:
    - **Database Migration v9 (`000009_create_bookmarks_table`)**:
      - Junction table `bookmarks` dengan kolom `user_id BIGINT`, `artwork_id BIGINT`, `created_at TIMESTAMP WITH TIME ZONE`.
      - Composite unique constraint: `CONSTRAINT unique_user_artwork_bookmark UNIQUE (user_id, artwork_id)`.
      - Fast lookup indexes: `idx_bookmarks_artwork_id`, `idx_bookmarks_user_id`, dan composite order index `idx_bookmarks_user_created (user_id, created_at DESC)`.
    - **Go Backend Clean Architecture**:
      - Model: `internal/model/bookmark.go` (`Bookmark`, `BookmarkStatusResponse`, `UserBookmarksResponse`).
      - Model Extension: `internal/model/artwork.go` diperkaya dengan `BookmarkCount int64` dan `IsBookmarked bool` (dengan tag `gorm:"-"`).
      - Repository: `internal/repository/bookmark_repository.go` (`ToggleBookmark`, `GetBookmarkCount`, `IsUserBookmarked`, `BatchCheckBookmarked`, `GetUserBookmarks`).
      - High Performance Batch Querying: `artwork_repository.go` dimodifikasi (`populateLikeCounts` & `populateUserLikeStatus`) agar sekaligus mem-batch fetch count bookmark dan status user dalam $O(1)$ batch query via `IN (?)`, mengeliminasi problem N+1 queries pada feed homepage dan profil.
      - Service: `internal/service/bookmark_service.go` (`ToggleBookmark`, `GetBookmarkStatus`, `GetUserBookmarks`).
      - Handler: `internal/handler/bookmark_handler.go` (`POST /api/v1/artworks/:id/bookmark`, `GET /api/v1/artworks/:id/bookmark-status`, `GET /api/v1/users/:id/bookmarks`) dengan resolusi aman ID/HashID/Vanity handle dan fallback `optionalAuth`.
      - Wiring: Diregisterkan di `cmd/api/main.go`, unit test Go 100% PASS, server daemon beroperasi normal.
    - **React Frontend Architecture & UX**:
      - API Client: `web/src/api/client.js` menambahkan namespace `bookmarksAPI` (`toggle`, `getStatus`, `getUserBookmarks`).
      - Context: `web/src/context/BookmarkContext.jsx` menyediakan state global tersentralisasi (`getBookmarkInfo`, `toggleBookmark`, `syncFromServer`, optimistic UI update & debounce protection).
      - App Root: `App.jsx` dibungkus dengan `BookmarkProvider`.
      - Feed & Artwork Cards: `FeedPostCard.jsx` dan `ArtworkCard.jsx` terhubung ke `BookmarkContext` dengan ribbon icon bookmark amber interaktif, animasi scale taktil Framer Motion, dan live counter.
      - Profile Page Collection Tabs: `ProfilePage.jsx` mengadopsi standar Pixiv dengan tab switcher ("Illustrations" vs "Bookmarks"), counter badge real-time, empty state ramah ilustrator, dan URL query parameter sync (`/profile/:username?tab=bookmarks`).
    - **Branch Aktif & Status Git**: `develop` (Merged dari `feature/bookmark-system` & `feature/follow-system`, 100% test pass, build Vite production clean, sinkron ke GitHub remote `Nyanns/lumiina`).
- **Bagian 3 (Ultra-Performance, Technical SEO/GEO, Defense-in-Depth Security & Instagram-Style Image Pipeline)**: **SELESAI ✅**
  - **Instagram-Style Client-Side Image Preprocessing & Optimization (`web/src/utils/imageOptimizer.js`)**:
    - Pipeline pemrosesan gambar client-side sebelum upload ke jaringan (`optimizeImage`).
    - Downsampling kanvas berakurasi tinggi ke batas maksimal 2560px (2K QHD crisp) dengan aspect ratio presisi.
    - Kompresi WebP (fallback JPEG) kualitas 0.88–0.90 (visually lossless, garis line-art tetap tajam).
    - Deteksi transparansi alpha channel otomatis untuk PNG/stiker transparan.
    - Penyusutan ukuran file dari 10–20MB menjadi ~600KB–1.2MB (**menghemat 85%–95% bandwidth**). Upload selesai dalam ~200 milidetik (**~20x lebih cepat**).
    - Terintegrasi di `UploadPage.jsx` dan `UploadModal.jsx` dengan badge metrik real-time dan opsi toggle seniman (*Fast Web Upload*).
  - **Technical SEO, GEO & AI Bot Crawler Discoverability**:
    - Menambahkan `web/public/robots.txt` dengan izin khusus untuk search bots & AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
    - Menambahkan `web/public/sitemap.xml` berisi rute kanonikal dan prioritas indexing.
    - Injeksi Schema.org JSON-LD (`VisualArtwork`, `ProfilePage`, `Person` dengan link `sameAs`, `BreadcrumbList`, dan `WebSite` dengan Sitelinks `SearchAction`).
    - Tag Open Graph dan Twitter Large Cards terintegrasi dinamis di seluruh rute.
  - **Ultra-Lightweight Frontend Bundle Optimization**:
    - Route-level code-splitting menggunakan `React.lazy()` + `Suspense` dengan `PageLoadingFallback` zero-CLS.
    - Ukuran entry bundle terpangkas drastis dari ~640 kB menjadi **22.07 kB entry + 25.60 kB HomePage** (**penurunan >93%**).
    - Manual Rollup vendor chunking (`vendor-react`, `vendor-motion`, `vendor-common`) untuk HTTP cache browser maksimal.
    - GPU off-screen acceleration via CSS `.card-containment` (`content-visibility: auto; contain-intrinsic-size: 380px;`).
    - Gin backend HTTP Gzip middleware (`github.com/gin-contrib/gzip`) dengan batas minimum 512 bytes.
  - **Defense-in-Depth API Security Hardening**:
    - Transport & Security Headers: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`, `Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()`, serta pengetatan CSP.
    - Body Stream DoS Guard: Pembatasan stream reader menggunakan `http.MaxBytesReader` (Avatar 6MB, Banner 12MB, Artwork 22MB) untuk mencegah memory exhaustion attack.
    - Sanitasi Input & XSS Defense: `html.EscapeString` di backend, pemblokiran scheme pseudo-protocol berbahaya (`javascript:`, `data:`, `vbscript:`) di backend dan frontend (`getSafeUrl`).
    - Perbaikan BOLA Komentar: Pemilik karya (artist) kini memiliki hak moderasi penuh untuk menghapus komentar di karya miliknya sendiri.
    - Verifikasi: `go test -race ./...` (100% PASS, 0 data race), `npm audit` (0 vulnerabilities), `gopls vulncheck` (0 issues).
  - **Modern Responsive Web Design, PWA & Production Hardening**:
    - **Progressive Web App (PWA) Standard**: Integrasi `vite-plugin-pwa@1.3.0` dengan Workbox caching, 4 maskable/standard icons di `public/`, manifest compliant, Apple iOS status bar tags, serta `PwaInstallBanner.jsx` & hook `usePWAInstall.js`.
    - **Light Mode Ergonomic Overhaul**: Mengganti kanvas putih silau (`#f8fafc`) menjadi abu-abu matte tenang (`#f1f3f7`) di seluruh halaman, serta menaikkan kontras tipografi ke standar WCAG AAA (`text-slate-900`, `text-slate-700`).
    - **Production Security & Optimization Hardening (21 Checklist Evaluation)**:
      - *Secondary Image Decode Validation*: Mengintegrasikan `image.DecodeConfig` (JPEG, PNG, WebP via `golang.org/x/image/webp`) di `artwork_handler.go` dan `user_handler.go` untuk menangkal polyglot payload / exploit manipulasi magic bytes.
      - *Zero-Downtime JWT Secret Rotation*: Menambahkan konfigurasi `JWTSecretOld` dan mekanisme fallback signature verification di `auth_middleware.go`.
      - *Redis Token Revocation Footprint Cut (75%)*: Mengganti penyimpanan raw JWT string menjadi digest SHA-256 (`revoked_token:sha256(token)`) di `user_service.go` dan `auth_middleware.go`.
      - *ReDoS & Deep Offset DoS Protection*: Membatasi panjang query pencarian (`len(q) > 200`) dan membatasi offset pagination (`offset > 50000`).
      - *Production CORS Guard*: Memvalidasi origin HTTPS ketat saat `APP_ENV=production`.
      - *Database Migration 000010*: Menambahkan indeks `idx_comments_user_id` untuk lookup profil dan moderasi komentar.
      - *Cache-Control Headers*: Header `Cache-Control: public, max-age=60/120` pada endpoint feed publik dan detail artwork.
    - **Docker Production Multi-Stage Builds**:
      - `lumiina-api:latest`: **~20 MB** (Alpine 3.19, non-root user `appuser`, stripped static binary `-w -s`, `/livez` healthcheck).
      - `lumiina-web:latest`: **~31 MB** (Nginx Alpine, pre-gzipped assets, SPA routing fallback, API reverse proxy).
      - Orkestrasi `docker-compose.yml` siap deploy.

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

### Sesi 11: Docker, Containerization & CI/CD Pipeline (QA Ops) ✅ (SELESAI & MERGED)
- [x] **Multi-Stage Dockerfile**: Builder (golang:alpine) & Runner (alpine:3.19) menghasilkan image super ramping (19.3 MB) dengan Healthcheck `/livez`.
- [x] **Docker Layer Caching Optimization**: Meng-copy `go.mod` dan `go.sum` sebelum source code untuk mempercepat build & caching.
- [x] **Full Stack Orchestration via `docker-compose.yml`**: PostgreSQL 15, Redis 7, dan Lumiina API dalam 1 bridge network internal.
- [x] **Automated CI Pipeline (`.github/workflows/ci.yml`)**: Otomatis menjalankan `go vet`, `go test -v -race`, dan verifikasi build Docker setiap `git push` & `Pull Request`.
- [x] **Complete OpenAPI 2.0 / Swagger Interactive Docs**: Seluruh 12 endpoint terdokumentasi rapi di `/swagger/index.html`.
- [x] **Artwork Search, Tag Filter, & Artist Discovery**: ILIKE keyword search, tag query, artist profile preloading (`/users/search`, `/users/:id`, `/users/me`).
- [x] **Git Workflow**: Branch `feature/docker-cicd` berhasil di-merge ke branch `develop` di GitHub `Nyanns/lumiina`.

### Sesi 12: Frontend Development, UI/UX Redesign & API Integration ✅ (SELESAI & MERGED)
- [x] **Modern Web Architecture (Vite + React + TailwindCSS)**:
  - [x] Anti AI-Slop Design System: Light theme (Pixiv-inspired redesign with clean slate & `#0284c7` blue accent).
  - [x] Mascots Branding: Lumi & Ina official artworks and art studio backgrounds.
  - [x] Navbar with real-time keyword search, tag filter pills, and live counters.
  - [x] Artwork Feed with Masonry Grid Layout & organic card aspect ratios.
  - [x] Dedicated Multi-Page Routes (`/artworks/:id`, `/upload`, `/profile/:username`, `/about`, `/guidelines`, `/terms`, `/privacy`, `/trending`, `/recommended`).
  - [x] Artworks Discovery Hub (`ArtworksDiscoveryPage.jsx`) with dynamic tab switching and tag filters.
  - [x] Follow & Unfollow system end-to-end with interactive Followers/Following modal (`FollowListModal.jsx`).
  - [x] Bookmark & Collections system with Illustrations vs Bookmarks tabs on artist profile.
  - [x] Digital Artist Studio Tools (Value check, feed crop simulator, palette extractor, 1:1 inspector).
  - [x] HashID URL Obfuscation & Vanity Profiles (`/profile/Nyanns`).
  - [x] Auth Modals & Pages (Login, Register, Email Activation, Password Reset) with mascot art.
  - [x] Anti-Flicker & Render Stabilization: `useCallback` memoization on context providers.
  - [x] Full-Stack Containerization: `Dockerfile` (Go API) + `web/Dockerfile` (Nginx multi-stage) + `docker-compose.yml`.
  - [x] **Git Workflow**: Branch `feature/bookmark-system` berhasil dimerge ke branch `develop` di GitHub `Nyanns/lumiina`.

### 🛡️⚡ Sesi Khusus: Autonomous Enterprise Security Hardening & Hyper-Performance Optimization ✅ (SELESAI)
- **Security Engineering (OWASP API Top 10 & HTB Mindset)**:
  - [x] **Constant-Time Timing-Attack Mitigation**: Menggunakan pre-computed `dummyBcryptHash` saat login user tidak ditemukan, mengeliminasi variasi latensi (0.5ms vs 70ms) agar penyerang tidak bisa melakukan enumerasi akun.
  - [x] **HTTP Server Slowloris & DoS Hardening**: Memasang `ReadHeaderTimeout` (5s), `ReadTimeout` (30s), `WriteTimeout` (30s), `IdleTimeout` (120s), dan `MaxHeaderBytes` (1MB).
  - [x] **Strict Request Body Size Limiting**: `http.MaxBytesReader` (25MB) pada upload artwork mencegah memory exhaustion attack.
  - [x] **W3C Standard Compliant CORS**: Refleksi origin dinamis (`Vary: Origin`) sehingga `Access-Control-Allow-Credentials: true` didukung penuh oleh browser tanpa error wildcard.
  - [x] **Atomic Redis Rate Limiting (Lua Script)**: Menghapus bug infinite window reset pada `Expire()`, menggantikannya dengan single round-trip atomic script + standard RFC headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`).
  - [x] **Token Revocation System**: Endpoint `/api/v1/auth/logout` + Redis token blacklisting untuk membatalkan token secara instan, serta invalidasi sesi otomatis saat reset password.
  - [x] **Container Security**: Runner stage Dockerfile menggunakan non-root system user & group (`appuser:appgroup`), serta port DB/Redis dibind khusus ke `127.0.0.1` pada `docker-compose.yml`.
- **Database Internals & PostgreSQL DDL Optimization**:
  - [x] **Migration 000005 (`pg_trgm` & GIN Indexes)**: Mengaktifkan ekstensi trigram untuk pencarian `ILIKE` super kilat (1-2ms vs 500ms+ full sequential scan) pada `artworks(title)`, `artworks(description)`, dan `users(username)`.
  - [x] **B-Tree Foreign Key & Composite Indexes**: Menambahkan index FK `artworks(user_id)`, `artwork_tags(tag_id)`, composite sorting index `comments(artwork_id, created_at DESC)`, and partial index `users(created_at) WHERE is_verified = FALSE`.
  - [x] **GORM Engine Tuning**: `SkipDefaultTransaction: true` (mempercepat write 30-50%), `PrepareStmt: true` (statement execution plan cache).
  - [x] **Connection Pool Sizing**: `MaxOpenConns: 50`, `MaxIdleConns: 25`, `ConnMaxLifetime: 15m`, `ConnMaxIdleTime: 5m`.
- **High-Throughput Concurrency & Health Probes**:
  - [x] **Asynchronous Batched Cache Invalidation**: Menghapus loop synchronous `Del()` individual, digantikan background worker dengan batching 100 keys per command.
  - [x] **Real Deep Health Probes (`/readyz`)**: Verifikasi konektivitas aktif ke PostgreSQL dan Redis via `PingContext(ctx)` dengan HTTP 503 fallback jika salah satu downstream dependency bermasalah.
  - [x] **Context Cancellation Propagation**: Memastikan seluruh operasi handler menggunakan `c.Request.Context()` agar query dibatalkan jika client menutup koneksi.

### 🏆 Sesi 13: Full-Stack Cloud Deployment (Production Live) — SEDANG BERJALAN 🚀
- [x] **Containerization Finalized & Production Verified**:
  - `lumiina-api:latest` (20.2 MB): Alpine-based multi-stage runner with non-root security (`appuser:appgroup`), stripped static binary, and `/livez` probe.
  - `lumiina-web:latest` (31.0 MB): Nginx Alpine with SPA routing, `/api/` reverse proxy, PWA no-cache headers, and pre-gzipped static assets.
  - `docker-compose.yml`: 4-container orchestration (`lumiina_postgres`, `lumiina_redis`, `lumiina_api`, `lumiina_web`).
- [ ] **Step 1: Cloud Database Provisioning**:
  - Setup PostgreSQL di Cloud (Supabase / Neon DB) + setup Redis di Cloud (Upstash Redis).
  - Jalankan migrasi schema database (`golang-migrate` version 1 s/d 9).
- [ ] **Step 2: Backend Go API Cloud Deployment**:
  - Deploy container `lumiina-api` ke Cloud Runner (Render / Koyeb / Fly.io).
  - Konfigurasi Environment Variables production (DB DSN, Redis URL, JWT Secret, Cloudinary credentials, SMTP Gmail).
  - Verifikasi deep healthcheck `/readyz` dan `/livez` di URL public live.
- [ ] **Step 3: Frontend React Web Cloud Deployment**:
  - Deploy Vite SPA ke **Vercel** (terhubung otomatis ke GitHub `Nyanns/lumiina`).
  - Konfigurasi rewrite rules / proxy `VITE_API_URL` ke backend cloud.
- [ ] **Step 4: Smoke Testing & Production Verification**:
  - Registrasi user, aktivasi email, login JWT, upload artwork (WebP client compression + Cloudinary), like, bookmark, follow, dan install PWA di live domain!

#### Catatan: Environment Lifecycle (Local → Staging → Production)
- **Local** (`localhost:5173`): Hanya untuk developer sendiri. Boleh crash, data dummy.
- **Staging** (`develop.lumiina.app`): Auto-deploy dari branch `develop`. Untuk QA/beta tester internal. Data bisa di-reset bebas. Vercel otomatis buat Preview URL per branch/PR (gratis).
- **Production** (`lumiina.app`): Auto-deploy dari branch `main` setelah QA lolos. Data user nyata. Tidak boleh ada error.
- **Alur**: `feature/xxx` → merge ke `develop` → Staging auto-deploy → QA testing → merge ke `main` → Production live.
- **Kenapa penting**: Bug di staging tidak kena user production. Database staging bisa di-reset tanpa risiko.

---

## 🛡️ FASE KHUSUS: QA & SDET Engineering Masterclass (Standar Global)
> **Target Pengujian**: Aplikasi **Lumiina Live** (Production Environment)
> **Repository Mandiri**: `Nyanns/lumiina-qa-automation` (Terpisah dari source code backend/frontend agar standar industri profesional)
> **Kurikulum (Mengacu pada [roadmap.sh/qa](https://roadmap.sh/qa))**:
> 1. **QA Fundamentals & Test Strategy**: SDLC/STLC, Test Plan, Test Case Matrix (Positive/Negative/Edge cases), Equivalence Partitioning, Boundary Value Analysis, Bug Reporting (JIRA/GitHub Issues format).
> 2. **API Automation Testing**: Postman Collections + Newman CLI / REST client automated test assertions (Status code, Schema validation, JWT token flow, Error handling).
> 3. **Web UI E2E Automation**: **Playwright** (Page Object Model / POM, multi-browser Chromium/Firefox/WebKit, locators, auto-waiting, visual regression, trace viewer).
> 4. **Performance & Stress Testing**: **k6** (Load testing, Spike testing, Stress testing, p95/p99 latency analysis).
> 5. **Automated QA CI/CD Pipeline**: GitHub Actions running automated E2E & API test suites on scheduled cron & PR triggers with HTML test report artifacts.
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
