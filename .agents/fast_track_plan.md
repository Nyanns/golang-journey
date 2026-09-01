# ⚡ Fast-Track Battle Plan — Menuju Siap Kerja

## Dibuat: 2026-08-26
## Terakhir Diupdate: 2026-08-26
## Deadline: Pertengahan September 2026 (Mulai Apply Kerja)

---

## 🤝 Kesepakatan Final

### 1. Auth (Sesi 8) — Sandi TULIS SENDIRI
Auth adalah topik interview yang pasti ditanya. Sandi harus paham dalam:
- JWT Token generation & validation
- Auth Middleware (validasi token di setiap request)
- RBAC Middleware (validasi role: admin vs regular)
- Bcrypt password hashing (✅ sudah selesai - Register)

### 2. Sesi 9-13 — AI Bangun, Sandi Baca & Pahami
**ATURAN PENTING: Bangun SATU SESI pada satu waktu, BUKAN sekaligus!**

Alur per sesi:
1. AI bangun satu sesi (misal Sesi 9)
2. AI jelaskan kodenya file per file
3. Sandi baca & pahami — boleh tanya kalau bingung
4. Sandi paham → lanjut sesi berikutnya

### 3. QA — Belajar PARALEL saat AI bangun backend
Sandi mulai belajar QA fundamentals bersamaan dengan AI membangun sesi-sesi backend.

### 4. Gaya Mengajar — Speed Mode ⚡
- ❌ Analogi panjang untuk setiap baris kode
- ✅ Analogi HANYA untuk konsep baru yang krusial
- ✅ Langsung kode + penjelasan singkat
- ✅ Copy-paste dibolehkan untuk konfigurasi
- ✅ Tulis sendiri HANYA untuk Auth, Testing, QA

---

## 🗓️ Timeline (Target ~15 Hari)

### Fase 1: Backend (Hari 1-7)

| Hari | Sandi Kerjakan | AI Kerjakan |
|------|----------------|-------------|
| 1-2 | Sesi 8: Auth (JWT + Login + Middleware + RBAC) | — |
| 3 | Baca & pahami kode Sesi 9 | Sesi 9: CRUD Artwork + Cloudinary |
| 4 | Baca & pahami kode Sesi 9 lanjutan | Sesi 9: Like, Bookmark, Follow |
| 5 | Baca & pahami kode Sesi 10 | Sesi 10: Redis + Unit Testing |
| 6 | Baca & pahami kode Sesi 11 | Sesi 11: Docker + Swagger + CI/CD |
| 7 | Baca & pahami kode Sesi 12-13 | Sesi 12-13: Frontend + Deploy |

### Fase 2: QA (Hari 8-14) — PARALEL dengan polish backend

| Hari | Sandi Kerjakan | Berpedoman Pada |
|------|----------------|-----------------|
| 8-9 | QA Fase 1: Teori (SDLC, STLC, jenis testing, test case) | roadmap.sh/qa |
| 10-11 | QA Fase 2: Jira (project, bug report, workflow) | roadmap.sh/qa |
| 12 | QA Fase 3: API Testing (Postman Collection + Newman) | roadmap.sh/qa |
| 13-14 | QA Fase 4: Playwright E2E (3-5 test scenario) | roadmap.sh/qa |

### Fase 3: Polish & Apply (Hari 15)

| Hari | Target |
|------|--------|
| 15 | README, GitHub profile, CV → **MULAI APPLY** 🚀 |

---

## 🔪 Scope Yang Dikorbankan (Backlog V2)
- Art Challenge, Remix Tree, WebSocket, RabbitMQ, gRPC
- Komisi System, Ephemeral Exhibition, Color Palette Extraction
- Dashboard UI Admin

---

## ✅ Checklist Portofolio Akhir

### Backend (Lumiina API)
- [x] Register (Bcrypt) ✅
- [ ] Login (JWT)
- [ ] Auth Middleware + RBAC Middleware
- [ ] CRUD Artwork + Cloudinary (AI)
- [ ] Like, Bookmark, Follow (AI)
- [ ] Redis Caching (AI)
- [ ] Unit Test + Mocking
- [ ] Docker & Docker Compose (AI)
- [ ] Swagger API Docs (AI)
- [ ] CI/CD GitHub Actions (AI)
- [ ] Deploy live URL
- [ ] Frontend React (AI)

### QA (lumiina-qa-automation — repo terpisah)
- [ ] Test Cases document
- [ ] Bug Reports di Jira
- [ ] API Testing (Postman + Newman)
- [ ] E2E Testing (Playwright)
- [ ] CI/CD pipeline untuk test

---

## 🎯 Strategi Melamar Kerja

### Dual Apply dari Hari Pertama (Backend + QA)
- Backend Go → tunjukkan Lumiina API
- QA/SDET → tunjukkan lumiina-qa-automation + background Go + HTB

### Keunggulan
- S1 Informatika + HTB Level 10
- Go Backend (langka) + QA (pemahaman backend mendalam)
- Portofolio nyata dengan live URL

### Kalimat Sakti
> "Saya paham cara ngetes API karena saya bisa bikin API skala industri pakai Go."

---

## 📝 Catatan QA
- Bahasa untuk Playwright: **JavaScript** (sudah dikuasai, tidak perlu belajar bahasa baru)
- SQL: Perlu tambah sedikit (JOIN, GROUP BY) — cukup 1-2 hari
- Berpedoman penuh pada roadmap.sh/qa
