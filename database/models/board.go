package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/lib/common"
)

// The boards are setup in a way that boards have multiple lists and lists have multiple items

// Board data model
type Board struct {
	gorm.Model
	Title string
	Lists []List
	UUID  string
}

// Serialize board data into json
func (board *Board) Serialize() common.JSON {
	return common.JSON{
		"title": board.Title,
		"lists": board.Lists,
		"uuid":  board.UUID,
	}
}