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

// Save saves all changes made to a tag
func (tag *Tag) Save() {
	db := common.GetDatabase()

	db.Save(&tag)
}

// Create creates a new tag entry to the database
func (tag *Tag) Create() {
	db := common.GetDatabase()

	db.NewRecord(&db)
	db.Create(&db)
}

// Delete removes the database entry of a given tag
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

// ChangeColor changes the color of a tag
func (tag *Tag) ChangeColor(newColor string) {
	tag.Color = newColor
}

// ChangeLabel changes the label of a tag
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

// SerializeTags serializes a list of tags into JSON format
func SerializeTags(tags []Tag) []common.JSON {
	serializedTags := make([]common.JSON, len(tags), len(tags))
	for index := range tags {
		serializedTags[index] = tags[index].Serialize()
	}

	return serializedTags
}
