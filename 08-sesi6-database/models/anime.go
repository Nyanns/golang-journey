package models

import "time"

type Anime struct {
	ID           uint      `json:"id" gorm:"primaryKey"`
	Title        string    `json:"title" binding:"required" gorm:"not null"`
	Genre        string    `json:"genre" binding:"required"`
	TotalEp      int       `json:"total_ep" binding:"required"`
	EpisodeWatch int       `json:"episode_watch"` // Progres nonton (misal: eps 12 dari 24)
	Rating       float64   `json:"rating"`        // Skor penilaian (1.0 - 10.0)
	Status       string    `json:"status"`        // "watching", "completed", "plan_to_watch", "dropped"
	Synopsis     string    `json:"synopsis"`
	ImageURL     string    `json:"image_url"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
