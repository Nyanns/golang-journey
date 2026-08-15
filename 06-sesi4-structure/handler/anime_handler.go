package handler

import (
	"net/http"
	"sesi4/models"
	"sesi4/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 1. Profil Pelayan
type AnimeHandler struct {
	service *service.AnimeService // Walkie-Talkie ke Koki
}

// 2. Merekrut Pelayan
// Syaratnya: HRD harus ngasih Walkie-Talkie Koki ke Pelayan ini
func NewAnimeHandler(service *service.AnimeService) *AnimeHandler {
	return &AnimeHandler{
		service: service,
	}
}

// 3. Tugas Pelayan: Melayani Client via HTTP
// Perhatikan: Cuma Pelayan yang tahu urusan *gin.Context!
func (h *AnimeHandler) GetAnimes(c *gin.Context) {
	// Pelayan (h) menyuruh Koki (service) untuk ambil semua data
	animes := h.service.GetAll()

	// Pelayan menyajikan data dalam bentuk nampan JSON ke Client
	c.JSON(http.StatusOK, gin.H{
		"message": "success fetch animes",
		"data":    animes,
	})
}

func (h *AnimeHandler) CreateAnime(c *gin.Context) {
	var newAnime models.Anime
	err := c.ShouldBindJSON(&newAnime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	h.service.CreateAnime(newAnime)
	c.JSON(http.StatusCreated, gin.H{"message": "Anime created successfully"})
}

func (h *AnimeHandler) DeleteAnime(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	h.service.DeleteAnime(id)
	c.JSON(http.StatusOK, gin.H{"message": "Anime deleted successfully"})
}

func (h *AnimeHandler) UpdateAnime(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var updatedAnime models.Anime
	if err := c.ShouldBindJSON(&updatedAnime); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	if h.service.UpdateAnime(id, updatedAnime) {
		c.JSON(http.StatusOK, gin.H{"message": "Anime updated successfully"})
	} else {
		c.JSON(http.StatusNotFound, gin.H{"error": "Anime not found"})
	}
}
