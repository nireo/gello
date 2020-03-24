package board

import (
	"math/rand"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

// Board type alias
type Board = models.Board

// List type alias
type List = models.List

// Item type alias
type Item = models.Item

// JSON type alias
type JSON = common.JSON

// RequestBody struct
type RequestBody struct {
	Title string `json:"title" binding:"required"`
}

// Colors used as board backgrounds
var colors = [4]string{"blue", "red", "orange", "green"}

// GetBoardWithID finds a board with the given ID
func GetBoardWithID(id string, db *gorm.DB) (Board, bool) {
	var board Board
	if err := db.Where("uuid = ?", id).First(&board).Error; err != nil {
		return board, false
	}

	return board, true
}

func getUsersBoards(user models.User, db *gorm.DB) ([]Board, bool) {
	var boards []Board
	if err := db.Model(&user).Related(&boards).Error; err != nil {
		return boards, false
	}

	return boards, true
}

func getListsRelatedToBoard(board Board, db *gorm.DB) ([]List, bool) {
	var lists []List
	if err := db.Model(&board).Related(&lists).Error; err != nil {
		return lists, false
	}

	return lists, true
}

func chooseRandomColor() string {
	return colors[rand.Intn(4)]
}

func get(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(models.User)

	boards, ok := getUsersBoards(user, db)
	if !ok {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	serialized := make([]JSON, len(boards), len(boards))
	for index := range boards {
		serialized[index] = boards[index].Serialize()
	}

	c.JSON(http.StatusOK, serialized)
}

func create(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(models.User)

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	uuid := common.GenerateUUID()
	board := Board{
		Title:  body.Title,
		UUID:   uuid,
		Color:  chooseRandomColor(),
		UserID: user.ID,
	}

	db.NewRecord(board)
	db.Create(&board)

	c.JSON(http.StatusOK, board.Serialize())
}

func getSingle(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(models.User)

	board, ok := GetBoardWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	// check if the user owns the board
	if board.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	lists, ok := getListsRelatedToBoard(board, db)
	if !ok {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	serializedList := make([]JSON, len(lists), len(lists))
	for index := range lists {
		var items []Item
		if err := db.Model(&lists[index]).Related(&items).Error; err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		listItem := lists[index]
		listItem.Items = items
		serializedList[index] = listItem.Serialize()
	}

	c.JSON(http.StatusOK, gin.H{
		"board": board.Serialize(),
		"lists": serializedList,
	})
}

func delete(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(models.User)

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	board, ok := GetBoardWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if board.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	db.Delete(&board)
	c.Status(http.StatusNoContent)
}

func update(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(models.User)

	type RequestBodyWithColor struct {
		Color string `json:"color" binding:"required"`
		Title string `json:"title" binding:"required"`
	}

	var body RequestBodyWithColor
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	board, ok := GetBoardWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if board.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	board.Title = body.Title
	board.Color = body.Color
	db.Save(&board)

	c.JSON(http.StatusOK, board.Serialize())
}
