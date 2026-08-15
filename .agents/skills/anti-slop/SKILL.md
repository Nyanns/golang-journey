---
name: anti-slop
description: Anti-AI Slop Engineering & Design Rules (Zero-Fluff Code, No Redundant Comments, Realistic Data, Human Craftsmanship)
---

# 🛡️ Anti-AI Slop Engineering & Design Standard

When writing code, architecture, and UI/UX, STRICTLY avoid low-effort AI signatures and enforce senior human craftsmanship.

---

## 1. 🧹 Code Cleanliness & Zero-Fluff (No Code Slop)
- **NO Obvious/Redundant Comments**:
  - ❌ `// Loop through animes and print: for _, a := range animes { ... }`
  - ❌ `// Function to get user by id: func GetUserByID(id int) { ... }`
  - ✅ Write clean, self-documenting code. Only comment **WHY** a non-obvious business logic decision was made, never restate **WHAT** the code does.
- **NO Over-Engineering**:
  - Do not create 5 layers of abstract factories, providers, or premature interfaces for simple tasks.
  - Follow **KISS** (Keep It Simple, Stupid) & **YAGNI** (You Aren't Gonna Need It).
- **NO Silent / Swallowed Errors**:
  - Never do `_ = err` or just `fmt.Println(err)`. Handle errors properly at the source.
- **Minimal, Surgical Diffs**:
  - Only change what is requested. Never refactor surrounding working code without explicit instruction.

---

## 2. 🎯 Realistic Domain Data (No Lazy Mocks)
- **NO Lazy Test Data**:
  - ❌ `"test1"`, `"foo"`, `"bar"`, `"asdf"`, `"Lorem ipsum dolor sit amet"`
  - ❌ `"User 123"`, `"Sample Description"`
- **YES Realistic Domain Content**:
  - Use real-world, high-context data (e.g. for Anime: *"Fullmetal Alchemist: Brotherhood"*, Genre: *"Action, Adventure"*, Rating: `9.1`, Synopsis: *"Two brothers search for a Philosopher's Stone to restore their bodies..."*).

---

## 3. 🎨 Anti-AI Slop Khusus Frontend (UI/UX Engineering)

Berikut adalah daftar **dosa besar (anti-pattern)** yang paling sering dibuat oleh AI malas saat mendesain frontend, dan **solusi standar manusia profesional**:

### 🚫 Dosa 1: "The Purple Glow Epidemic" (Wabah Gradasi Ungu/Biru Neon)
* ❌ **Slop**: Menaruh `bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500` di setiap tombol, teks header, dan background card blur-blob di mana-mana.
* ✅ **Craft**: Gunakan warna monokromatis yang berkelas (Zinc/Slate) dengan **satu aksen fungsional yang tajam** (misal: Indigo 600 atau Emerald 500). Jangan hambur-hamburkan gradasi warna-warni jika tidak ada tujuan hirarki visual.

### 🚫 Dosa 2: "The Centered-Everything Syndrome"
* ❌ **Slop**: Semua section di-tengah (`text-center`), mulai dari judul, paragraf, form, hingga tabel. Terlihat seperti template demo murahan.
* ✅ **Craft**: Gunakan layout **Left-Aligned** yang alami untuk membaca dokumen/dashboard. Teks di-center hanya boleh untuk Hero title singkat atau status kosong (*empty state*).

### 🚫 Dosa 3: "Three Identical Feature Cards" (Penyakit 3 Kotak Kembar)
* ❌ **Slop**: Selalu membuat 3 card simetris dengan ikon di kotak bulat + judul generik + 2 baris penjelasan template.
* ✅ **Craft**: Buat layout dinamis (*Bento Grid* / *Asymmetric Grid*). Tampilkan data konkret: live chart, preview komponen mini, metrik angka nyata, atau interactive switch.

### 🚫 Dosa 4: "Robot Copywriting & Fake Testimonials"
* ❌ **Slop**: 
  - *"Transform your digital experience with next-gen AI-powered synergy"*
  - *"John Doe, CEO at TechCorp: 'This app 10x my team's output!'"*
* ✅ **Craft**: Tulis teks yang manusiawi, spesifik, dan langsung ke inti produk.
  - *"Pantau progres antrean secara real-time tanpa install aplikasi."*
  - *"Filter anime berdasarkan episode, status tonton, dan rating MyAnimeList."*

### 🚫 Dosa 5: "Lupa State Nyata (States Amnesia)"
* ❌ **Slop**: Hanya mendesain tampilan ideal (*happy path*). Lupa kalau di dunia nyata ada:
  - Form validasi error (input merah + pesan jelas di bawah field).
  - Button state: `disabled`, `loading` (spinner/disable click), `focus-visible` (aksesibilitas keyboard).
  - Empty state saat data masih 0 (jangan layar kosong putih).
  - Loading skeleton yang ukurannya pas dengan data asli (mencegah *layout shift / CLS*).

### 🚫 Dosa 6: "Hardcoded Fixed Heights"
* ❌ **Slop**: Memberi `h-[500px]` pada card atau modal, sehingga saat teks panjang di perangkat mobile, teksnya terpotong atau tembus (*overflow*).
* ✅ **Craft**: Gunakan `min-h-...` atau biarkan *flex/grid auto-flow* dengan padding yang nyaman. Pastikan selalu responsif di mobile (`sm:`, `md:`, `lg:`).

