package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/lib/common"
)

// The boards are setup in a way that boards have multiple lists and lists have multiple items

// Board data model
type Board struct {
	gorm.Model
	Title  string
	Lists  []List
	UUID   string
	Color  string
	UserID uint
	User   User
}

// Serialize board data into json
func (board *Board) Serialize() common.JSON {
	return common.JSON{
		"title":   board.Title,
		"uuid":    board.UUID,
		"created": board.CreatedAt,
		"color":   board.Color,
	}
}
