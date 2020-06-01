package models

import (
	"math/rand"

	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/lib/common"
)

// The boards are setup in a way that boards have multiple lists and lists have multiple items

// Board data model
type Board struct {
	gorm.Model
	Title  string
	Lists  []List
	UUID   string
	Color  string
	UserID uint
	User   User
	Tags   []Tag
}

// Different colors used as board backgrounds.
// The colors are used in a classname so the colors are a bit different from just
// red, green, orange, green.
var colors = [4]string{"blue", "red", "orange", "green"}

// GetBoardWithID finds a board with the given ID
func GetBoardWithID(id string, db *gorm.DB) (Board, bool) {
	var board Board
	if err := db.Where("uuid = ?", id).First(&board).Error; err != nil {
		return board, false
	}

	return board, true
}

// GetListsRelatedToBoard returns all the lists which are related to a given board.
func GetListsRelatedToBoard(board Board, db *gorm.DB) ([]List, bool) {
	var lists []List
	if err := db.Model(&board).Related(&lists).Error; err != nil {
		return lists, false
	}

	return lists, true
}

// GetUsersBoards finds all the boards related to a user model
func GetUsersBoards(user User, db *gorm.DB) ([]Board, bool) {
	var boards []Board
	if err := db.Model(&user).Related(&boards).Error; err != nil {
		return boards, false
	}

	return boards, true
}

// ChooseRandomBoardColor returns a random color from a predefined list of colors.
func ChooseRandomBoardColor() string {
	return colors[rand.Intn(4)]
}

// Serialize board data into json
func (board *Board) Serialize() common.JSON {
	return common.JSON{
		"title":   board.Title,
		"uuid":    board.UUID,
		"created": board.CreatedAt,
		"color":   board.Color,
	}
}

// SerializeBoards serializes an array of boards
func SerializeBoards(boards []Board) []common.JSON {
	serialized := make([]common.JSON, len(boards), len(boards))
	for index := range boards {
		serialized[index] = boards[index].Serialize()
	}

	return serialized
}
