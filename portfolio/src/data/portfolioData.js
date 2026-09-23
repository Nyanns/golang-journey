export const portfolioData = {
  personal: {
    name: "Satria Nindhita",
    brand: "nindhita.xyz",
    role: "Backend Engineer · QA Automation (SDET) · Cybersecurity",
    intro:
      "Backend Engineer & QA Automation Engineer (SDET) with a solid Cybersecurity foundation. I specialize in architecting high-concurrency Go microservices, engineering rigorous automated testing pipelines (IEEE 829, Newman, Playwright), and integrating defense-in-depth security at every architectural layer.",
    status:
      "Currently shipping Lumiina (anime illustration platform) live in production at lumiina.art, and continuously deepening Go concurrency & distributed systems patterns.",
    email: "sandi.nindhita@gmail.com",
    links: {
      github: "https://github.com/Nyanns",
      linkedin: "https://www.linkedin.com/in/satrianindhita/",
      medium: "https://level13.medium.com/",
      leetcode: "https://leetcode.com/u/Nyanns/",
      hackthebox: "https://app.hackthebox.com/users/3743544",
      resume: "/Satria_Nindhita_Resume.pdf",
      email: "mailto:sandi.nindhita@gmail.com",
    },
  },

  location: {
    city: "Yogyakarta",
    country: "Indonesia",
    label: "Yogyakarta, ID",
    timeZone: "Asia/Jakarta",
  },

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
      title: "What I Learned After Completing OverTheWire Bandit Level 1–25",
      url: "https://level13.medium.com/what-i-learned-after-completing-overthewire-bandit-level-1-25-046e1f360e7d",
      date: "Jul 2026",
      publication: "Medium",
    },
  ],

  recentCommits: [
    {
      repo: "golang-journey",
      message: "refactor(portfolio): redesign to minimalist human-crafted editorial layout",
      additions: 342,
      deletions: 185,
      sha: "70dfc8c",
      url: "https://github.com/Nyanns/golang-journey/commit/70dfc8c",
      date: "Sep 23, 2026",
    },
    {
      repo: "lumiina",
      message: "docs: update comprehensive project documentation and web frontend guide",
      additions: 128,
      deletions: 14,
      sha: "850cf08",
      url: "https://github.com/Nyanns/lumiina/commit/850cf08",
      date: "Sep 23, 2026",
    },
    {
      repo: "golang-journey",
      message: "feat(portfolio): launch personal tech portfolio for nindhita.xyz",
      additions: 512,
      deletions: 40,
      sha: "f2d819f",
      url: "https://github.com/Nyanns/golang-journey/commit/f2d819f",
      date: "Sep 23, 2026",
    },
    {
      repo: "golang-journey",
      message: "docs(memory): update agents config and learning progress log",
      additions: 95,
      deletions: 8,
      sha: "1e54b8d",
      url: "https://github.com/Nyanns/golang-journey/commit/1e54b8d",
      date: "Sep 23, 2026",
    },
  ],

  languages: [
    { name: "Go", percentage: 56, color: "#00ADD8" },
    { name: "JavaScript", percentage: 20, color: "#f1e05a" },
    { name: "Python", percentage: 12, color: "#3572A5" },
    { name: "HTML", percentage: 6, color: "#e34c26" },
    { name: "CSS", percentage: 4, color: "#563d7c" },
    { name: "Shell", percentage: 2, color: "#89e051" },
  ],

  signals: [
    {
      name: "HackTheBox",
      handle: "@nyanns",
      title: "Level 10 Security Mindset",
      detail: "Hands-on Linux privilege escalation, network penetration testing, and defensive threat modeling.",
      url: "https://app.hackthebox.com/users/3743544",
      action: "Profile ↗",
    },
    {
      name: "LeetCode",
      handle: "@Nyanns",
      title: "31 Solved (30 Easy · 1 Medium)",
      detail: "Core algorithms and data structures: Arrays, Hash Tables, Strings, Bit Manipulation.",
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
      role: "IT Staff (Internship)",
      company: "Badan Kepegawaian Negara RI (BKN)",
      period: "Nov 2025 – May 2026",
      description:
        "Managed real-time technical broadcasting for official state events via OBS Studio, designed cybersecurity educational resources for staff threat mitigation, and rapidly prototyped and deployed an internal logbook web application streamlining daily reporting.",
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
