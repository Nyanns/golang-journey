package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

type Manga struct {
	ID      int    `json:"id"`
	Judul   string `json:"judul"`
	Author  string `json:"author"`
	Chapter int    `json:"chapter"`
	Status  string `json:"status"` // "ongoing", "completed", "hiatus"
}

var semuaManga = []Manga{
	{ID: 1, Judul: "One Piece", Author: "Oda Eiichiro", Chapter: 1100, Status: "ongoing"},
	{ID: 2, Judul: "Vagabond", Author: "Inoue Takehiko", Chapter: 327, Status: "hiatus"},
	{ID: 3, Judul: "Berserk", Author: "Miura Kentaro", Chapter: 374, Status: "completed"},
	{ID: 4, Judul: "Chainsaw Man", Author: "Fujimoto Tatsuki", Chapter: 160, Status: "ongoing"},
}

var nextID = 5

func main() {
	fmt.Println("Manga API berjalan pada port :8081!")

	http.HandleFunc("/manga", handlerManga)
	http.HandleFunc("/manga/", handlerMangaByID)

	fmt.Println("  GET  http://localhost:8081/manga")
	fmt.Println("  POST http://localhost:8081/manga")
	fmt.Println("  GET  http://localhost:8081/manga/1")

	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		fmt.Println("ERROR", err)
	}
}

func handlerManga(w http.ResponseWriter, r *http.Request) {
	//method check
	if r.Method == "GET" {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(semuaManga)
		return
	}

	if r.Method == "POST" {
		var mangaBaru Manga

		err := json.NewDecoder(r.Body).Decode(&mangaBaru)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("JSON tidak valid!"))
			return
		}

		mangaBaru.ID = nextID
		nextID++

		semuaManga = append(semuaManga, mangaBaru)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(mangaBaru)
		return
	}

	w.WriteHeader(http.StatusMethodNotAllowed)
	w.Write([]byte("Method tidak diizinkan!"))
}

func handlerMangaByID(w http.ResponseWriter, r *http.Request) {
	idStr := strings.TrimPrefix(r.URL.Path, "/manga/")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("ID harus berupa angka!"))
		return
	}

	for _, manga := range semuaManga {
		if manga.ID == id {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(manga)
			return
		}
	}

	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte("Manga tidak ditemukan!"))
}
