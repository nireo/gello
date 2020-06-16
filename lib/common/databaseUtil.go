package common

import "github.com/jinzhu/gorm"

var db *gorm.DB

// GetDatabase gives out the database instance where its needed
func GetDatabase() *gorm.DB {
	return db
}

// SetDatabase makes it so GetDatabase can retrieve the database
func SetDatabase(database *gorm.DB) {
	db = database
}
