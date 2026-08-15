package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port       string
	Env        string
	AppName    string
	DBHost     string
	DBUser     string
	DBPassword string
	DBName     string
	DBPort     string
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func LoadConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ Peringatan: File .env tidak ditemukan, menggunakan environment OS")
	}

	return &Config{
		Port:       getEnv("APP_PORT", "8080"),
		Env:        getEnv("APP_ENV", "development"),
		AppName:    getEnv("APP_NAME", "AniVault"),
		DBHost:     getEnv("DB_HOST", "localhost"),
		DBUser:     getEnv("DB_USER", "postgres"),
		DBPassword: getEnv("DB_PASSWORD", "mysecretpassword"),
		DBName:     getEnv("DB_NAME", "anime_db"),
		DBPort:     getEnv("DB_PORT", "5432"),
	}
}
