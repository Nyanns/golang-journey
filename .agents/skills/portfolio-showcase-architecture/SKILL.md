---
name: portfolio-showcase-architecture
description: Production-grade developer portfolio engineering — ultra-fast Vite/Tailwind architecture, bilingual localization (EN/ID), Catppuccin design system, Vercel Edge hosting with Hostinger DNS, and authentic anti-slop developer storytelling.
---

# 🚀 Developer Portfolio Showcase Architecture

Panduan arsitektur dan standar rekayasa website portofolio teknikal developer modern yang memprioritaskan performa ekstrim (< 100 KB initial payload), desain editorial human-crafted (anti-slop), lokalisasi bilingual (EN/ID), dan infrastruktur edge berkecepatan tinggi.

---

## 1. ⚡ Performa & Bundle Economics

Website portofolio developer adalah kartu nama digital pertama bagi recruiters, engineering leads, dan klien. Loading lambat atau lagging adalah sinyal buruk.

1. **Target Metrik Mutlak**:
   - **Initial JS Bundle**: < 90 KB gzipped.
   - **Initial CSS Bundle**: < 10 KB gzipped.
   - **Total Initial Payload**: < 100 KB total.
   - **LCP (Largest Contentful Paint)**: < 0.8 detik.
   - **CLS (Cumulative Layout Shift)**: 0.000.
2. **Build Engine**:
   - Vite 8 dengan bundler native Rust (Rolldown) untuk kompresi dan tree-shaking maksimal.
   - TailwindCSS v4 berbasis CSS native tokens (tanpa dependensi PostCSS raksasa).
3. **Optimasi Asset LCP**:
   - Banner proyek utama wajib dikonversi ke **WebP** terkompresi (pangkas 80%–90% dari master PNG).
   - Injeksi `<link rel="preload" as="image" href="..." fetchpriority="high" type="image/webp" />` di `<head>`.
   - Cantumkan atribut `width`, `height`, dan `decoding="async"` eksplisit pada elemen `<img>` untuk mengeliminasi CLS.
4. **Edge Security Headers (`vercel.json`)**:
   ```json
   {
     "headers": [
       {
         "source": "/assets/(.*)",
         "headers": [
           { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
         ]
       },
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Content-Type-Options", "value": "nosniff" },
           { "key": "X-Frame-Options", "value": "DENY" },
           { "key": "X-XSS-Protection", "value": "1; mode=block" },
           { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
         ]
       }
     ]
   }
   ```

---

## 2. 🌐 Bilingual Localization Engine (EN / ID)

Recruiters global membutuhkan Bahasa Inggris profesional, sementara koneksi lokal dan komunitas Indonesia mengapresiasi kehangatan Bahasa Indonesia.

1. **Prinsip Desain**:
   - **Default Language**: Bahasa Inggris (`'en'`) sebagai standar global.
   - **Zero Heavy i18n Libraries**: Hindari pustaka berat seperti `i18next` (~50KB) untuk portofolio statis/semi-dinamis. Gunakan **React Context native** (~1KB).
2. **Arsitektur State (`LanguageContext.jsx`)**:
   - State `lang` disimpan di `localStorage` (`'nindhita_lang'`).
   - Sinkronisasi dinamis ke tag HTML: `document.documentElement.lang = lang` untuk SEO peramban.
   - Helper `t(key)` untuk teks UI ringkas dan dataset terstruktur (`data = lang === 'en' ? dataEN : dataID`).
3. **Komponen Pengalih Bahasa (Toggle)**:
   - Ditempatkan di tempat strategis: Navbar (desktop + mobile drawer) dan kartu Dashboard Preferences.
   - Tombol taktil segmented pill dengan label jelas: `EN / ID`.

---

## 3. 🎨 Visual Craftsmanship & Catppuccin Design System

Portofolio developer harus memancarkan estetika human-crafted, bersih, dan bebas dari AI slop (tidak ada glassmorphism murahan, border gradasi neon acak, atau floating blob yang mengganggu pembacaan).

1. **Editorial Minimalist Aesthetic**:
   - Terinspirasi oleh antarmuka developer elit (`jasoncameron.dev`, Linear, GitHub).
   - Palet warna: **Catppuccin** (Mocha untuk Dark Mode, Latte untuk Light Mode, dengan varian Frappe & Macchiato).
   - Tipografi: Kombinasi **Inter** (sans-serif bersih untuk UI) dan **JetBrains Mono** (monospace untuk kode, metrik, dan breadcrumbs).
2. **Interactive Elements yang Berbobot**:
   - **Terminal Breadcrumb**: Header navigasi interaktif bergaya path UNIX (`~ / projects`, `~ / stack`).
   - **Live Clock**: Jam lokal live dengan zona waktu (WIB Asia/Jakarta) dan indikator matahari/bulan sesuai jam pengguna.
   - **Live GitHub API Stats**: Menampilkan aktivitas commit terbaru secara real-time langsung dari GitHub API, lengkap dengan rasio bahasa dan perbandingan diff baris (+/-).
   - **Clean Project Cards**: Tampilkan preview visual tajam, deskripsi padat 2-3 kalimat yang berfokus pada arsitektur & metrik bisnis, badge teknologi ringkas, serta tombol langsung ke **Live Demo** dan **GitHub**. Hindari daftar bullet points arsitektur yang terlalu panjang di kartu.

---

## 4. 🌍 Domain, DNS & Deployment Topology

1. **Konfigurasi DNS Hostinger -> Vercel Edge**:
   - **Apex Domain (`@`)**: A-Record mengarah ke IP Anycast Vercel `76.76.21.21`.
   - **Subdomain WWW (`www`)**: CNAME Record mengarah ke `cname.vercel-dns.com`.
   - **SSL/TLS**: Terbit otomatis via Let's Encrypt di Vercel Edge.
   - **Redirect Handling**: Apex `https://nindhita.xyz` otomatis di-308 redirect ke kanonikal `https://www.nindhita.xyz` (atau sebaliknya sesuai preferensi).
2. **Google Search Console Onboarding**:
   - Gunakan **Dual Verification**: DNS TXT record di Hostinger + HTML `<meta name="google-site-verification" ... />` di `index.html`.
   - Submit sitemap kanonikal: `https://www.nindhita.xyz/sitemap.xml`.
   - Cantumkan Google Image Sitemap namespace (`xmlns:image`) agar preview arsitektur terindeks di pencarian gambar.
   - Sediakan `llms.txt` dan `robots.txt` ramah perayap AI sesuai standar GEO (*Generative Engine Optimization*).

---

## 5. 🛡️ Anti-AI Slop Content Guidelines

1. **Zero Fluff**: Jangan gunakan kalimat klise AI seperti *"I am a passionate software engineer dedicated to crafting seamless experiences"*.
2. **Gunakan Bukti Nyata (Proof of Work)**:
   - Tampilkan metrik konkret: *"Optimized initial bundle by 93% (640kB to 22kB)"*, *"100% test coverage with zero data race"*, *"PostgreSQL GIN trigram indexing for sub-millisecond queries"*.
   - Cantumkan kredensial yang dapat diverifikasi: Google Cybersecurity Professional Certificate, HackTheBox Level 10, tautan langsung ke repositori GitHub aktif.
