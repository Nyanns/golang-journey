# 🛡️ QA & SDET Journey: Sandi's Software Quality Engineering

Selamat datang di direktori perjalanan **Software Quality Assurance (QA) & Software Development Engineer in Test (SDET)**!

Direktori ini dirancang khusus sebagai laboratorium praktik, arsip dokumen uji, skrip otomasi, dan portofolio profesional untuk menguji platform galeri seni anime **Lumiina Live** ([lumiina-art.vercel.app](https://lumiina-art.vercel.app)).

---

## 📖 Navigasi Kurikulum & Modul

Silakan buka dokumen master kurikulum:
👉 **[KURIKULUM_QA.md](./KURIKULUM_QA.md)** — Berisi 9 modul lengkap dari pemula mutlak hingga tingkat lanjut (SDET/Automation Specialist).

---

## 🗂️ Struktur Direktori Praktik

```
qa-journey/
├── KURIKULUM_QA.md                  # Master silabus & panduan pembelajaran
├── README.md                        # Indeks & pengantar perjalanan QA
├── 01-fundamentals-and-test-cases/  # Dokumen analisis kebutuhan, BVA, & Test Case Matrix
├── 02-bug-reports/                  # Laporan bug standar industri & defect tracking
├── 03-api-automation-postman/       # Postman collection, environment, dan eksekusi Newman
├── 04-e2e-automation-playwright/    # Skrip pengujian antarmuka web modern (Page Object Model)
├── 05-performance-k6/               # Uji beban (Load/Stress test) dan analisis p95 latency
└── 06-cicd-pipeline/                # Konfigurasi GitHub Actions untuk otomasi pengujian cloud
```

---

## 🎯 Fokus Pengujian: Lumiina Platform Under Test (PUT)

- **Target URL**: `https://lumiina-art.vercel.app`
- **API Base URL**: `https://lumiina-art.vercel.app/api/v1`
- **Fitur Utama yang Diuji**:
  1. Autentikasi Pengguna (Register, Login, Verifikasi Email, Reset Password, JWT Session).
  2. Studio Unggah Karya (Upload Artwork, Tagging, MIME & Magic Bytes Validation, File Size Clamping).
  3. Eksplorasi Galeri & Pencarian (Infinite Feed, Tag Filtering, ILIKE Search, Vanity Profiles).
  4. Interaksi Sosial (Sistem Like, Bookmark, Follow/Unfollow, Komentar & Moderasi Komentar).
  5. Keamanan & Ketahanan (Rate Limiting, Anti-Enumeration, XSS, Slowloris, Timing-Attack Defense).
