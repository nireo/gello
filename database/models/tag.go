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

func (tag *Tag) ChangeColor(newColor string) {
	tag.Color = newColor
}

func (tag *Tag) ChangeLabel(newLabel string) {
	tag.Label = newLabel
}

func SerializeTags(tags []Tag) []common.JSON {
	serializedTags := make([]common.JSON, len(tags), len(tags))
	for index := range tags {
		serializedTags[index] = tags[index].Serialize()
	}

	return serializedTags
}
