package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Waifu struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Anime    string `json:"anime"`
	Level    int    `json:"level"`
	Favorite bool   `json:"favorite"`
}

var semuaWaifu = []Waifu{
	{ID: 1, Name: "Rem", Anime: "Re:Zero", Level: 10, Favorite: true},
	{ID: 2, Name: "Zero Two", Anime: "Darling in the FranXX", Level: 10, Favorite: true},
	{ID: 3, Name: "Asuna", Anime: "Sword Art Online", Level: 8, Favorite: false},
	{ID: 4, Name: "Miku", Anime: "Darling in the FranXX", Level: 7, Favorite: false},
	{ID: 5, Name: "Hinata", Anime: "Naruto", Level: 9, Favorite: true},
}

func main() {
	fmt.Println("Api ini bejalan di port 8080!")
	http.HandleFunc("/", handlerSambutan)
	http.HandleFunc("/waifu", handlerSemuaWaifu)
	http.HandleFunc("/waifu/favorit", handlerWaifuFavorit)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("ERROR:", err)
	}
}

func handlerSambutan(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Selamat datang di Waifu API!"))
}

func handlerSemuaWaifu(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(semuaWaifu)
}

func handlerWaifuFavorit(w http.ResponseWriter, r *http.Request) {
	var waifuFavorite []Waifu

	for _, waifu := range semuaWaifu {
		if waifu.Favorite == true {
			waifuFavorite = append(waifuFavorite, waifu)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(waifuFavorite)
}
