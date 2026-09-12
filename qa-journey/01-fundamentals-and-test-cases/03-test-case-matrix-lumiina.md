# 🧪 Test Case Matrix: Lumiina Platform Under Test
> **Aplikasi Target**: [Lumiina Live](https://lumiina-art.vercel.app)  
> **Standar Dokumen**: IEEE 829 & ISTQB Test Documentation  
> **Tester / Author**: Sandi (QA & SDET Engineering)  
> **Status Sesi**: Modul 3 Sedang Dieksekusi 🚀

---

## 📊 Ringkasan Metrik Pengujian (Test Execution Summary)
- **Total Test Cases Executed**: 8
- **Passed**: 7 (87.5%)
- **Failed**: 1 (12.5%)
- **Blocked / Skipped**: 0
- **Pass Rate**: 87.5%

---

## 📋 Matriks Kasus Uji (Test Case Matrix)

| Test Case ID | Module | Test Scenario | Test Title / Objective | Pre-Conditions | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|---|---|:---:|
| `TC_AUTH_001` | Auth | Registrasi Akun Baru | Verifikasi registrasi akun berhasil dengan data valid & password kuat | User berada di halaman `/register`, belum login | 1. Buka `/register`<br/>2. Isi username valid<br/>3. Isi email aktif<br/>4. Isi password kuat<br/>5. Klik "Create Account" | `username: qatest_sandi`<br/>`email: sandisensei13@gmail.com`<br/>`pwd: Lumiina2026!` | Notifikasi sukses muncul, redirect ke `/login`, email verifikasi terkirim | Registrasi gagal. Muncul error mentah backend "Field validation for Username failed on the alphanum tag" karena username mengandung underscore (_). | **FAIL** |
| `TC_AUTH_002` | Auth | Registrasi Akun Baru | Verifikasi registrasi akun berhasil dengan alfanumerik murni & email valid | User berada di halaman `/register`, belum login | 1. Buka `/register`<br/>2. Isi username valid<br/>3. Isi email aktif<br/>4. Isi password kuat<br/>5. Klik "Create Account" | `username: qatestsandi`<br/>`email: sandisensei13@gmail.com`<br/>`pwd: Lumiina2026!` | Notifikasi sukses muncul, redirect ke `/login`, email verifikasi terkirim | Registrasi berhasil. Muncul perintah untuk memverifikasi akun lewat email yang dimasukkan (catatan UX: notifikasi pop-up transisi sedikit terlalu cepat), email verifikasi masuk ke inbox Gmail, verifikasi sukses via link, dan redirect otomatis ke halaman utama web. | **PASS** |
| `TC_AUTH_003` | Auth | Validasi Keamanan Password | Verifikasi registrasi ditolak jika password lemah (< 8 karakter / tanpa simbol) | User berada di halaman `/register` | 1. Buka `/register`<br/>2. Isi username: `usertes01`<br/>3. Isi email: `testpass@mail.com`<br/>4. Isi password lemah: `12345`<br/>5. Klik "Create account" | `pwd: 12345` | Indikator password requirements menyala merah, tombol submit tidak memproses registrasi / muncul pesan error password strength | Registrasi gagal. Tidak muncul aksi submit apapun dikarenakan secara sistem (client-side validation), apabila password kurang kuat atau tidak sesuai ketentuan, maka tombol register dinonaktifkan/disabled sehingga form tidak bisa dikirim. | **PASS** |
| `TC_AUTH_004` | Auth | Validasi Panjang Username (BVA) | Verifikasi registrasi ditolak jika username < 3 karakter (BVA Min-1) | User berada di halaman `/register` | 1. Buka `/register`<br/>2. Isi username 2 huruf: `ab`<br/>3. Isi email valid & password kuat<br/>4. Klik "Create account" | `username: ab` | Sistem menolak submit dan memunculkan error validasi username minimal 3 karakter | Berhasil menolak. Sistem menolak untuk submit, alur sistem berhasil menjaga batasan data. Namun pesan error masih menampilkan bahasa mentah backend yang kurang familiar/ramah bagi pengguna biasa. | **PASS** |
| `TC_AUTH_005` | Auth | Login Pengguna | Verifikasi login berhasil menggunakan kredensial aktif yang sudah terverifikasi | User sudah terdaftar dan email `is_verified = true` | 1. Buka `/login`<br/>2. Input username: `qatestsandi`<br/>3. Input password benar: `Lumiina2026!`<br/>4. Klik "Log in" | `user: qatestsandi`<br/>`pwd: Lumiina2026!` | Berhasil login, dialihkan ke beranda (feed), nama user & avatar muncul di Navbar, token JWT aktif | Login berhasil, dialihkan ke beranda / feed dan profil juga sudah benar dan muncul di navbar atas kanan. | **PASS** |
| `TC_AUTH_006` | Auth | Keamanan Login (Negative Testing) | Verifikasi login ditolak jika memasukkan password salah | User berada di halaman `/login` | 1. Buka `/login`<br/>2. Input username benar: `qatestsandi`<br/>3. Input password salah: `PasswordNgawur123!`<br/>4. Klik "Log in" | `pwd: PasswordNgawur123!` | Login ditolak, muncul pesan error aman "Invalid credentials", form tidak mengizinkan masuk | Keamanan berhasil. Login ditolak dan muncul kalimat "Invalid username/email or password combination" (Aman dari User Enumeration attack). | **PASS** |
| `TC_AUTH_007` | Auth | Pemulihan Password | Verifikasi permintaan reset password berhasil untuk email terdaftar | User berada di `/forgot-password`, belum login | 1. Buka `/forgot-password`<br/>2. Masukkan email terdaftar<br/>3. Klik "Send Instructions" | `email: sandisensei13@gmail.com` | Muncul pesan sukses bahwa instruksi reset password telah dikirim, email masuk ke inbox Gmail (berlaku 15 menit) | Berhasil. Sistem berhasil mengirimkan email lupa password dengan batas waktu 15 menit. Muncul kalimat disclaimer konfirmasi pengiriman jika email terdaftar & terverifikasi. | **PASS** |
| `TC_AUTH_008` | Auth | Keamanan Pemulihan Akun (Anti-Enumeration) | Verifikasi sistem tidak membocorkan info jika email tidak terdaftar dimasukkan | User berada di `/forgot-password`, belum login | 1. Buka `/forgot-password`<br/>2. Masukkan email tidak terdaftar<br/>3. Klik "Send Instructions" | `email: tidakada999@gmail.com` | Sistem menampilkan pesan sukses generik yang sama, tidak membocorkan apakah email ada di database | Berhasil. Pesan menampilkan kalimat sukses generik yang persis sama, berhasil mencegah kebocoran informasi pendaftaran akun (Anti-Account Enumeration). | **PASS** |

---

## 📝 Catatan Temuan Khusus (QA Defect & Usability Log):
1. **[Defect / Bug] Backend Validation Leakage (TC_AUTH_001 & TC_AUTH_004)**: Validasi backend mengembalikan raw error string internal Go (`Field validation for ... failed on the 'alphanum' / 'min' tag`) ke layar pengguna alih-alih pesan bahasa manusiawi.
2. **[Usability / UX Observation] Toast Notification Duration (TC_AUTH_002)**: Notifikasi konfirmasi instruksi aktivasi email berpindah terlalu cepat sebelum pengguna selesai membaca.
3. **[Security & Quality Strength] Defensive UI (TC_AUTH_003)**: Tombol *Create account* terkunci (*disabled state*) jika kriteria password belum hijau semua, mencegah request sampah masuk ke server (*Zero Unnecessary Network Traffic*).
4. **[Security Best Practice] Anti-User Enumeration (TC_AUTH_006 & TC_AUTH_008)**: Pesan kegagalan login dan pemulihan kata sandi bersifat ambigu secara sengaja (*"If this email is registered and verified..."*), secara efektif mencegah penyerang memetakan daftar akun yang valid di sistem.
5. **[Usability Note] Disclaimer Copywriting (TC_AUTH_007)**: Redaksi pesan sukses lupa password menggunakan kalimat bersyarat (*"jika email terdaftar..."*). Meskipun terasa sedikit kaku bagi sebagian user biasa, redaksi ini adalah standar industri keamanan global (seperti di GitHub dan Discord) untuk menyeimbangkan kenyamanan pengguna dan proteksi privasi.
