package service

import (
	"sesi6/models"
	"sesi6/repository"
)

type AnimeService struct {
	repo *repository.AnimeRepository
}

func NewAnimeService(repo *repository.AnimeRepository) *AnimeService {
	return &AnimeService{repo: repo}
}

func (s *AnimeService) GetAllAnime() []models.Anime {
	return s.repo.GetAllAnime()
}

func (s *AnimeService) CreateAnime(anime models.Anime) (models.Anime, error) {
	return s.repo.CreateAnime(anime)
}

func (s *AnimeService) GetAnimeByID(id int) (models.Anime, error) {
	return s.repo.GetAnimeByID(id)
}

func (s *AnimeService) DeleteAnime(id int) error {
	_, err := s.repo.GetAnimeByID(id)
	if err != nil {
		return err
	}
	return s.repo.DeleteAnime(id)
}

func (s *AnimeService) UpdateAnime(id int, updateData models.Anime) (models.Anime, error) {
	_, err := s.repo.GetAnimeByID(id)
	if err != nil {
		return models.Anime{}, err
	}

	updateData.ID = uint(id)
	err = s.repo.UpdateAnime(updateData)
	return updateData, err
}
