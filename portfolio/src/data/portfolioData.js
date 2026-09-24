const commonLinks = {
  github: "https://github.com/Nyanns",
  linkedin: "https://www.linkedin.com/in/satrianindhita/",
  medium: "https://level13.medium.com/",
  leetcode: "https://leetcode.com/u/Nyanns/",
  hackthebox: "https://app.hackthebox.com/users/3743544",
  resume: "/Satria_Nindhita_CV.pdf",
  email: "mailto:sandi.nindhita@gmail.com",
};

const commonLocation = {
  city: "Yogyakarta",
  country: "Indonesia",
  label: "Yogyakarta, ID",
  timeZone: "Asia/Jakarta",
};

const commonLanguages = [
  { name: "Go", percentage: 58, color: "var(--ctp-sapphire)" },
  { name: "JavaScript", percentage: 22, color: "var(--ctp-yellow)" },
  { name: "SQL", percentage: 12, color: "var(--ctp-blue)" },
  { name: "Python", percentage: 8, color: "var(--ctp-green)" },
];

const commonRecentCommits = [
  {
    repo: "golang-journey",
    message: "chore(portfolio): finalize pre-hosting optimizations (SEO meta, sitemap, llms.txt, vercel.json, a11y)",
    additions: 116,
    deletions: 11,
    sha: "4b88a42",
    url: "https://github.com/Nyanns/golang-journey/commit/4b88a42",
    date: "Sep 24, 2026",
  },
  {
    repo: "golang-journey",
    message: "fix(portfolio): update favicon to official Lumiina blue star mark and restore navbar typing prompt",
    additions: 787,
    deletions: 227,
    sha: "a7c2dcc",
    url: "https://github.com/Nyanns/golang-journey/commit/a7c2dcc",
    date: "Sep 24, 2026",
  },
  {
    repo: "golang-journey",
    message: "feat(portfolio): complete Catppuccin interactive dashboard, background effect, and refined section styling",
    additions: 923,
    deletions: 255,
    sha: "142dfac",
    url: "https://github.com/Nyanns/golang-journey/commit/142dfac",
    date: "Sep 24, 2026",
  },
];

