package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

// Migrate models to the database
func Migrate(db *gorm.DB) {
	db.AutoMigrate(&Item{}, &Board{}, &List{})
	fmt.Println("Migration complete.")
}
