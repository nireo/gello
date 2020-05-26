package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/lib/common"
)

// Item data model
type Item struct {
	gorm.Model
	Content  string
	UUID     string
	ListID   uint
	ListUUID string
	TagID    uint
}

// Serialize item data into json
func (item *Item) Serialize() common.JSON {
	return common.JSON{
		"content": item.Content,
		"uuid":    item.UUID,
	}
}
