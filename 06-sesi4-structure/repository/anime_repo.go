package repository

import (
	"sesi4/models"
)

type AnimeRepository struct {
	animes []models.Anime
}

func NewAnimeRepository() *AnimeRepository {
	return &AnimeRepository{
		animes: []models.Anime{
			{ID: 1, Title: "One Piece", Genre: "Shonen", Episodes: 1100},
			{ID: 2, Title: "Naruto", Genre: "Shonen", Episodes: 220},
		},
	}
}

func (r *AnimeRepository) GetAll() []models.Anime {
	return r.animes
}

func (r *AnimeRepository) CreateAnime(anime models.Anime) {
	anime.ID = len(r.animes) + 1
	r.animes = append(r.animes, anime)
}

func (r *AnimeRepository) DeleteAnime(id int) {
	for i, anime := range r.animes {
		if anime.ID == id {
			r.animes = append(r.animes[:i], r.animes[i+1:]...)
			break
		}
	}
}

func (r *AnimeRepository) UpdateAnime(id int, updatedAnime models.Anime) bool {
	for i, a := range r.animes {
		if a.ID == id {
			r.animes[i].Title = updatedAnime.Title
			r.animes[i].Genre = updatedAnime.Genre
			r.animes[i].Episodes = updatedAnime.Episodes
			return true
		}
	}
	return false
}
