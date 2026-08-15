package models

type Anime struct {
	ID       int    `json:"id"`
	Title    string `json:"title" binding:"required"`
	Genre    string `json:"genre" binding:"required"`
	Episodes int    `json:"episodes" binding:"required"`
}
