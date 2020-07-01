package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/lib/common"
)

// List data model
type List struct {
	gorm.Model
	Title   string
	Items   []Item
	BoardID uint
	UUID    string
	UserID  uint
}

func (list *List) Delete() {
	db := common.GetDatabase()

	db.Delete(&list)
}

func (list *List) Save() {
	db := common.GetDatabase()

	db.Save(&list)
}

func (list *List) Create() {
	db := common.GetDatabase()

	db.Create(&list)
}

// GetListWithID returns a list corresposind to an id
func GetListWithID(id string, db *gorm.DB) (List, bool) {
	var list List
	if err := db.Where("uuid = ?", id).First(&list).Error; err != nil {
		return list, false
	}

	return list, true
}

// FindOneList returns a list that matches the given condition
func FindOneList(condition interface{}) (List, error) {
	db := common.GetDatabase()
	var list List
	if err := db.Where(condition).First(&list).Error; err != nil {
		return list, err
	}

	return list, nil
}

// Serialize list data into JSON
func (list *List) Serialize() common.JSON {
	// parse the item data
	serializedItems := make([]common.JSON, len(list.Items), len(list.Items))
	for index := range list.Items {
		serializedItems[index] = list.Items[index].Serialize()
	}

	return common.JSON{
		"title": list.Title,
		"items": serializedItems,
		"uuid":  list.UUID,
	}
}

// SerializeLists serializes an array of templates
func SerializeLists(lists []List) []common.JSON {
	serialized := make([]common.JSON, len(lists), len(lists))
	for index := range lists {
		serialized[index] = lists[index].Serialize()
	}

	return serialized
}
