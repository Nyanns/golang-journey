package service

import (
	"sesi4/models"
	"sesi4/repository"
)

type AnimeService struct {
	repo *repository.AnimeRepository
}

// HRD memanggil Koki baru, dan HRD memberikan kunci gudang (kita beri nama "kunciDariHRD")
func NewAnimeService(kunciDariHRD *repository.AnimeRepository) *AnimeService {
	return &AnimeService{
		repo: kunciDariHRD, // Masukkan "kunciDariHRD" ke dalam kantong celemek bernama "repo"
	}
}

func (s *AnimeService) GetAll() []models.Anime {
	return s.repo.GetAll()
}

func (s *AnimeService) CreateAnime(anime models.Anime) {
	s.repo.CreateAnime(anime)
}

func (s *AnimeService) DeleteAnime(id int) {
	s.repo.DeleteAnime(id)
}

func (s *AnimeService) UpdateAnime(id int, anime models.Anime) bool {
	return s.repo.UpdateAnime(id, anime)
}
