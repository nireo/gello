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
}

// Serialize user data into JSON
func (user *User) Serialize() common.JSON {
	return common.JSON{
		"username": user.Username,
		"id":       user.ID,
	}
}

// Read user data
func (user *User) Read(m common.JSON) {
	user.ID = uint(m["id"].(float64))
	user.Username = m["username"].(string)
}
