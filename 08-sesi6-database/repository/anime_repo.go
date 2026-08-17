package repository

import (
	"sesi6/models"

	"gorm.io/gorm"
)

type AnimeRepository struct {
	db *gorm.DB
}

func NewAnimeRepository(db *gorm.DB) *AnimeRepository {
	return &AnimeRepository{db: db}
}

func (r *AnimeRepository) GetAllAnime() []models.Anime {
	var animes []models.Anime
	r.db.Find(&animes)
	return animes
}

func (r *AnimeRepository) GetAnimeByID(id int) (models.Anime, error) {
	var anime models.Anime
	err := r.db.First(&anime, id).Error
	return anime, err
}

func (r *AnimeRepository) CreateAnime(anime models.Anime) (models.Anime, error) {
	err := r.db.Create(&anime).Error
	return anime, err
}

func (r *AnimeRepository) UpdateAnime(anime models.Anime) error {
	err := r.db.Save(&anime).Error
	return err
}

func (r *AnimeRepository) DeleteAnime(id int) error {
	err := r.db.Delete(&models.Anime{}, id).Error
	return err
}
