package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

// User adalah struktur data kita (Model)
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Role string `json:"role"`
}

func main() {
	// 1. Mendaftarkan Route dan Handler
	// Ketika ada request ke path "/api/users", jalankan fungsi handleUsers
	http.HandleFunc("/api/users", handleUsers)

	// 2. Menjalankan Server
	port := ":8080"
	fmt.Printf("Server berjalan di http://localhost%s\n", port)
	
	// ListenAndServe akan memblokir (menahan) program agar terus berjalan
	// Jika ada error (misal port sudah terpakai), log.Fatal akan menghentikan program
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal("Gagal menjalankan server: ", err)
	}
}

// handleUsers adalah fungsi "Pelayan" kita (Handler)
func handleUsers(w http.ResponseWriter, r *http.Request) {
	// Di pure API, kita harus mengecek metode (kata kerja) secara manual
	if r.Method == http.MethodGet {
		// Jika ini adalah request GET (Minta Data)
		getUsers(w, r)
	} else if r.Method == http.MethodPost {
		// Jika ini adalah request POST (Kirim Data Baru)
		createUser(w, r)
	} else {
		// Jika method tidak didukung (misal PUT/DELETE)
		http.Error(w, "Metode tidak diizinkan", http.StatusMethodNotAllowed)
	}
}

// Handler untuk GET /api/users
func getUsers(w http.ResponseWriter, r *http.Request) {
	// Data palsu (simulasi dari database)
	users := []User{
		{ID: 1, Name: "Sandi", Role: "Admin"},
		{ID: 2, Name: "Budi", Role: "Analyst"},
	}

	// 1. Set Header bahwa kita akan mengirim JSON
	w.Header().Set("Content-Type", "application/json")
	
	// 2. Set Status Code 200 OK
	w.WriteHeader(http.StatusOK)

	// 3. Ubah (Marshal) struct Go menjadi format JSON lalu kirim ke ResponseWriter
	// json.NewEncoder adalah cara standar di Go untuk menulis JSON ke aliran data (stream)
	err := json.NewEncoder(w).Encode(users)
	if err != nil {
		http.Error(w, "Gagal mengubah data ke JSON", http.StatusInternalServerError)
	}
}

// Handler untuk POST /api/users
func createUser(w http.ResponseWriter, r *http.Request) {
	var newUser User

	// 1. Ambil data JSON dari request body, lalu masukkan (Decode) ke variabel newUser
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		// Jika JSON-nya cacat/salah format
		http.Error(w, "Format JSON tidak valid", http.StatusBadRequest)
		return
	}

	// 2. Set Header response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated) // 201 Created

	// Simulasi menyimpan ke DB (di sini kita cuma membalas ulang datanya)
	// Kita tambahkan pesan sukses ke dalam sebuah map
	response := map[string]interface{}{
		"message": "User berhasil dibuat",
		"data":    newUser,
	}

	// 3. Kirim response JSON
	json.NewEncoder(w).Encode(response)
}
