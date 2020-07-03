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

func (item *Item) Delete() {
	db := common.GetDatabase()

	db.Delete(&item)
}

func (item *Item) Save() {
	db := common.GetDatabase()

	db.Save(&item)
}

func (item *Item) Create() {
	db := common.GetDatabase()

	db.Create(&item)
}

// GetItemWithID returns an item with given id
func GetItemWithID(id string, db *gorm.DB) (Item, bool) {
	var item Item
	if err := db.Where("uuid = ?", id).First(&item).Error; err != nil {
		return item, false
	}

	return item, true
}

func (item *Item) ChangeContent(newContent string) {
	item.Content = newContent
}

func (item *Item) ChangeTag(tagID uint) {
	item.TagID = tagID
}

// Serialize item data into json
func (item *Item) Serialize() common.JSON {
	return common.JSON{
		"content": item.Content,
		"uuid":    item.UUID,
	}
}

// FindOneItem finds a single item what matches the given condition
func FindOneItem(condition interface{}) (Item, error) {
	db := common.GetDatabase()
	var item Item
	if err := db.Where(condition).First(&item).Error; err != nil {
		return item, err
	}

	return item, nil
}

// FindManyItems finds many items that satisfy a given condition
func FindManyItems(condition interface{}) ([]Item, error) {
	db := common.GetDatabase()
	var items []Item
	if err := db.Where(condition).Find(&items).Error; err != nil {
		return items, err
	}

	return items, nil
}

// SerializeItems serializes an array of items
func SerializeItems(items []Item) []common.JSON {
	serialized := make([]common.JSON, len(items), len(items))
	for index := range items {
		serialized[index] = items[index].Serialize()
	}

	return serialized
}
