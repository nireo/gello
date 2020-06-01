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
