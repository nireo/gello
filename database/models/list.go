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
