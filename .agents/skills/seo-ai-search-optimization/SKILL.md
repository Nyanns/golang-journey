---
name: seo-ai-search-optimization
description: Enterprise & Scientifically-Backed Guidelines for Technical SEO, Core Web Vitals, and Generative Engine Optimization (GEO) for AI Crawlers.
---

# Technical SEO & GEO (Generative Engine Optimization) Mastery

Skill ini berisi standar wajib berbasis riset saintifik (khususnya dari **Princeton University & IIT Delhi, ACM SIGKDD '24**) untuk mengoptimalkan *frontend* agar dominan di *Traditional Search* (Google) dan *AI-Powered Search* (SearchGPT, Perplexity, Claude, AI Overviews).

---

## 1. GEO (Generative Engine Optimization) - Pendekatan Saintifik
Menurut paper riset *GEO: Generative Engine Optimization (Aggarwal et al., 2024)*, pengoptimalan untuk AI (*Generative Engines*) sangat berbeda dengan SEO tradisional. AI merangkum dan menyintesis sumber untuk membuat *citation* (kutipan). Anda bisa meningkatkan visibilitas di AI Search hingga **40%** dengan strategi berikut:

*   **Tambahkan Statistik (Statistics Addition):** AI bot sangat memprioritaskan data kuantitatif. Gunakan angka yang konkret, terukur, dan spesifik dalam deskripsi atau paragraf utama (Contoh: *"Lebih dari 15.000 ilustrasi diunggah pada 2026..."*).
*   **Kutipan Pakar (Expert Quotations):** AI sangat suka mengutip balik kutipan. Jika memungkinkan, sediakan blockquote dari tokoh atau otoritas yang relevan di dalam konten.
*   **Sitasi Otoritatif (Citations):** Sematkan tautan keluar (*outbound links*) ke sumber-sumber kredibel tinggi (Wikipedia, Paper, Web Resmi). AI menganggap konten yang menyertakan sitasi sebagai referensi tingkat-sumber (*source-level*).
*   **Kefasihan & Keterbacaan (Fluency Optimization):** AI parser membenci struktur kalimat yang rumit. Tulis dengan kalimat aktif yang jelas, pragmatis, dan memiliki transisi logis yang halus.
*   **HINDARI Keyword Stuffing:** Berbeda dengan Google versi lama, pengulangan kata kunci secara brutal terbukti menurunkan tingkat sitasi pada Generative Engine.

### Struktur HTML Semantik untuk Parsing AI
- **Tag Navigasi & Hirarki:** Wajib menggunakan `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, dan `<footer>`. DILARANG menggunakan `<div>` secara berlebihan (div-soup).
- **Heading Linear:** Jangan lompati hierarki (misal: langsung dari `<h1>` ke `<h3>`). Heading yang runtut `h1 -> h2 -> h3` adalah peta bagi AI untuk membuat graf pengetahuan (*knowledge graph*).
- **Descriptive Alt Text:** Jangan tulis `alt="miku"`. Tulis `alt="Ilustrasi fan art cyberpunk Hatsune Miku resolusi 4K oleh kreator kuro_illust dengan teknik cel-shading"`. Ini penting untuk *Multimodal AI Engine*.
- **Structured Data JSON-LD:** Selalu inject Schema.org (`Article`, `ImageObject`, `Person`, `BreadcrumbList`) pada header halaman (`<head>`).

---

## 2. Technical SEO (Google & Bing Tradisional)
Meskipun AI mendominasi, crawler web konvensional tetap menjadi tulang punggung *indexing*.
- **Meta Tags Dinamis:** Gunakan `react-helmet-async` (di React) untuk merender `<title>` dan `<meta name="description">` dinamis per halaman.
  - **Title:** Format `[Konteks Spesifik] - [Nama Platform]`. Max 60 karakter.
  - **Description:** Ringkasan pragmatis. Max 160 karakter.
- **Open Graph (OG) & Twitter Cards:** Pastikan properti `og:title`, `og:image`, `og:url` terisi untuk preview yang kaya di media sosial dan aplikasi perpesanan.
- **Canonical URLs:** Gunakan `<link rel="canonical" href="..." />` agar web crawler tidak kebingungan saat ada URL parameter (misal: `?tag=Vocaloid`).

---

## 3. Core Web Vitals (Peringkat Berdasarkan Performa)
Kecepatan render adalah sinyal SEO yang kuat. Jika web lambat, AI crawler akan sering *timeout* atau melewatkan parsing konten berat.
- **LCP (Largest Contentful Paint) < 2.5s:**
  - `preload` hero image (`<link rel="preload" as="image" href="...">`).
  - Gunakan `fetchpriority="high"` khusus pada gambar *above-the-fold*.
- **CLS (Cumulative Layout Shift) < 0.1:**
  - Cegah layout melompat. Selalu gunakan rasio aspek bawaan CSS (`aspect-[4/3]`) atau sediakan komponen *Skeleton Loading* dengan ukuran persis sama.
- **Optimasi Media:**
  - Sajikan gambar dalam format `WebP` atau `AVIF`.
  - Pasang `loading="lazy"` HANYA untuk elemen media *below-the-fold* (yang belum terlihat saat layar pertama kali dibuka).

---

## 4. SPA Crawlability (Strategi Khusus React/Vite)
Aplikasi SPA (Single Page Application) seperti Vite mengirim DOM awal yang nyaris kosong (`<div id="root"></div>`). Beberapa crawler lama / bot non-Google tidak mengeksekusi JavaScript.
- **Rencana Jangka Panjang:** Jika publik harus bisa menemukan gambar di pencarian organik, siapkan strategi migrasi ke SSR (Next.js) atau gunakan *Pre-rendering Service* seperti `Prerender.io` yang mengirim HTML yang sudah diproses penuh ke bot Google/AI, sementara *user* asli tetap mendapatkan SPA.
- **CSR (Client-Side Rendering) Fallback:** Minimal, pastikan `index.html` dasar sudah mengandung fallback Meta Tag (Title & Description utama) yang cukup jelas tentang situs tersebut sebelum JS dimuat.

---
**Penerapan di Lumiina:** Skill ini adalah landasan filosofi setiap komponen frontend UI. Gunakan ini setiap merancang struktur komponen, membuat tag image, menyusun modal teks, hingga sistem route.
