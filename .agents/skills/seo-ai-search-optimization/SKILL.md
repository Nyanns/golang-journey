---
name: seo-ai-search-optimization
description: Enterprise & Scientifically-Backed Guidelines for Technical SEO, Core Web Vitals, Dynamic Sitemap Engines, Wave-1 Bot Pre-rendering, and Generative Engine Optimization (GEO).
---

# Technical SEO, Search Engine Infrastructure & GEO Mastery

Skill ini berisi standar arsitektur kelas produksi berbasis riset saintifik (ACM SIGKDD '24, Google Search Central, dan standard web RFC) untuk mengoptimalkan website agar mendominasi mesin pencari konvensional (Google, Bing) dan AI-powered search (SearchGPT, Perplexity, Claude, AI Overviews).

---

## 1. Arsitektur Search Engine Infrastructure (Backend Level)

### A. Dynamic XML Sitemap Engine (`GET /sitemap.xml`)
Untuk web dinamis (seperti platform fan art, media, e-commerce, atau betting), sitemap tidak boleh statis. Wajib dibuat secara dinamis di backend:
1. **Standar Protokol**:
   - `http://www.sitemaps.org/schemas/sitemap/0.9`
   - Ekstensi Gambar: `http://www.google.com/schemas/sitemap-image/1.1` (`<image:image>`, `<image:loc>`, `<image:title>`) untuk mengindeks aset CDN ke Google Images.
2. **Struktur URL Priority & Frequency**:
   - Beranda (`/`): `priority: 1.0`, `changefreq: hourly`.
   - Halaman Tematik (`/explore`, `/trending`): `priority: 0.9`, `changefreq: daily`.
   - Entitas Konten (`/artworks/:id`, `/posts/:id`): `priority: 0.8`, `changefreq: weekly`.
   - Profil Pengguna Terverifikasi (`/profile/:username`): `priority: 0.7`, `changefreq: daily`.
   - Legal/Guidelines (`/terms`, `/privacy`): `priority: 0.6`, `changefreq: monthly`.
3. **Crawl Budget & Redis Shielding**:
   - Crawler rayap (bot) dapat membombardir endpoint sitemap. Wajib gunakan cache Redis (misal `seo:sitemap_xml:v2`) dengan TTL 30–60 menit untuk melindungi database PostgreSQL dari lonjakan beban.
4. **Validasi Base URL Absolut**:
   - Pastikan URL diawali protokol valid (`https://` atau `http://`). Jika environment variable kosong atau salah, fallback otomatis ke domain kanonikal resmi (misal `https://www.lumiina.art`).

---

### B. Wave-1 Bot Pre-rendering (SPA Blind Bot Defense)
Aplikasi SPA (Vite/React/Vue) hanya mengirim shell HTML kosong (`<div id="root"></div>`), yang menyebabkan bot perpesanan (WhatsApp, Discord, Twitter/X) dan Googlebot Wave-1 (sebelum eksekusi JS) gagal membaca judul atau thumbnail.

1. **Zero-Overhead Edge Pre-renderer di Go**:
   - Tidak perlu server Node.js SSR terpisah.
   - Deteksi crawler via regex User-Agent di middleware router:
     ```text
     (?i)(googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp|discordbot|telegrambot|applebot)
     ```
   - Intersep request bot pada rute entitas dinamis (misal `/artworks/:id`, `/profile/:username`).
   - Suntikkan meta tags OpenGraph (`og:title`, `og:image`, `og:url`), Twitter Cards (`twitter:card`, `twitter:image`), dan `<script type="application/ld+json">` langsung ke dalam buffer HTML `index.html` sebelum disajikan ke crawler.
   - Pengunjung manusia biasa tetap menerima SPA murni dengan hidrasi JavaScript kilat.

---

## 2. Tata Kelola Domain & Google Search Console (GSC)

### A. Verifikasi Kepemilikan Domain (DNS Level)
1. **Analogi Sertifikat Tanah**: DNS adalah otoritas tertinggi internet. Menaruh record TXT membuktikan kepemilikan mutlak atas domain tanpa bergantung pada kode aplikasi.
2. **DNS TXT Record**:
   - Hostinger/Cloudflare hPanel:
     - Type: `TXT`
     - Name: `@` (root domain)
     - Content: `"google-site-verification=TOKEN..."`
     - TTL: `14400` atau `3600`
3. **Domain Property vs URL-Prefix**:
   - **Domain Property (`sc-domain:example.com`)**: Mengontrol seluruh protokol (`http`, `https`, `www`, non-`www`, dan semua subdomain). Wajib submit sitemap dengan **Full URL Lengkap** (misal `https://www.lumiina.art/sitemap.xml`).
   - **URL-Prefix Property**: Hanya mengontrol satu awalan spesifik. Submit sitemap menggunakan path relatif (misal `sitemap.xml`).
4. **Dual-Verification Pattern (Anti-TTL Delay)**:
   - Terapkan verifikasi ganda: Record **DNS TXT** (level domain menyeluruh) + tag HTML `<meta name="google-site-verification" content="..." />` di `<head>` (level edge deployment instan).
   - Validasi propagasi DNS resolver publik via `dig +short TXT <domain> @8.8.8.8` sebelum menekan tombol verifikasi di UI GSC.
5. **Siklus Antrean GSC & Favicon/Logo Indexing**:
   - Status *"Couldn't fetch"* dengan *Type: Unknown* tepat setelah submit sitemap adalah status antrean default (belum diproses worker Google).
   - **Favicon & Logo Pipeline**: Bot pencari icon (`Google Favicon / Googlebot-Image`) beroperasi asinkron terpisah dari bot teks.
     - Spesifikasi Google: Icon wajib persegi dengan dimensi kelipatan 48px (`48x48`, `96x96`, `192x192`), format `.png` / `.ico` / `.svg`, dan tidak diblokir `robots.txt`.
     - Timeline: Logo di GSC dan snippet hasil pencarian Google membutuhkan waktu **24–72 jam** sejak domain terverifikasi pertama kali (*"Processing data, please check again in a day or so"*).
     - **Akselerasi Pengindeksan**: Gunakan fitur **URL Inspection** -> masukkan URL root (`https://domain.com/`) -> klik **"Request Indexing"** untuk memicu crawl prioritas.

---

### B. Otomatisasi Indexing Skala Besar (Enterprise & High-Traffic)
Untuk platform dengan volume URL tinggi (berita, live score, e-commerce, betting):
1. **Google Indexing API (v3)**:
   - Gunakan Google Cloud Service Account dengan role Search Console Owner.
   - Kirim notifikasi publikasi instan via HTTP POST `https://indexing.googleapis.com/v3/urlNotifications:publish`.
   - Mengarahkan Googlebot merayap halaman dalam hitungan detik setelah konten di-publish.
2. **Protokol IndexNow**:
   - Sekali ping HTTP POST ke `api.indexnow.org` otomatis mengabari Bing, Yandex, dan mesin pencari mitra secara instan.

---

## 3. GEO (Generative Engine Optimization) - Pendekatan Saintifik

Berdasarkan riset saintifik (*Aggarwal et al., ACM SIGKDD '24*), AI search (SearchGPT, Perplexity, Google AI Overviews) menyintesis sumber untuk membuat sitasi (*citations*). Visibilitas AI meningkat hingga **40%** dengan prinsip:

1. **Tambahkan Statistik Kuantitatif**: AI mengutamakan angka konkret dan terukur dalam deskripsi atau paragraf utama (misal: *"Lebih dari 15.000 ilustrasi kurasi seniman..."*).
2. **Kutipan Pakar (Expert Quotations)**: Sematkan kutipan langsung atau kutipan otoritatif yang relevan.
3. **Sitasi Otoritatif (Citations)**: Sertakan *outbound links* ke sumber berotoritas tinggi (Wikipedia, dokumentasi resmi).
4. **Struktur Semantik Tanpa Div-Soup**:
   - Gunakan `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, dan `<footer>`.
   - Heading hirarkis yang runtut: `h1 -> h2 -> h3`.
5. **Descriptive Alt Text**:
   - Jangan: `alt="lumiina"`.
   - Gunakan: `alt="Ilustrasi fan art anime karakter Lumiina dengan tablet digital resolusi 4K oleh kreator verified"`.
6. **Structured Data JSON-LD**:
   - Inject Schema.org (`WebSite`, `ImageObject`, `Person`, `BreadcrumbList`) pada `<head>`.

---

## 4. Core Web Vitals & Performa Edge

1. **LCP (Largest Contentful Paint) < 2.5s**:
   - Preload hero visual: `<link rel="preload" as="image" href="..." fetchpriority="high">`.
   - Sajikan media format modern (`WebP` / `AVIF`).
2. **CLS (Cumulative Layout Shift) < 0.1**:
   - Sediakan aspect ratio eksplisit atau skeleton loader berdimensi identik sebelum gambar termuat.
3. **Lazy Loading Selektif**:
   - Gunakan `loading="lazy"` HANYA untuk elemen di bawah batas layar (*below-the-fold*). Hindari lazy load pada elemen hero.

---
**Penerapan Global**: Terapkan standar ini setiap kali merancang routing baru, membangun endpoint backend data, mengonfigurasi DNS server, atau merilis frontend visual ke publik.
