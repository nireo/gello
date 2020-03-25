package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/lib/common"
)

// User data model
type User struct {
	gorm.Model
	Username string
	Password string
	Email    string
	UUID     string
	Shared   []*Board `gorm:"many2many:user_shared"`
}

// Serialize user data into JSON
func (user *User) Serialize() common.JSON {
	return common.JSON{
		"username": user.Username,
		"id":       user.ID,
		"uuid":     user.UUID,
	}
}

// Read user data
func (user *User) Read(m common.JSON) {
	user.ID = uint(m["id"].(float64))
	user.Username = m["username"].(string)
}
