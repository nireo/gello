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
}

// Serialize list data into JSON
func (list *List) Serialize() common.JSON {
	return common.JSON{
		"title": list.Title,
		"items": list.Items,
		"uuid":  list.UUID,
	}
}
