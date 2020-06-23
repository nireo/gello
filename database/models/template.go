package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/lib/common"
)

// Template data model
type Template struct {
	gorm.Model
	Title       string
	Description string
	User        User
	UserID      uint
	Official    bool
	UUID        string
	Private     bool
	Lists       string
	Likes       uint
}

// GetTemplates returns all templates
func GetTemplates(db *gorm.DB) ([]Template, bool) {
	var templates []Template
	if err := db.Find(&templates).Error; err != nil {
		return templates, false
	}

	return templates, true
}

func (template *Template) ChangeDescription(description string) {
	template.Description = description
}

func (template *Template) ChangeTitle(title string) {
	template.Title = title
}

func (template *Template) AddLike() {
	template.Likes += 1
}

// GetUserTemplates gets all templates related to user model
func GetUserTemplates(user User, db *gorm.DB) ([]Template, bool) {
	var templates []Template
	if err := db.Model(&user).Related(&templates).Error; err != nil {
		return templates, false
	}

	return templates, true
}

// GetSingleTemplate returns a template with the given id
func GetSingleTemplate(id string, db *gorm.DB) (Template, bool) {
	var template Template
	if err := db.Where("uuid = ?", id).First(&template).Error; err != nil {
		return template, false
	}

	return template, true
}

// FindOneTemplate returns a template matching the given condition
func FindOneTemplate(condition interface{}) (Template, error) {
	db := common.GetDatabase()
	var template Template
	if err := db.Where(condition).First(&template).Error; err != nil {
		return template, err
	}

	return template, nil
}

// Serialize template data into json
func (template *Template) Serialize() common.JSON {
	return common.JSON{
		"title":       template.Title,
		"description": template.Description,
		"created_at":  template.CreatedAt,
		"lists":       template.Lists,
		"official":    template.Official,
		"uuid":        template.UUID,
		"likes":       template.Likes,
	}
}

// SerializeTemplates serializes an array of templates
func SerializeTemplates(templates []Template) []common.JSON {
	serialized := make([]common.JSON, len(templates), len(templates))
	for index := range templates {
		serialized[index] = templates[index].Serialize()
	}

	return serialized
}