export const portfolioDataEN = {
  personal: {
    name: "Satria Nindhita",
    brand: "nindhita.xyz",
    role: "Backend Engineer · QA Automation (SDET) · Cybersecurity",
    intro:
      "Backend Engineer & QA Automation Engineer (SDET) with a solid Cybersecurity foundation. I specialize in architecting high-concurrency Go microservices, engineering rigorous automated testing pipelines (IEEE 829, Newman, Playwright), and integrating defense-in-depth security at every architectural layer.",
    status:
      "Currently shipping Lumiina (anime illustration platform) live in production at lumiina.art, and continuously deepening Go concurrency & distributed systems patterns.",
    email: "sandi.nindhita@gmail.com",
    links: commonLinks,
  },

  location: commonLocation,

  projects: [
    {
      title: "Lumiina",
      role: "Flagship Production Platform",
      image: "/projects/lumiina-ui.webp",
      isLogo: false,
      liveUrl: "https://www.lumiina.art",
      githubUrl: "https://github.com/Nyanns/lumiina",
      description:
        "An authentic creator and anime illustration platform engineered from the ground up with a high-concurrency Go backend and modern client architecture.",
      highlights: [
        "Architected with Go Clean Layered Architecture (Handler-Service-Repository) and PostgreSQL trigram GIN indexes for sub-millisecond substring queries.",
        "Implemented timing-attack resistant authentication via constant-time bcrypt canary hashes to defeat username enumeration.",
        "Engineered zero-lag Wave-1 bot pre-rendering middleware injecting dynamic OpenGraph and JSON-LD for social and search crawlers.",
        "Optimized client performance with 93% initial bundle reduction (640kB to 22kB) and client-side WebP downsampling reducing image payloads by 85%–95%.",
      ],
      tech: ["Go 1.24+", "Gin", "PostgreSQL 16", "Redis 7", "React 19", "TailwindCSS v4", "Docker", "Vercel Edge"],
    },
    {
      title: "Lumiina QA & Automation Suite",
      role: "Test Engineering & CI/CD",
      image: "/projects/lumiina-logo.png",
      isLogo: true,
      liveUrl: null,
      githubUrl: "https://github.com/Nyanns/lumiina-qa-automation",
      description:
        "Formal test automation suite designed according to IEEE 829 standards with automated Newman regression pipelines and dual-system defect tracking.",
      highlights: [
        "Authored 13-case test matrix across Equivalence Partitioning and Boundary Value Analysis, achieving 92.3% execution pass rate.",
        "Automated end-to-end API regression runs with Postman token chaining, Chai assertions, and Playwright verification.",
        "Documented and triaged production defects via Jira Software (LUM-5, LUM-6) and GitHub Issues (#26, #27) with reproduction payloads and RCA.",
      ],
      tech: ["Postman", "Newman CLI", "Chai JS", "Playwright", "IEEE 829", "Jira Software", "GitHub Actions"],
    },
  ],

  stack: [
    {
      category: "Backend & Concurrency",
      icon: "server",
      items: [
        "Go (Golang 1.24+)",
        "Gin Gonic",
        "Clean Layered Architecture",
        "GORM & database/sql",
        "Goroutines & Concurrency Safety",
        "golang-migrate",
        "Sqids ID Obfuscation",
      ],
    },
    {
      category: "QA & Automated Testing (SDET)",
      icon: "check-circle",
      items: [
        "Playwright E2E",
        "Cypress",
        "Postman & Newman CLI",
        "Chai Assertions",
        "IEEE 829 Test Plans",
        "Equivalence Partitioning & BVA",
        "Table-driven Unit Tests",
        "Testify Mocks",
        "Jira Defect Lifecycle",
      ],
    },
    {
      category: "Defensive Security & Cryptography",
      icon: "shield",
      items: [
        "Constant-Time Canary Hashes",
        "Session Revocation Epochs",
        "Redis Lua Sliding-Window Rate Limiter",
        "Decompression Bomb Defense",
        "OWASP API Top 10 Mitigation",
        "Strict CSP & HSTS Headers",
        "Linux Privilege Escalation (HTB)",
      ],
    },
    {
      category: "Data & Storage Systems",
      icon: "database",
      items: [
        "PostgreSQL 16 (pg_trgm GIN, B-Tree)",
        "Redis 7 (Singleflight Caching, Distributed Locks)",
        "EXPLAIN ANALYZE Optimization",
        "Cloudinary Media Pipeline",
      ],
    },
    {
      category: "Technical SEO & Search Intelligence",
      icon: "search",
      items: [
        "Wave-1 Bot Pre-rendering",
        "Dynamic Sitemap Engine (RFC 8288)",
        "JSON-LD Schema (SoftwareApp/Article)",
        "Core Web Vitals Optimization",
        "OpenGraph Social Automation",
        "GEO (Generative Engine Optimization)",
      ],
    },
    {
      category: "DevOps, Infra & CI/CD",
      icon: "cloud",
      items: [
        "Docker Multi-Stage (~19MB Alpine)",
        "GitHub Actions CI/CD",
        "Vercel Edge Anycast",
        "Linux / Bash Automation",
      ],
    },
  ],

  writing: [
    {
      title: "Defeating Timing-Attacks & Username Enumeration with Constant-Time Canary Hashes in Go",
      url: "https://www.linkedin.com/in/satrianindhita/",
      date: "Sep 2026",
      publication: "LinkedIn",
    },
    {
      title: "Engineering IEEE 829 QA Test Matrices & Automated Newman Pipelines for Microservices",
      url: "https://www.linkedin.com/in/satrianindhita/",
      date: "Sep 2026",
      publication: "LinkedIn",
    },
    {
      title: "Why I Chose Go (Golang) as My Main Programming Language",
      url: "https://level13.medium.com/why-i-chose-go-golang-as-my-main-programming-language-493b83631199",
      date: "Aug 2026",
      publication: "Medium",
    },
    {
      title: "Building Pixel-Perfect Web Apps with React & TailwindCSS",
      url: "https://level13.medium.com/building-pixel-perfect-web-apps-with-react-tailwindcss-d4c382e75294",
      date: "Jul 2026",
      publication: "Medium",
    },
  ],

  recentCommits: commonRecentCommits,
  languages: commonLanguages,

  signals: [
    {
      name: "HackTheBox Level 10",
      handle: "app.hackthebox.com/users/3743544",
      title: "Level 10 Contributor",
      detail: "Penetration testing lab challenges, privilege escalation, web application security vulnerabilities, and network pivoting.",
      url: "https://app.hackthebox.com/users/3743544",
      action: "HTB Profile ↗",
    },
    {
      name: "LeetCode",
      handle: "leetcode.com/u/Nyanns",
      title: "Algorithmic Problem Solving",
      detail: "Data structures, dynamic programming, graph traversal, and time/space complexity optimization.",
      url: "https://leetcode.com/u/Nyanns/",
      action: "Profile ↗",
    },
    {
      name: "Google Cybersecurity",
      handle: "Professional Certificate",
      title: "Defensive Security Practitioner",
      detail: "Linux command line, SQL query forensics, network security, Python automation, and incident mitigation.",
      url: "https://www.linkedin.com/in/satrianindhita/",
      action: "Credential ↗",
    },
    {
      name: "Stanford / DeepLearning.AI",
      handle: "Advanced Learning Algorithms",
      title: "Neural Networks & Decision Trees",
      detail: "Supervised and unsupervised learning architectures, model optimization, and algorithmic evaluation.",
      url: "https://www.linkedin.com/in/satrianindhita/",
      action: "Credential ↗",
    },
  ],

  experience: [
    {
      role: "IT Support & Fullstack Dev (Internship)",
      company: "Badan Kepegawaian Negara RI (BKN)",
      period: "Nov 2025 – May 2026",
      description:
        "Spearheaded internal digital transformation by developing and deploying an Employee Logbook application using React, Go (Golang), and PostgreSQL. Managed technical broadcasting for official state events via OBS Studio and authored digital cybersecurity awareness media.",
    },
    {
      role: "Machine Learning Engineer (Cohort)",
      company: "Bangkit Academy (Google, Tokopedia, GoTo, Traveloka)",
      period: "2024",
      description:
        "Completed a 6-month intensive engineering curriculum covering Python data pipelines, TensorFlow architectures, and collaborative capstone model deployment.",
    },
  ],
};

