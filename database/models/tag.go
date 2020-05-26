package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/lib/common"
)

// Tag data model
type Tag struct {
	gorm.Model
	Color   string
	Label   string
	UUID    string
	BoardID uint
}

// Serialize tag data to json
func (tag *Tag) Serialize() common.JSON {
	return common.JSON{
		"color": tag.Color,
		"label": tag.Label,
	}
}
