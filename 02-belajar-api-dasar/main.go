package main

// =============================================================
// BELAJAR API DARI NOL - Super Sederhana
// =============================================================
//
// ANALOGI: Go HTTP server itu seperti warung makan
//
//   Client (Postman)  -->  ngirim "nota pesanan" (HTTP Request)
//   Server (Go)       -->  terima nota, proses, kirim "makanan" (HTTP Response)
//   JSON              -->  bahasa/format yang digunakan untuk bertukar data
//
// =============================================================

import (
	// "net/http" = package untuk membuat server web di Go
	// Ini bawaan Go, tidak perlu install apapun
	"net/http"

	// "encoding/json" = package untuk mengubah data Go <--> teks JSON
	// Juga bawaan Go
	"encoding/json"

	// "fmt" = package untuk mencetak teks (sudah familiar kan?)
	"fmt"
)

// =============================================================
// STRUCT = Bentuk/Template data kita
// =============================================================
// Ini seperti bikin cetakan kue. Semua "User" punya ID, Nama, dan Usia.
type User struct {
	ID   int    `json:"id"`   // <-- tag json:"id" = nama field saat jadi JSON
	Nama string `json:"nama"` //     tanpa tag ini, nama field di JSON = "Nama" (kapital)
	Usia int    `json:"usia"`
}

// =============================================================
// MAIN FUNCTION = Titik start program
// =============================================================
func main() {
	fmt.Println("Server mulai berjalan...")

	// http.HandleFunc = "Daftarkan tukang masak untuk menu tertentu"
	//
	//   "/sapa"     = alamat/path yang ditangani (seperti nomor meja di warung)
	//   handlerSapa = fungsi yang akan dijalankan saat ada request ke /sapa
	//
	http.HandleFunc("/sapa", handlerSapa)
	http.HandleFunc("/user", handlerUser)

	fmt.Println("Buka browser: http://localhost:8080/sapa")
	fmt.Println("Buka browser: http://localhost:8080/user")

	// http.ListenAndServe = "Buka warung di port 8080, tunggu pelanggan datang"
	// Program akan BERHENTI di sini (menunggu terus) sampai dihentikan manual (Ctrl+C)
	http.ListenAndServe(":8080", nil)
}

// =============================================================
// HANDLER = Fungsi yang menangani 1 jenis request
// =============================================================
//
// Setiap handler WAJIB punya 2 parameter ini:
//
//   w http.ResponseWriter  = "Nampan untuk naruh makanan/jawaban ke client"
//                             Kamu MENULIS jawaban ke sini
//
//   r *http.Request        = "Nota pesanan dari client"
//                             Kamu MEMBACA info request dari sini
//                             (termasuk: method GET/POST, URL, body, header)
//
// =============================================================

// Handler paling sederhana - hanya kirim teks biasa
func handlerSapa(w http.ResponseWriter, r *http.Request) {
	// w.Write = tulis teks ke "nampan" (kirim ke client)
	// []byte() = ubah string menjadi bytes (Go butuh format bytes untuk Write)
	w.Write([]byte("Halo! Ini response dari server Go kamu!"))
}

// Handler yang mengirim data JSON
func handlerUser(w http.ResponseWriter, r *http.Request) {

	// 1. Siapkan data yang mau dikirim
	//    (Nanti ini akan diambil dari database, sekarang kita "pura-pura" dulu)
	user := User{
		ID:   1,
		Nama: "Sandi",
		Usia: 22,
	}

	// 2. Beritahu client: "Hei, data yang kamu terima formatnya adalah JSON"
	//    Ini namanya HTTP Header - semacam "label amplop" sebelum isi suratnya
	//    Content-Type = "isi amplop ini berformat apa?"
	w.Header().Set("Content-Type", "application/json")

	// 3. Ubah struct Go --> teks JSON, lalu langsung kirim ke client
	//    json.NewEncoder(w)  = buat "mesin encoder" yang output-nya langsung ke w (nampan)
	//    .Encode(user)       = proses enkoding & kirim
	json.NewEncoder(w).Encode(user)
}
