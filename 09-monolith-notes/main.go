package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// 1. Model (Data Structure)
type Note struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title" gorm:"not null"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}

func main() {
	// 2. Koneksi Database (SQLite: File lokal, tidak perlu Docker/Postgres)
	db, err := gorm.Open(sqlite.Open("notes.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal konek ke database:", err)
	}

	// 3. AutoMigrate (Tukang Sulap, karena ini Monolith/Simple)
	db.AutoMigrate(&Note{})

	// 4. Setup Router Gin
	r := gin.Default()

	// 5. Handler & Service dicampur aduk di sini! (Spaghetti Code 🍝)
	
	// GET: Ambil semua catatan
	r.GET("/notes", func(c *gin.Context) {
		var notes []Note
		// Langsung manggil DB di dalam pintu masuk (Router)
		if err := db.Find(&notes).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal ambil data"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": notes})
	})

	// POST: Tambah catatan baru
	r.POST("/notes", func(c *gin.Context) {
		var input struct {
			Title   string `json:"title" binding:"required"`
			Content string `json:"content"`
		}

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak valid"})
			return
		}

		newNote := Note{
			Title:   input.Title,
			Content: input.Content,
		}

		if err := db.Create(&newNote).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"data": newNote})
	})

	// 6. Jalankan Server di port 8081 (Biar gak bentrok sama Lumiina)
	log.Println("Server Monolith Pencatat berjalan di Port 8081...")
	r.Run(":8081")
}
