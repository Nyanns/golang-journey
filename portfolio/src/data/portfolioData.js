export const portfolioData = {
  personal: {
    name: "Satria Nindhita",
    brand: "nindhita.xyz",
    tagline: "Backend Systems Engineer • Cybersecurity Practitioner • QA Automation Engineer",
    summary:
      "Specializing in high-concurrency Go microservices, defense-in-depth API security architectures, and automated QA systems. Builder of production-grade distributed services with strict clean architecture and zero-fluff engineering standards.",
    availability: "Available for Backend, Security & SDET Engineering Roles",
    statusBadge: "Open to Work",
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

  roles: [
    {
      title: "Backend Systems Engineer",
      badge: "Go • Postgres • Redis",
      description: "Clean architecture, high-concurrency goroutines, zero-alloc patterns, and scalable microservices.",
    },
    {
      title: "Cybersecurity Practitioner",
      badge: "Google Certified • HTB",
      description: "Timing-attack resilient auth, OWASP API Top 10 hardening, session revocation epochs, and penetration testing.",
    },
    {
      title: "QA Automation Engineer",
      badge: "IEEE 829 • SDET",
      description: "Automated API regression with Newman CLI, Postman token chaining, Chai assertions, and defect tracking.",
    },
  ],

  techStack: [
    {
      category: "Go Backend & Concurrency",
      icon: "Server",
      skills: [
        "Go (Golang 1.24+)",
        "Clean Layered Architecture (H-S-R)",
        "Gin Gonic",
        "GORM & database/sql",
        "Goroutines & Concurrency Safety",
        "Zero-Alloc Sync.Pool Patterns",
        "golang-migrate (Versioned SQL)",
        "Sqids (ID Obfuscation)",
      ],
    },
    {
      category: "API Security & Defense-in-Depth",
      icon: "ShieldCheck",
      skills: [
        "Timing-Attack Canary Hashes",
        "Session Revocation Epochs (iat < epoch)",
        "Redis Lua Sliding-Window Limiter",
        "Pixel Flood Decompression Defense",
        "OWASP API Top 10 Mitigation",
        "Prometheus Metrics Lockdown (404/Loopback)",
        "Strict CSP & Header Hardening",
        "BOLA Authorization Remediation",
      ],
    },
    {
      category: "Databases & In-Memory Systems",
      icon: "Database",
      skills: [
        "PostgreSQL 16",
        "GIN Trigram (pg_trgm) Substring Indexing",
        "Composite B-Tree Optimization",
        "EXPLAIN ANALYZE Query Profiling",
        "Redis 7 Ephemeral Tokens & Blacklisting",
        "Singleflight Query Deduplication",
        "Redis-backed Account Lockout",
        "Supabase & Upstash Cloud",
      ],
    },
    {
      category: "Search Engine & Bot Infrastructure",
      icon: "Globe",
      skills: [
        "Dynamic XML Sitemap Engine",
        "Google Image Sitemap Extensions",
        "Wave-1 Bot Pre-rendering Middleware",
        "Google Search Console Verification",
        "IndexNow Real-Time Crawler Dispatch",
        "llms.txt GEO Standards",
        "Social Previews (OG/Twitter/WhatsApp)",
        "Robots.txt Crawl Control",
      ],
    },
    {
      category: "QA Automation & Testing (SDET)",
      icon: "CheckCircle2",
      skills: [
        "IEEE 829 Test Matrix Design",
        "Postman & Newman CLI Automation",
        "Chai Assertion Library",
        "Testify Unit & Mock Testing",
        "Table-Driven Test Suites",
        "Jira Software Defect Lifecycle",
        "GitHub Issues Triage & Bug Reporting",
        "Automated CI Test Runners",
      ],
    },
    {
      category: "Cloud, Media & Frontend",
      icon: "Cpu",
      skills: [
        "Docker Multi-Stage (~19MB Alpine)",
        "Vercel Edge Anycast CDN",
        "Cloudinary SDK with MIME Sniffing",
        "React 19 & Vite 8",
        "TailwindCSS v4",
        "Framer Motion v13",
        "PWA Workbox Service Workers",
        "Client-Side WebP Downsampling",
      ],
    },
  ],

  flagshipProjects: [
    {
      title: "Lumiina",
      subtitle: "Production Full-Stack Creator & Anime Art Platform",
      status: "Live in Production",
      liveUrl: "https://www.lumiina.art",
      githubUrl: "https://github.com/Nyanns/lumiina",
      featured: true,
      description:
        "Full-stack digital fan art community platform engineered with a high-performance Go backend and a responsive React 19 frontend. Designed with Clean Architecture, defense-in-depth API security, dynamic Google Image sitemaps, and wave-1 bot pre-rendering.",
      metrics: [
        { label: "Bundle Size", value: "22.07 kB", note: "-93% reduction via code-splitting" },
        { label: "Image Downsampling", value: "85%–95%", note: "Client-side GPU/Canvas WebP pipeline" },
        { label: "Color Extraction", value: "<5ms", note: "Sub-5ms offscreen Euclidean clustering" },
        { label: "Bot Pre-rendering", value: "Zero-Lag", note: "Dynamic OG/JSON-LD for chat crawlers" },
      ],
      tags: ["Go 1.24+", "Gin", "PostgreSQL 16", "Redis 7", "React 19", "TailwindCSS v4", "Docker", "Vercel Edge"],
    },
    {
      title: "Lumiina QA & SDET Automation Suite",
      subtitle: "Formal Test Matrix & CI/CD Regression Pipeline",
      status: "Active Suite",
      githubUrl: "https://github.com/Nyanns/lumiina-qa-automation",
      featured: false,
      description:
        "Comprehensive automated API testing suite built according to IEEE 829 standards. Features token-chaining regression tests, Postman/Newman runners, HTML Extra reporting, and dual-system defect tracking across Jira (LUM-5, LUM-6) and GitHub Issues.",
      metrics: [
        { label: "Test Pass Rate", value: "92.3%", note: "12 Passed / 1 Defect Reported" },
        { label: "Test Cases", value: "13 Formal Cases", note: "EP, BVA & Decision Table mapped" },
        { label: "Execution", value: "Automated", note: "Newman CLI regression runners" },
      ],
      tags: ["Postman", "Newman CLI", "Chai JS", "IEEE 829", "Jira Software", "GitHub Issues", "CI/CD"],
    },
    {
      title: "Go Backend Systems Lab",
      subtitle: "Production-Grade Distributed Microservice Patterns",
      status: "Open Source",
      githubUrl: "https://github.com/Nyanns/golang-journey",
      featured: false,
      description:
        "Reference implementation of Clean Architecture, concurrency patterns, GORM relational migrations, timing-attack resilience, and Redis singleflight caching documented across 17 structured sprints.",
      metrics: [
        { label: "Architecture", value: "H-S-R", note: "Handler-Service-Repository" },
        { label: "Security", value: "Vectors 1–7", note: "Constant-time canary, metrics 404" },
        { label: "Rate Limiting", value: "Atomic Lua", note: "Sliding-window Redis tokens" },
      ],
      tags: ["Go", "Clean Architecture", "PostgreSQL", "Redis", "Security Hardening", "Docker Compose"],
    },
  ],

  signals: {
    leetcode: {
      username: "Nyanns",
      profileUrl: "https://leetcode.com/u/Nyanns/",
      totalSolved: 31,
      breakdown: { easy: 30, medium: 1, hard: 0 },
      languages: ["Go", "Python", "JavaScript"],
      topTopics: ["Array", "Hash Table", "String", "Bit Manipulation", "Sorting", "Math", "Trie"],
    },
    hackthebox: {
      username: "nyanns",
      profileUrl: "https://app.hackthebox.com/users/3743544",
      highlight: "Cybersecurity Practitioner with HTB Level 10 Mindset",
      skills: ["Network Security", "Linux Privilege Escalation", "Threat Detection", "Vulnerability Assessment", "Web Exploitation"],
    },
    certifications: [
      {
        title: "Google Cybersecurity Professional Certificate",
        issuer: "Google",
        score: "Score: 95%",
        date: "May 2026",
        description: "Hands-on training covering network security, Linux, SQL, Python for threat detection, and incident response.",
        url: "https://www.linkedin.com/in/satrianindhita/",
      },
      {
        title: "Advanced Learning Algorithms",
        issuer: "Stanford Online / DeepLearning.AI",
        score: "Score: 91%",
        date: "Apr 2023",
        description: "Neural networks, decision tree architectures, and real-world ML model optimization.",
        url: "https://www.linkedin.com/in/satrianindhita/",
      },
      {
        title: "Machine Learning Cohort Graduate",
        issuer: "Bangkit Academy (Google, GoTo, Traveloka)",
        score: "Graduated",
        date: "2023",
        description: "6-month intensive engineering program focused on practical machine learning and production deployment.",
        url: "https://www.linkedin.com/in/satrianindhita/",
      },
    ],
  },

  articles: [
    {
      title: "Why I Chose Go (Golang) as My Main Programming Language",
      description: "A deep dive into Go's concurrency model, clean orthogonal design, lightning-fast compilation, and why it's the gold standard for modern backend infrastructure.",
      url: "https://level13.medium.com/why-i-chose-go-golang-as-my-main-programming-language-493b83631199",
      date: "Aug 8",
      platform: "Medium",
      tags: ["Go", "Backend", "Concurrency", "Software Engineering"],
    },
    {
      title: "What I Learned After Completing OverTheWire Bandit Level 1–25",
      description: "Practical insights and command-line forensics lessons from completing 25 levels of the classic Linux privilege escalation and cybersecurity wargame.",
      url: "https://level13.medium.com/what-i-learned-after-completing-overthewire-bandit-level-1-25-046e1f360e7d",
      date: "Jul 17",
      platform: "Medium",
      tags: ["Cybersecurity", "Linux", "OverTheWire", "CTF"],
    },
    {
      title: "Architecting Timing-Attack Resilient Authentication in Go",
      description: "Implementing constant-time canary hash evaluations to eliminate username enumeration vulnerabilities in modern REST APIs.",
      url: "https://level13.medium.com/",
      date: "Upcoming",
      platform: "Medium",
      tags: ["Security", "Go", "Cryptography", "Bcrypt"],
      isUpcoming: true,
    },
    {
      title: "High-Throughput Redis Sliding-Window Rate Limiting with Lua",
      description: "Executing atomic sliding-window rate limiters with single round-trip Redis Lua scripts and strict RFC headers.",
      url: "https://level13.medium.com/",
      date: "Upcoming",
      platform: "Medium",
      tags: ["Redis", "Distributed Systems", "Lua", "Performance"],
      isUpcoming: true,
    },
  ],

  experience: [
    {
      role: "Information Technology Technical Support (Internship)",
      company: "Badan Kepegawaian Negara - Republik Indonesia (BKN RI)",
      period: "Nov 2025 – May 2026",
      highlights: [
        "Managed diverse IT initiatives ranging from coordinating real-time technical broadcasting for official state events using OBS Studio to designing cyber threat mitigation educational assets for staff.",
        "Drove internal digital transformation by utilizing rapid prototyping to develop and deploy an internal logbook web application, successfully streamlining daily employee reporting workflows.",
      ],
      skills: ["Technical Support", "OBS Studio", "Cyber Threat Mitigation", "Web Application Development", "Workflow Optimization"],
    },
    {
      role: "Machine Learning Engineer (Cohort)",
      company: "Bangkit Academy led by Google, Tokopedia, GoTo, & Traveloka",
      period: "2023",
      highlights: [
        "Completed a 6-month intensive program on the machine learning path, focusing on the practical application of Python and TensorFlow.",
        "Collaborated within a cross-functional engineering team to develop a capstone project, managing the end-to-end process from problem formulation, data collection, and preprocessing to building and deploying a prototype machine learning solution.",
      ],
      skills: ["Python", "TensorFlow", "Deep Learning", "Data Preprocessing", "Model Deployment"],
    },
  ],
};
