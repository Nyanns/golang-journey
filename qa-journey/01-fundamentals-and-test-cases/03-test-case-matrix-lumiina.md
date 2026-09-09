# 🧪 Test Case Matrix: Lumiina Platform Under Test
> **Aplikasi Target**: [Lumiina Live](https://lumiina-art.vercel.app)  
> **Standar Dokumen**: IEEE 829 & ISTQB Test Documentation  
> **Tester / Author**: Sandi (QA & SDET Engineering)  
> **Status Sesi**: Siap dilanjutkan besok (Drafting Modul 3)

---

## 📊 Ringkasan Metrik Pengujian (Test Execution Summary)
- **Total Test Cases**: 5 (In Progress)
- **Passed**: 0
- **Failed**: 0
- **Blocked / Skipped**: 0
- **Pass Rate**: 0%

---

## 📋 Matriks Kasus Uji (Test Case Matrix)

| Test Case ID | Module | Test Scenario | Test Title / Objective | Pre-Conditions | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|---|:---:|
| `TC_AUTH_001` | Auth | Registrasi Akun Baru | Verifikasi registrasi akun berhasil dengan data valid & password kuat | User berada di halaman `/register`, belum login | 1. Isi username valid<br/>2. Isi email aktif<br/>3. Isi password kuat<br/>4. Klik "Create Account" | `username: sanditester`<br/>`email: valid@mail.com`<br/>`pwd: Lumiina2026!` | Notifikasi sukses verifikasi email muncul, redirect ke `/login`, user tersimpan di DB (`is_verified = false`) | - | *DRAFT* |
| `TC_AUTH_002` | Auth | Registrasi Akun Baru | Verifikasi registrasi gagal jika password lemah (< 8 karakter / tanpa simbol) | User berada di halaman `/register` | 1. Isi username valid<br/>2. Isi email valid<br/>3. Isi password lemah<br/>4. Klik "Create Account" | `pwd: 12345` | Muncul pesan error validasi password strength, form tidak tersubmit | - | *DRAFT* |
| `TC_AUTH_003` | Auth | Registrasi Akun Baru | Verifikasi registrasi gagal dengan username < 3 karakter (BVA $Min-1$) | User berada di halaman `/register` | 1. Isi username 2 karakter<br/>2. Isi email & pwd valid<br/>3. Klik "Create Account" | `username: ep` | Muncul error validasi username minimal 3 karakter | - | *DRAFT* |
| `TC_AUTH_004` | Auth | Login Pengguna | Verifikasi login berhasil dan menerima JWT token | User sudah terdaftar dan `is_verified = true` | 1. Buka `/login`<br/>2. Input email/username<br/>3. Input password benar<br/>4. Klik "Sign In" | Kredensial akun aktif | Berhasil masuk, dialihkan ke Feed, nama user tampil di navbar, token JWT tersimpan | - | *DRAFT* |
| `TC_AUTH_005` | Auth | Autorisasi Interaksi | Verifikasi Guest (tanpa login) ditolak saat mencoba Like artwork | User membuka `/artworks/:id` sebagai tamu | 1. Buka detail karya<br/>2. Klik tombol hati (Like) | User = Guest | Pop-up modal login muncul, counter like di server tidak bertambah | - | *DRAFT* |

---

## 📌 Rencana Sesi Lanjutan Besok:
1. Menyelaraskan tabel matriks di atas ke Google Sheets Sandi.
2. Melakukan uji langsung (*execution*) ke [lumiina-art.vercel.app](https://lumiina-art.vercel.app).
3. Mengisi kolom *Actual Result* dan mengubah status menjadi **PASS / FAIL**.
4. Melanjutkan ke Modul 4: Pelaporan Bug & Defect Tracking.