export const portfolioDataID = {
  personal: {
    name: "Satria Nindhita",
    brand: "nindhita.xyz",
    role: "Backend Engineer · QA Automation (SDET) · Cybersecurity",
    intro:
      "Backend Engineer & QA Automation Engineer (SDET) dengan fondasi Cybersecurity yang kuat. Berfokus pada perancangan microservices Go berkonkurensi tinggi, rekayasa pipeline otomatisasi pengujian berstandar IEEE 829 (Newman, Playwright), serta penerapan keamanan berlapis (defense-in-depth) di setiap layer arsitektur.",
    status:
      "Saat ini mendeploy Lumiina (platform ilustrasi anime) secara live di produksi pada lumiina.art, serta terus mendalami pola konkurensi Go & sistem terdistribusi.",
    email: "sandi.nindhita@gmail.com",
    links: commonLinks,
  },

  location: {
    city: "Yogyakarta",
    country: "Indonesia",
    label: "Yogyakarta, Indonesia",
    timeZone: "Asia/Jakarta",
  },

  projects: [
    {
      title: "Lumiina",
      role: "Platform Produksi Unggulan",
      image: "/projects/lumiina-ui.webp",
      isLogo: false,
      liveUrl: "https://www.lumiina.art",
      githubUrl: "https://github.com/Nyanns/lumiina",
      description:
        "Platform kreator dan ilustrasi anime otentik yang dibangun dari nol dengan backend Go berkonkurensi tinggi dan arsitektur klien modern.",
      highlights: [
        "Dirancang dengan Clean Layered Architecture Go (Handler-Service-Repository) dan indeks trigram GIN PostgreSQL untuk query substring berkecepatan sub-milidetik.",
        "Menerapkan autentikasi tahan timing-attack melalui hash bcrypt canary konstan guna menggagalkan eksploitasi enumerasi username.",
        "Membangun middleware pre-rendering Wave-1 zero-lag yang menyuntikkan OpenGraph dan JSON-LD dinamis untuk bot perpesanan dan crawler pencarian.",
        "Mengoptimalkan performa klien dengan reduksi bundle awal 93% (640kB ke 22kB) serta downsampling WebP sisi klien yang memangkas ukuran aset 85%–95%.",
      ],
      tech: ["Go 1.24+", "Gin", "PostgreSQL 16", "Redis 7", "React 19", "TailwindCSS v4", "Docker", "Vercel Edge"],
    },
    {
      title: "Lumiina QA & Automation Suite",
      role: "Rekayasa Pengujian & CI/CD",
      image: "/projects/lumiina-logo.png",
      isLogo: true,
      liveUrl: null,
      githubUrl: "https://github.com/Nyanns/lumiina-qa-automation",
      description:
        "Suite otomatisasi pengujian formal berstandar IEEE 829 dengan pipeline regresi otomatis Newman dan sinkronisasi pelacakan bug lintas sistem.",
      highlights: [
        "Menyusun matriks uji 13 skenario menggunakan Equivalence Partitioning dan Boundary Value Analysis, mencapai tingkat kelulusan eksekusi 92.3%.",
        "Mengotomatiskan uji regresi API menyeluruh (end-to-end) dengan chaining token Postman, asersi Chai, dan verifikasi Playwright.",
        "Mendokumentasikan dan men-triage bug produksi melalui Jira Software (LUM-5, LUM-6) dan GitHub Issues (#26, #27) lengkap dengan payload reproduksi dan RCA.",
      ],
      tech: ["Postman", "Newman CLI", "Chai JS", "Playwright", "IEEE 829", "Jira Software", "GitHub Actions"],
    },
  ],

  stack: [
    {
      category: "Backend & Konkurensi",
      icon: "server",
      items: [
        "Go (Golang 1.24+)",
        "Gin Gonic",
        "Clean Layered Architecture",
        "GORM & database/sql",
        "Goroutines & Concurrency Safety",
        "golang-migrate",
        "Sqids ID Obfuscation",
      ],
    },
    {
      category: "QA & Otomasi Pengujian (SDET)",
      icon: "check-circle",
      items: [
        "Playwright E2E",
        "Cypress",
        "Postman & Newman CLI",
        "Chai Assertions",
        "IEEE 829 Test Plans",
        "Equivalence Partitioning & BVA",
        "Table-driven Unit Tests",
        "Testify Mocks",
        "Jira Defect Lifecycle",
      ],
    },
    {
      category: "Keamanan Defensif & Kriptografi",
      icon: "shield",
      items: [
        "Constant-Time Canary Hashes",
        "Session Revocation Epochs",
        "Redis Lua Sliding-Window Rate Limiter",
        "Decompression Bomb Defense",
        "OWASP API Top 10 Mitigation",
        "Strict CSP & HSTS Headers",
        "Linux Privilege Escalation (HTB)",
      ],
    },
    {
      category: "Sistem Data & Penyimpanan",
      icon: "database",
      items: [
        "PostgreSQL 16 (pg_trgm GIN, B-Tree)",
        "Redis 7 (Singleflight Caching, Distributed Locks)",
        "EXPLAIN ANALYZE Optimization",
        "Cloudinary Media Pipeline",
      ],
    },
    {
      category: "SEO Teknis & AI Search Intelligence",
      icon: "search",
      items: [
        "Wave-1 Bot Pre-rendering",
        "Dynamic Sitemap Engine (RFC 8288)",
        "JSON-LD Schema (SoftwareApp/Article)",
        "Core Web Vitals Optimization",
        "OpenGraph Social Automation",
        "GEO (Generative Engine Optimization)",
      ],
    },
    {
      category: "DevOps, Infrastruktur & CI/CD",
      icon: "cloud",
      items: [
        "Docker Multi-Stage (~19MB Alpine)",
        "GitHub Actions CI/CD",
        "Vercel Edge Anycast",
        "Linux / Bash Automation",
      ],
    },
  ],

  writing: [
    {
      title: "Defeating Timing-Attacks & Username Enumeration with Constant-Time Canary Hashes in Go",
      url: "https://www.linkedin.com/in/satrianindhita/",
      date: "Sep 2026",
      publication: "LinkedIn",
    },
    {
      title: "Engineering IEEE 829 QA Test Matrices & Automated Newman Pipelines for Microservices",
      url: "https://www.linkedin.com/in/satrianindhita/",
      date: "Sep 2026",
      publication: "LinkedIn",
    },
    {
      title: "Why I Chose Go (Golang) as My Main Programming Language",
      url: "https://level13.medium.com/why-i-chose-go-golang-as-my-main-programming-language-493b83631199",
      date: "Agu 2026",
      publication: "Medium",
    },
    {
      title: "Building Pixel-Perfect Web Apps with React & TailwindCSS",
      url: "https://level13.medium.com/building-pixel-perfect-web-apps-with-react-tailwindcss-d4c382e75294",
      date: "Jul 2026",
      publication: "Medium",
    },
  ],

  recentCommits: commonRecentCommits,
  languages: commonLanguages,

  signals: [
    {
      name: "HackTheBox Level 10",
      handle: "app.hackthebox.com/users/3743544",
      title: "Kontributor Level 10",
      detail: "Lab pengujian penetrasi, eskalasi hak akses (privilege escalation), kerentanan aplikasi web, dan perutean jaringan.",
      url: "https://app.hackthebox.com/users/3743544",
      action: "Profil HTB ↗",
    },
    {
      name: "LeetCode",
      handle: "leetcode.com/u/Nyanns",
      title: "Penyelesaian Masalah Algoritmik",
      detail: "Struktur data, pemrograman dinamis, penelusuran graf, serta optimisasi kompleksitas waktu dan memori.",
      url: "https://leetcode.com/u/Nyanns/",
      action: "Profil ↗",
    },
    {
      name: "Google Cybersecurity",
      handle: "Sertifikasi Profesional",
      title: "Praktisi Keamanan Defensif",
      detail: "Baris perintah Linux, forensik query SQL, keamanan jaringan, otomasi Python, dan mitigasi insiden.",
      url: "https://www.linkedin.com/in/satrianindhita/",
      action: "Kredensial ↗",
    },
    {
      name: "Stanford / DeepLearning.AI",
      handle: "Advanced Learning Algorithms",
      title: "Jaringan Saraf Tiruan & Decision Tree",
      detail: "Arsitektur pembelajaran terawasi dan tak terawasi, optimisasi model, serta evaluasi algoritmik.",
      url: "https://www.linkedin.com/in/satrianindhita/",
      action: "Kredensial ↗",
    },
  ],

  experience: [
    {
      role: "IT Support & Fullstack Dev (Magang)",
      company: "Badan Kepegawaian Negara RI (BKN)",
      period: "Nov 2025 – Mei 2026",
      description:
        "Mendorong transformasi digital internal dengan merancang dan mendeploy aplikasi Logbook Presensi Pegawai berbasis React, Go (Golang), dan PostgreSQL. Mengelola siaran teknis resmi via OBS Studio serta menyusun media edukasi keamanan siber bagi staf.",
    },
    {
      role: "Machine Learning Engineer (Cohort)",
      company: "Bangkit Academy (Google, Tokopedia, GoTo, Traveloka)",
      period: "2024",
      description:
        "Menyelesaikan kurikulum intensif 6 bulan yang mencakup pipeline data Python, arsitektur deep learning TensorFlow, serta deployment model kolaboratif proyek capstone.",
    },
  ],
};

export const getPortfolioData = (lang = 'en') => {
  return lang === 'id' ? portfolioDataID : portfolioDataEN;
};

// Default export for backward compatibility
export const portfolioData = portfolioDataEN;
