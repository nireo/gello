package database

import "github.com/jinzhu/gorm"

var db *gorm.DB

// Initialize starts the database up
func Initialize() {
	db, _ = gorm.Open("sqlite3", "./gello.db")
}

// GetDB returns a pointer to the database
func GetDB() *gorm.DB {
	return db
}
