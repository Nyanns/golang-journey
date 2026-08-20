<div align="center">

# 🚀 Go Backend Engineering Journey
### *From Fundamentals to Production-Grade Distributed Systems*

[![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org)
[![Gin Framework](https://img.shields.io/badge/Gin-v1.12-008ECF?style=for-the-badge&logo=gin&logoColor=white)](https://gin-gonic.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![GORM](https://img.shields.io/badge/GORM-v1.31-7952B3?style=for-the-badge&logo=go&logoColor=white)](https://gorm.io)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-MQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com)
[![Docker](https://img.shields.io/badge/Docker-Engine-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![Conventional Commits](https://img.shields.io/badge/Commits-Conventional-FE5196?style=for-the-badge&logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

<p align="center">
  <b>Repository perjalanan belajar intensif menuju Mid-Level Go Backend Engineer.</b><br>
  Fokus pada <i>Clean Architecture</i>, <i>Database Design</i>, <i>Security Mindset</i>, dan <i>Production-Ready APIs</i>.
</p>

</div>

---

## 🗺️ Roadmap & Modul Pembelajaran

> **Prinsip: 1 Sesi = 1 Teknologi = 1 Mini Project Praktik**

```mermaid
flowchart LR
    S1["🌸 Sesi 1\nWaifu API\n(net/http)"] --> S2["📖 Sesi 2\nManga API\n(Routing)"]
    S2 --> S3["⚡ Sesi 3\nAnime API\n(Gin)"]
    S3 --> S4["🏛️ Sesi 4\nClean Arch\n(H-S-R)"]
    S4 --> S5["🔐 Sesi 5\nConfig\n(.env)"]
    S5 --> S6["🐘 Sesi 6\nMyAnimeTracker\n(PostgreSQL+GORM)"]
    S6 --> S7["🎨 Sesi 7-17\nLumina\n(Full Stack)"]
    S7 --> FP["🎯 GoAntri\n(Solo Challenge)"]
```

### Fase 1: Fondasi (MyAnimeTracker)

| Sesi | Folder | Fokus & Konsep Utama | Status |
| :---: | :--- | :--- | :---: |
| 1 | `03-sesi1-waifu` | `net/http` standard library, handler signature, JSON serialization | ✅ |
| 2 | `04-sesi2-manga` | RESTful routing, URL prefix parsing, in-memory slice manipulation | ✅ |
| 3 | `05-sesi3-gin` | Gin Engine, route grouping, `c.ShouldBindJSON`, middleware | ✅ |
| 4 | `06-sesi4-structure` | Clean Architecture (Handler-Service-Repository), Dependency Injection | ✅ |
| 5 | `07-sesi5-config` | 12-Factor App, `.env`, fallback defaults, `joho/godotenv` | ✅ |
| 6 | `08-sesi6-database` | **MyAnimeTracker**: PostgreSQL, GORM, AutoMigrate, Relational CRUD | ⏳ |

### Fase 2: Lumina 🎨 — Platform Sharing Fan Art Anime

> Terinspirasi Pixiv, tapi redesign yang lebih baik dan unik.
> Setiap sesi menambahkan 1 teknologi baru ke Lumina.

| Sesi | Folder | Teknologi | Fitur Lumina |
| :---: | :--- | :--- | :--- |
| 7 | `lumina/` | Git Flow, Makefile, Linter | Setup standar industri & relasi database |
| 8 | `lumina/` | JWT + Bcrypt | Register/Login artist |
| 9 | `lumina/` | Redis Caching | Cache popular artworks & trending tags |
| 10 | `lumina/` | Unit Test & Mocking | Test Service & Handler Layer |
| 11 | `lumina/` | WebSocket | Real-time notifications (like/follow) |
| 12 | `lumina/` | Goroutines & File Upload | Upload ke Cloudinary + background resize |
| 13 | `lumina/` | Docker & Compose | Containerize seluruh stack |
| 14 | `lumina/` | Swagger & CI/CD Pipeline | API docs & GitHub Actions (Auto test) |
| 15 | `lumina/` | RabbitMQ | Async notification processing |
| 16 | `lumina/` | gRPC | Internal recommendation service |
| 17 | — | Polish & Deploy | Frontend (React) + deploy production |

### 🎯 Tantangan Mandiri: GoAntri — Smart Queue Management

> Project solo untuk membuktikan kemampuan membangun aplikasi lengkap dari nol secara mandiri.
> Dikerjakan setelah semua sesi selesai — ujian sejati seorang Mid-Level Dev.

---

## 🏛️ Arsitektur Standar (Handler-Service-Repository)

Setiap modul di repository ini menerapkan pemisahan tanggung jawab (*Separation of Concerns*) berbasis **Clean Architecture**:

```mermaid
flowchart TD
    Client(["🌐 Client (Postman / React Frontend)"])
    
    subgraph AppServer ["Go Backend Server"]
        MW["🛡️ Middleware (CORS, Logger, Auth)"]
        Router["🚪 Gin Router"]
        
        subgraph HandlerLayer ["🎮 Handler Layer (Delivery/HTTP)"]
            H["HTTP Request Validation\nJSON Binding & Response Formatter"]
        end
        
        subgraph ServiceLayer ["⚙️ Service Layer (Use Case / Business Logic)"]
            S["Domain Logic, Rules & Calculation"]
        end
        
        subgraph RepoLayer ["📦 Repository Layer (Data Access)"]
            R["GORM Query & PostgreSQL Operations"]
        end
    end
    
    DB[("🐘 PostgreSQL Database")]

    Client -->|HTTP Request| MW
    MW --> Router
    Router --> H
    H --> S
    S --> R
    R <-->|SQL Queries| DB
```

---

## 📸 Showcase & Preview

*(Screenshot Postman tests & UI Dashboard akan ditampilkan di sini)*

<details>
<summary><b>Lihat Screenshot Dokumentasi Testing API</b></summary>

> *Akan diupdate dengan screenshot Postman & live frontend.*

</details>

---

## 🛠️ Tech Stack & Ekosistem

| Kategori | Teknologi |
| :--- | :--- |
| **Language** | [Go (Golang) v1.21+](https://go.dev/) |
| **Web Framework** | [Gin-Gonic](https://github.com/gin-gonic/gin) |
| **Database** | [PostgreSQL 16](https://www.postgresql.org/) |
| **ORM** | [GORM](https://gorm.io/) |
| **Cache** | [Redis](https://redis.io/) |
| **Message Queue** | [RabbitMQ](https://www.rabbitmq.com/) |
| **Real-time** | WebSocket ([gorilla/websocket](https://github.com/gorilla/websocket)) |
| **Inter-service** | [gRPC](https://grpc.io/) + Protocol Buffers |
| **Auth** | JWT ([golang-jwt](https://github.com/golang-jwt/jwt)) + Bcrypt |
| **Environment** | [Godotenv](https://github.com/joho/godotenv) |
| **Docs** | [Swagger/OpenAPI](https://github.com/swaggo/swag) |
| **Testing** | Go testing + [Testify](https://github.com/stretchr/testify) |
| **Containerization** | [Docker & Docker Compose](https://www.docker.com/) |
| **Frontend** | [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TailwindCSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) |

---

## 📜 Conventional Commits Standard

Repository ini menerapkan format commit profesional:

* `feat:` Menambahkan fitur atau endpoint baru
* `fix:` Memperbaiki bug atau kesalahan penanganan error
* `refactor:` Restrukturisasi kode tanpa mengubah fungsionalitas
* `docs:` Dokumentasi, roadmap update, atau README
* `chore:` Konfigurasi `.env`, dependency module, atau docker setup

---

<div align="center">
  <sub>Crafted with passion & mid-level engineering principles.</sub>
</div>
