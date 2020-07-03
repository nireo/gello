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

func (tag *Tag) Save() {
	db := common.GetDatabase()

	db.Save(&tag)
}

func (tag *Tag) Create() {
	db := common.GetDatabase()

	db.NewRecord(&db)
	db.Create(&db)
}

func (tag *Tag) Delete() {
	db := common.GetDatabase()

	db.Delete(&tag)
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

// FindManyTags finds all the tags that match the given condition
func FindManyTags(condition interface{}) ([]Tag, error) {
	db := common.GetDatabase()
	var tags []Tag
	if err := db.Where(condition).Find(&tags).Error; err != nil {
		return tags, err
	}

	return tags, nil
}

func SerializeTags(tags []Tag) []common.JSON {
	serializedTags := make([]common.JSON, len(tags), len(tags))
	for index := range tags {
		serializedTags[index] = tags[index].Serialize()
	}

	return serializedTags
}
