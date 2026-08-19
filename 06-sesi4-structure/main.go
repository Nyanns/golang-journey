package main

import (
	"fmt"
	"sesi4/handler"
	"sesi4/repository"
	"sesi4/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

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
	// 1. Inisialisasi dari Layer paling bawah ke atas (Bottom-up Wiring)
	repo := repository.NewAnimeRepository()
	svc := service.NewAnimeService(repo)
	hndlr := handler.NewAnimeHandler(svc)

	// 2. Setup Gin Engine
	r := gin.Default()

	// 3. Pasang Middleware (CORS & Logger kustom)
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))
	r.Use(satpamLogger())

	// 4. Routing Grouping
	v1 := r.Group("/api/v1")
	anime := v1.Group("/animes")

	{
		anime.GET("", hndlr.GetAnimes)
		anime.POST("", hndlr.CreateAnime)
		anime.PUT("/:id", hndlr.UpdateAnime)
		anime.DELETE("/:id", hndlr.DeleteAnime)
	}

	// 5. Start Server
	r.Run(":8080")
}
