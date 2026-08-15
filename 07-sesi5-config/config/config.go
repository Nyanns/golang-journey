package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port    string
	Env     string
	AppName string
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
		log.Println("Peringatan: File .env tidak ditemukan, menggunakan nilai default OS")
	}
	return &Config{
		Port:    getEnv("APP_PORT", "8080"),
		Env:     getEnv("APP_ENV", "development"),
		AppName: getEnv("APP_NAME", "GoApp"),
	}
}
