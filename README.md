<div align="center">

# 🚀 Go Backend Engineering Journey
### *From Fundamentals to Production-Grade Distributed Systems*

[![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org)
[![Gin Framework](https://img.shields.io/badge/Gin-v1.12-008ECF?style=for-the-badge&logo=gin&logoColor=white)](https://gin-gonic.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![GORM](https://img.shields.io/badge/GORM-v1.31-7952B3?style=for-the-badge&logo=go&logoColor=white)](https://gorm.io)
[![Docker](https://img.shields.io/badge/Docker-Engine-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![Conventional Commits](https://img.shields.io/badge/Commits-Conventional-FE5196?style=for-the-badge&logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

<p align="center">
  <b>Repository perjalanan belajar intensif menuju Senior Go Backend Engineer.</b><br>
  Fokus pada <i>Clean Architecture</i>, <i>Database Design</i>, <i>Security Mindset</i>, dan <i>Production-Ready APIs</i>.
</p>

</div>

---

## 🗺️ Roadmap & Modul Pembelajaran

```mermaid
flowchart LR
    S1["🌸 Sesi 1\nWaifu API\n(net/http Dasar)"] --> S2["📖 Sesi 2\nManga API\n(Routing & Method)"]
    S2 --> S3["⚡ Sesi 3\nAnime API\n(Gin Framework)"]
    S3 --> S4["🏛️ Sesi 4\nClean Architecture\n(Handler-Service-Repo)"]
    S4 --> S5["🔐 Sesi 5\nConfig Management\n(.env & 12-Factor)"]
    S5 --> S6["🐘 Sesi 6\nMyAnimeTracker\n(PostgreSQL + GORM)"]
    S6 --> Final["🔥 FINAL PROJECT\nGoAntri\n(Smart Queue System)"]
```

| Modul | Project | Fokus & Konsep Utama | Status |
| :--- | :--- | :--- | :---: |
| **01** | `03-sesi1-waifu` | `net/http` standard library, handler signature, JSON serialization | ✅ Selesai |
| **02** | `04-sesi2-manga` | RESTful routing, URL prefix parsing, in-memory slice manipulation | ✅ Selesai |
| **03** | `05-sesi3-gin` | Gin Engine, route grouping, `c.ShouldBindJSON`, middleware | ✅ Selesai |
| **04** | `06-sesi4-structure` | Clean Architecture (Handler-Service-Repository), Dependency Injection | ✅ Selesai |
| **05** | `07-sesi5-config` | 12-Factor App, `.env`, fallback defaults, `joho/godotenv` | ✅ Selesai |
| **06** | `08-sesi6-database` | **MyAnimeTracker**: PostgreSQL, GORM, AutoMigrate, Relational CRUD | ⏳ In Progress |
| **07** | *Coming Soon* | JWT Authentication, Bcrypt Password Hashing, Auth Middleware | ⬜ Planned |
| **08** | *Coming Soon* | Redis Caching, WebSocket Real-time notifications | ⬜ Planned |
| **09** | *Coming Soon* | Swagger/OpenAPI Documentation (`swaggo/swag`) | ⬜ Planned |
| **10** | **GoAntri** | **Final Capstone Project**: Smart Queue Management System | 🚀 Planned |

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

* **Language**: [Go (Golang) v1.21+](https://go.dev/)
* **Web Framework**: [Gin-Gonic](https://github.com/gin-gonic/gin)
* **Database**: [PostgreSQL 16](https://www.postgresql.org/)
* **ORM**: [GORM](https://gorm.io/)
* **Environment**: [Godotenv](https://github.com/joho/godotenv)
* **Containerization**: [Docker & Docker Compose](https://www.docker.com/)
* **Frontend Companion**: [Vite + React + TailwindCSS](https://vitejs.dev/)

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
  <sub>Crafted with passion & senior engineering principles.</sub>
</div>
