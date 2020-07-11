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
}

// SharedBoard makes adding users to a board easier
type SharedBoard struct {
	SharedBoardID uint
	SharedUserID  uint
	SharedBoard   Board
	SharedUser    User
}

// Serialize user data into JSON
func (user *User) Serialize() common.JSON {
	return common.JSON{
		"username": user.Username,
		"id":       user.ID,
		"uuid":     user.UUID,
	}
}

// Create creates a new database entry from a user struct
func (user *User) Create() {
	db := common.GetDatabase()

	db.NewRecord(user)
	db.Create(&user)
}

// Save saves all changes made to a user in the database
func (user *User) Save() {
	db := common.GetDatabase()

	db.Save(&user)
}

// Delete removes the database entry of a given user
func (user *User) Delete() {
	db := common.GetDatabase()

	db.Delete(&user)
}

// SerializeUsers serializes a list of users into json format
func SerializeUsers(users []User) []common.JSON {
	serializedUsers := make([]common.JSON, len(users), len(users))
	for index := range users {
		serializedUsers[index] = users[index].Serialize()
	}

	return serializedUsers
}

// FindOneUser finds a single user that matches the given condition
func FindOneUser(condition interface{}) (User, error) {
	db := common.GetDatabase()
	var user User
	if err := db.Where(condition).First(&user).Error; err != nil {
		return user, err
	}

	return user, nil
}

// Read user data
func (user *User) Read(m common.JSON) {
	user.ID = uint(m["id"].(float64))
	user.Username = m["username"].(string)
}

// CheckBoardOwnership checks for shared board ownership between board and user
func CheckBoardOwnership(boardID uint, userID uint) bool {
	db := common.GetDatabase()

	var sharedBoard SharedBoard
	if err := db.Where(&SharedBoard{SharedUserID: userID, SharedBoardID: boardID}).First(&sharedBoard).Error; err != nil {
		return false
	}

	return true
}
