package handler

import (
	"net/http"
	"sesi6/models"
	"sesi6/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type AnimeHandler struct {
	service *service.AnimeService
}

func NewAnimehandler(service *service.AnimeService) *AnimeHandler {
	return &AnimeHandler{service: service}
}

func (h *AnimeHandler) GetAllAnime(c *gin.Context) {
	animes := h.service.GetAllAnime()

	c.JSON(http.StatusOK, gin.H{
		"message": "success fetch animes",
		"data":    animes,
	})
}

func (h *AnimeHandler) CreateAnime(c *gin.Context) {
	var newAnimes models.Anime
	err := c.ShouldBindJSON(&newAnimes)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid JSON"})
		return
	}

	newAnime, err := h.service.CreateAnime(newAnimes)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Anime created successfully",
		"data":    newAnime,
	})
}

func (h *AnimeHandler) DeleteAnime(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	err = h.service.DeleteAnime(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Anime deleted successfully",
	})
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

	updatedData, err := h.service.UpdateAnime(id, updatedAnime)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Anime updated successfully",
		"data":    updatedData,
	})
}

func (h *AnimeHandler) GetAnimeByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	anime, err := h.service.GetAnimeByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "succes",
		"data":    anime,
	})
}
