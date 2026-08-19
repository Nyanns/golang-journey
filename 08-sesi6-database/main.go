package main

import (
	"fmt"
	"sesi6/config"
	"sesi6/handler"
	"sesi6/repository"
	"sesi6/service"

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
	cfg := config.LoadConfig()
	db := config.ConnectDb(cfg)
	repo := repository.NewAnimeRepository(db)
	svc := service.NewAnimeService(repo)
	hndlr := handler.NewAnimeHandler(svc)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))
	r.Use(satpamLogger())

	v1 := r.Group("/api/v1")
	anime := v1.Group("/animes")

	{
		anime.GET("", hndlr.GetAllAnime)
		anime.POST("", hndlr.CreateAnime)
		anime.GET("/:id", hndlr.GetAnimeByID)
		anime.PUT("/:id", hndlr.UpdateAnime)
		anime.DELETE("/:id", hndlr.DeleteAnime)
	}

	r.Run(":" + cfg.Port)
}
