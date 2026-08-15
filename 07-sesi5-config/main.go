package main

import (
	"fmt"
	"net/http"
	"sesi5/config"

	"github.com/gin-gonic/gin"
)

func main() {

	cfg := config.LoadConfig()

	fmt.Printf("Starting %s [%s mode] on port %s...\n", cfg.AppName, cfg.Env, cfg.Port)

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"app_name": cfg.AppName,
			"env":      cfg.Env,
			"status":   "running",
		})
	})

	r.Run(":" + cfg.Port)
}
