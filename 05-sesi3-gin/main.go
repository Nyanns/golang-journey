package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type anime struct {
	ID       int    `json:"id"`
	Title    string `json:"title" binding:"required"`
	Genre    string `json:"genre" binding:"required"`
	Episodes int    `json:"episodes" binding:"required"`
}

var animes = []anime{
	{ID: 1, Title: "One Piece", Genre: "Shonen", Episodes: 1100},
	{ID: 2, Title: "Naruto", Genre: "Shonen", Episodes: 220},
	{ID: 3, Title: "Bleach", Genre: "Shonen", Episodes: 366},
	{ID: 4, Title: "Jujutsu Kaisen", Genre: "Shonen", Episodes: 24},
}

func satpamLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("\n================================================")
		fmt.Println("SATPAM: Ada pengunjung masuk menuju", c.Request.URL.Path, "dengan method ", c.Request.Method)
		c.Next()
		fmt.Println("SATPAM: Pengunjung selesai beraktivitas dan akan keluar dari ", c.Request.URL.Path)
		fmt.Println("================================================")
	}
}

func main() {
	// 1. Siapkan router (wadah endpoint)
	r := gin.Default()

	r.Use(satpamLogger())

	// Buat grup utama untuk API versi 1
	v1 := r.Group("/api/v1")

	// Buat sub-grup khusus untuk animes di dalam v1
	animeRoutes := v1.Group("/animes")

	// 2. Definisikan endpoint
	animeRoutes.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, animes)
	})
	animeRoutes.GET("/:id", func(c *gin.Context) {
		idStr := c.Param("id")

		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ID tidak valid"})
			return
		}
		for _, anime := range animes {
			if anime.ID == id {
				c.JSON(http.StatusOK, anime)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "Anime tidak ditemukan"})
	})
	animeRoutes.POST("/", func(c *gin.Context) {
		var newAnime anime
		err := c.ShouldBindJSON(&newAnime)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "JSON tidak valid"})
			return
		}
		newAnime.ID = len(animes)
		newAnime.ID++

		animes = append(animes, newAnime)
		c.JSON(http.StatusCreated, newAnime)
	})
	animeRoutes.PUT("/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		var updateAnimes anime

		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ID tidak valid"})
			return
		}

		err = c.ShouldBindJSON(&updateAnimes)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "JSON tidak valid"})
			return
		}

		for i, anime := range animes {
			if anime.ID == id {
				updateAnimes.ID = anime.ID
				animes[i] = updateAnimes
				c.JSON(http.StatusOK, updateAnimes)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "Anime tidak ditemukan"})
	})

	animeRoutes.DELETE("/:id", func(c *gin.Context) {
		idStr := c.Param("id")

		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ID tidak valid"})
			return
		}

		for i, anime := range animes {
			if anime.ID == id {
				animes = append(animes[:i], animes[i+1:]...)
				c.JSON(http.StatusOK, gin.H{"message": "Anime dihapus"})
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "Anime tidak ditemukan"})
	})

	// 3. Jalankan server
	r.Run(":8080") // Port default Gin
}
