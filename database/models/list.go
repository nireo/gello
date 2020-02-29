package models

import "github.com/jinzhu/gorm"

// List data model
type List struct {
	gorm.Model
	Title   string
	Items   []Item
	BoardID uint
	UUID    string
}
