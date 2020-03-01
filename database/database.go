package database

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // mysql config
	"github.com/nireo/gello/database/models"
)

// Initialize the database
func Initialize() (*gorm.DB, error) {
	db, err := gorm.Open("sqlite3", "./gello.db")

	if err != nil {
		panic(err)
	}

	db.LogMode(true)

	models.Migrate(db)
	return db, err
}
