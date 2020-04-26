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
}

// Serialize template data into json
func (template *Template) Serialize() common.JSON {
	return common.JSON{
		"title":       template.Title,
		"description": template.Description,
	}
}
