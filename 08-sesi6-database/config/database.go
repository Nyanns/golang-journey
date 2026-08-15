package config

import (
	"fmt"
	"log"
	"sesi6/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// ConnectDB membuka koneksi ke PostgreSQL dan menjalankan AutoMigrate
func ConnectDb(cfg *Config) *gorm.DB {
	// 1. Susun Connection String (DSN) dari struct Config
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta",
		cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBPort,
	)
	// 2. Buka koneksi menggunakan driver Postgres dan engine GORM
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("❌ Gagal terhubung ke database PostgreSQL: %v", err)
	}
	// 3. Auto-Migrate: Buat tabel di DB otomatis jika belum ada
	err = db.AutoMigrate(&models.Anime{})
	if err != nil {
		log.Fatalf("❌ Gagal melakukan migrasi tabel Anime: %v", err)
	}
	log.Println("✅ Auto-Migration tabel 'animes' berhasil!")
	return db
}
