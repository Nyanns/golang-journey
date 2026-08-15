package main

// =============================================================
// API PERTAMAKU SENDIRI - Produk API 🛒
// =============================================================
//
// ANALOGI: API ini seperti kasir toko online
//
//   Client (Postman/Browser) --> minta daftar produk (HTTP Request)
//   Server (Go)              --> kirim data produk dalam format JSON
//
// ENDPOINT:
//   GET  /             --> halaman sambutan
//   GET  /produk       --> lihat semua produk
//   GET  /produk/murah --> lihat produk dengan harga < 100.000
//
// =============================================================

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// =============================================================
// STRUCT - Template/cetakan data "Produk"
// =============================================================
// Tag `json:"..."` = nama field saat dikirim sebagai JSON
//   tanpa tag --> "Nama" (kapital, kurang rapi)
//   dengan tag --> "nama" (lowercase, standar API profesional)
//
type Produk struct {
	ID    int    `json:"id"`
	Nama  string `json:"nama"`
	Harga int    `json:"harga"`
	Stock int    `json:"stock"`
}

// =============================================================
// DATA - "Database" sementara di memori (in-memory)
// =============================================================
// Nanti ini akan diganti koneksi ke PostgreSQL.
// Untuk sekarang, kita simpan langsung di slice.
var semuaProduk = []Produk{
	{ID: 1, Nama: "Keyboard Mechanical", Harga: 850000, Stock: 10},
	{ID: 2, Nama: "Mouse Gaming", Harga: 450000, Stock: 25},
	{ID: 3, Nama: "USB Hub", Harga: 75000, Stock: 50},
	{ID: 4, Nama: "Kabel HDMI", Harga: 35000, Stock: 100},
	{ID: 5, Nama: "Webcam HD", Harga: 320000, Stock: 15},
}

// =============================================================
// MAIN - Titik mulai program
// =============================================================
func main() {
	fmt.Println("🛒 Produk API berjalan!")
	fmt.Println("------------------------------------")

	// Daftarkan route ke handler masing-masing
	http.HandleFunc("/", handlerSambutan)
	http.HandleFunc("/produk", handlerSemuaProduk)
	http.HandleFunc("/produk/murah", handlerProdukMurah)

	fmt.Println("Coba akses:")
	fmt.Println("  --> http://localhost:9090/")
	fmt.Println("  --> http://localhost:9090/produk")
	fmt.Println("  --> http://localhost:9090/produk/murah")
	fmt.Println("------------------------------------")
	fmt.Println("Tekan Ctrl+C untuk stop server")

	// Listen di port 9090
	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		fmt.Println("ERROR:", err)
	}
}

// =============================================================
// HANDLER 1 - Sambutan (teks biasa)
// =============================================================
//
// Setiap handler WAJIB punya 2 parameter ini:
//   w http.ResponseWriter = "wadah" untuk tulis jawaban ke client
//   r *http.Request       = data request dari client (method, URL, body)
//
func handlerSambutan(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Selamat datang di Produk API! Akses /produk untuk lihat semua produk."))
}

// =============================================================
// HANDLER 2 - Kirim SEMUA produk sebagai JSON
// =============================================================
func handlerSemuaProduk(w http.ResponseWriter, r *http.Request) {

	// Set header: beritahu client bahwa data yang dikirim = JSON
	w.Header().Set("Content-Type", "application/json")

	// Encode slice --> JSON, langsung kirim ke client (w)
	json.NewEncoder(w).Encode(semuaProduk)
}

// =============================================================
// HANDLER 3 - Kirim produk dengan Harga < 100.000 saja
// =============================================================
func handlerProdukMurah(w http.ResponseWriter, r *http.Request) {

	// Filter: ambil produk yang harganya di bawah 100.000
	var produkMurah []Produk

	for _, p := range semuaProduk {
		if p.Harga < 100000 {
			produkMurah = append(produkMurah, p)
		}
	}

	// Set header & kirim hasil filter sebagai JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(produkMurah)
}
