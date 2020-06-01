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

// GetItemWithID returns an item with given id
func GetItemWithID(id string, db *gorm.DB) (Item, bool) {
	var item Item
	if err := db.Where("uuid = ?", id).First(&item).Error; err != nil {
		return item, false
	}

	return item, true
}

// Serialize item data into json
func (item *Item) Serialize() common.JSON {
	return common.JSON{
		"content": item.Content,
		"uuid":    item.UUID,
	}
}

// SerializeItems serializes an array of items
func SerializeItems(items []Item) []common.JSON {
	serialized := make([]common.JSON, len(items), len(items))
	for index := range items {
		serialized[index] = items[index].Serialize()
	}

	return serialized
}
