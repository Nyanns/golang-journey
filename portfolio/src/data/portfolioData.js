export const portfolioData = {
  personal: {
    name: "Satria Nindhita",
    brand: "nindhita.xyz",
    title: "Backend Engineer & Cybersecurity Practitioner",
    intro:
      "I engineer high-concurrency backend services, defensive API security architectures, and automated QA systems. Focused on Go, Clean Architecture, relational data modeling, and zero-leakage security engineering.",
    email: "satrianindhita6@gmail.com",
    links: {
      github: "https://github.com/Nyanns",
      linkedin: "https://www.linkedin.com/in/satrianindhita/",
      medium: "https://level13.medium.com/",
      leetcode: "https://leetcode.com/u/Nyanns/",
      hackthebox: "https://app.hackthebox.com/users/3743544",
      resume: "/Satria_Nindhita_Resume.pdf",
    },
  },

  focusAreas: [
    {
      title: "Backend Systems",
      desc: "Go 1.24+, Clean Layered Architecture, high-concurrency goroutines, and low-latency API design.",
    },
    {
      title: "Cybersecurity & Hardening",
      desc: "Timing-attack resilient authentication, OWASP API Top 10 mitigation, and HTB Level 10 mindset.",
    },
    {
      title: "QA Automation (SDET)",
      desc: "IEEE 829 test matrices, Newman CLI regression pipelines, Chai assertions, and defect tracking.",
    },
  ],

  projects: [
    {
      title: "Lumiina",
      category: "Flagship Production Platform",
      liveUrl: "https://www.lumiina.art",
      githubUrl: "https://github.com/Nyanns/lumiina",
      summary:
        "An authentic creator and anime illustration platform engineered from scratch with a high-performance Go backend and a responsive React 19 frontend.",
      points: [
        "Architected with Go Clean Layered Architecture (Handler-Service-Repository) and PostgreSQL trigram GIN indexes for sub-millisecond substring queries.",
        "Implemented timing-attack resistant authentication via constant-time bcrypt canary hashes to defeat username enumeration.",
        "Engineered zero-lag Wave-1 bot pre-rendering middleware injecting dynamic OpenGraph and JSON-LD for social and search crawlers.",
        "Reduced initial bundle entry by 93% (640kB to 22kB) and decreased raw image upload payloads by 85%–95% via client-side WebP downsampling.",
      ],
      tech: ["Go 1.24+", "Gin", "PostgreSQL 16", "Redis 7", "React 19", "TailwindCSS v4", "Docker", "Vercel Edge"],
    },
    {
      title: "Lumiina QA & SDET Automation Suite",
      category: "Test Engineering & CI/CD",
      githubUrl: "https://github.com/Nyanns/lumiina-qa-automation",
      summary:
        "Formal test automation suite designed according to IEEE 829 standards with automated Newman regression pipelines and dual-system defect management.",
      points: [
        "Authored 13-case test matrix (EP, BVA, Decision Tables) achieving a 92.3% execution pass rate.",
        "Automated end-to-end API regression runs with Postman token chaining and Chai assertions.",
        "Documented and triaged production defects via Jira Software (LUM-5, LUM-6) and GitHub Issues (#26, #27).",
      ],
      tech: ["Postman", "Newman CLI", "Chai JS", "IEEE 829", "Jira Software", "GitHub Actions"],
    },
    {
      title: "Go Systems & Concurrency Lab",
      category: "Systems & Security Patterns",
      githubUrl: "https://github.com/Nyanns/golang-journey",
      summary:
        "A 17-sprint engineering reference covering production Go patterns: Redis atomic sliding-window rate limiters, session revocation epochs, singleflight caching, and database connection pooling.",
      points: [
        "Single round-trip Redis Lua rate limiter with standard RFC 7807 error envelopes and rate headers.",
        "Session revocation epoch verification ensuring immediate token invalidation on password updates.",
      ],
      tech: ["Go", "Clean Architecture", "PostgreSQL", "Redis", "Security Hardening", "Docker"],
    },
  ],

  stack: [
    {
      name: "Backend & Systems",
      items: ["Go (Golang 1.24+)", "Gin Gonic", "Clean Architecture", "GORM & database/sql", "Goroutines / Concurrency", "Sqids", "golang-migrate"],
    },
    {
      name: "Security & Defensive Design",
      items: ["Constant-Time Canary Hashes", "Session Revocation Epochs", "Redis Lua Sliding-Window", "Decompression Bomb Defense", "OWASP API Top 10", "Metrics 404 Lockdown", "Strict CSP"],
    },
    {
      name: "Data & Storage",
      items: ["PostgreSQL 16 (pg_trgm GIN, B-Tree)", "Redis 7 (Tokens, Rate Limiting, Singleflight)", "EXPLAIN ANALYZE Optimization", "Cloudinary SDK"],
    },
    {
      name: "QA, Automation & Infra",
      items: ["IEEE 829 Test Matrices", "Postman & Newman CLI", "Chai Assertions", "Testify Mocks", "Docker Multi-Stage (~19MB)", "Vercel Edge Anycast"],
    },
  ],

  signals: [
    {
      platform: "LeetCode",
      metric: "31 Problems Solved",
      detail: "30 Easy • 1 Medium — Focus: Arrays, Hash Tables, Strings, Bit Manipulation",
      url: "https://leetcode.com/u/Nyanns/",
    },
    {
      platform: "Hack The Box",
      metric: "User @nyanns",
      detail: "Level 10 Security Mindset — Network security, Linux privilege escalation, penetration testing",
      url: "https://app.hackthebox.com/users/3743544",
    },
  ],

  writing: [
    {
      title: "Why I Chose Go (Golang) as My Main Programming Language",
      url: "https://level13.medium.com/why-i-chose-go-golang-as-my-main-programming-language-493b83631199",
      date: "Aug 2026",
      source: "Medium",
    },
    {
      title: "What I Learned After Completing OverTheWire Bandit Level 1–25",
      url: "https://level13.medium.com/what-i-learned-after-completing-overthewire-bandit-level-1-25-046e1f360e7d",
      date: "Jul 2026",
      source: "Medium",
    },
  ],

  experience: [
    {
      role: "IT Technical Support (Internship)",
      organization: "Badan Kepegawaian Negara - Republik Indonesia (BKN RI)",
      period: "Nov 2025 – May 2026",
      summary:
        "Managed real-time technical broadcasting for official state events via OBS Studio, designed cybersecurity educational resources for staff threat mitigation, and rapidly prototyped and deployed an internal logbook web application streamlining daily reporting.",
    },
    {
      role: "Machine Learning Engineer (Cohort)",
      organization: "Bangkit Academy (Google, Tokopedia, GoTo, Traveloka)",
      period: "2023",
      summary:
        "Completed a 6-month intensive machine learning curriculum focused on practical Python, TensorFlow, and collaborative capstone model deployment.",
    },
  ],
};
