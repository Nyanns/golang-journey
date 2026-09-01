---
name: seo-ai-search-optimization
description: Pedoman Enterprise untuk Technical SEO, Core Web Vitals, dan AI-Search Optimization (AIO/GEO) untuk memastikan web cepat, responsif, dan mudah di-crawling oleh Google & AI Bot.
---

# Technical SEO & AI-Search Optimization Guidelines

Skill ini mendefinisikan standar wajib yang harus diikuti saat membangun frontend (terutama SPA seperti React/Vite) agar sangat mudah ditemukan oleh mesin pencari tradisional (Google, Bing) dan mesin pencari berbasis AI (SearchGPT, Perplexity, Gemini).

## 1. AI-Search Optimization (AIO / GEO)
Mesin pencari AI lebih berfokus pada merangkum dan mengekstrak entitas informasi daripada sekadar memberikan tautan.
- **Semantic HTML5:** Selalu gunakan tag semantik (`<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<main>`). AI bot menggunakan tag ini untuk memahami hierarki dan konteks konten. Hindari penggunaan `<div>` secara berlebihan untuk struktur utama.
- **Hierarki Heading yang Logis:** Gunakan satu `<h1>` per halaman yang mendeskripsikan entitas utama. Lanjutkan dengan `<h2>` dan `<h3>` secara berurutan. DILARANG melompati level heading (misal dari `<h1>` langsung ke `<h3>`).
- **Descriptive Alt Text:** Model AI Vision dan screen reader sangat bergantung pada atribut `alt`. Gunakan deskripsi yang kaya konteks (Contoh: `alt="Ilustrasi fan art cyberpunk Hatsune Miku resolusi tinggi oleh kuro_illust"` BUKAN sekadar `alt="miku"`).
- **Structured Data (JSON-LD):** Implementasikan Schema.org (misal: `ImageObject` untuk karya seni, `Person` untuk profil artist, `BreadcrumbList` untuk navigasi). Ini membuat AI engine mengerti bahwa halaman tersebut merepresentasikan sebuah "Karya Seni" atau "Kreator".

## 2. Technical SEO Dasar
- **Dynamic Meta Tags:** Setiap halaman HARUS memiliki `<title>` dan `<meta name="description">` yang unik. (Gunakan library seperti `react-helmet-async`).
  - **Title:** 50-60 karakter. (Contoh: `[Judul Karya] oleh [Nama Artist] - Lumiina`).
  - **Description:** 150-160 karakter, deskriptif, dan mengandung kata kunci natural.
- **Open Graph & Twitter Cards:** Wajib ada meta tag `og:title`, `og:image`, `og:description`, `twitter:card` untuk preview yang cantik saat link dibagikan di Discord, WhatsApp, atau X.
- **Canonical URLs:** Gunakan `<link rel="canonical" href="..." />` untuk mencegah isu duplikasi konten.

## 3. Core Web Vitals (Performa & Kecepatan)
Google dan AI crawler memprioritaskan situs yang sangat cepat.
- **LCP (Largest Contentful Paint) < 2.5 detik:**
  - Lakukan preload pada gambar hero/utama (`<link rel="preload" as="image" ...>`).
  - Tambahkan `fetchpriority="high"` pada gambar terpenting di *above the fold*.
- **CLS (Cumulative Layout Shift) < 0.1:**
  - JANGAN biarkan layout melompat saat gambar di-load. Selalu setel rasio aspek di CSS (`aspect-square`, `aspect-[4/3]`) atau sediakan *skeleton loading* yang ukurannya sama dengan konten aslinya.
- **Image Optimization:**
  - Selalu format gambar modern (WebP/AVIF).
  - Tambahkan `loading="lazy"` HANYA untuk gambar yang berada di bawah lipatan layar (*below the fold*). Gambar di *above the fold* tidak boleh di-lazy load.

## 4. Render State & SPA Crawlability
- Aplikasi Vite + React (SPA) mengirimkan `<div id="root"></div>` kosong di awal. Meskipun Googlebot bisa mengeksekusi JavaScript, bot lain (Twitter bot, Facebook crawler, beberapa AI bot) mungkin tidak.
- **Strategi SEO untuk SPA:** Pastikan setup meta tag cukup baik di `index.html`, dan pertimbangkan *Pre-rendering* (seperti prerender.io) atau migrasi bertahap ke SSR (Next.js) jika SEO publik menjadi tulang punggung akuisisi user di masa depan.

## Checklist Penerapan di Proyek Lumiina:
1. Pasang paket `react-helmet-async` untuk manajemen meta tag dinamis (Title berubah saat buka modal artwork).
2. Pastikan Masonry Grid pada `ArtworkCard` menggunakan teknik penahan ruang (*space placeholder*) agar tidak terjadi CLS parah.
3. Gunakan Semantic HTML di `<Navbar>`, `<main>`, `<article>` untuk tiap kartu karya, dan `<footer>`.
