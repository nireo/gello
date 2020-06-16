package board

import (
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

// Tag model alias
type Tag = models.Tag

// RequestBody struct
type RequestBody struct {
	Title string `json:"title" binding:"required"`
}

func get(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(models.User)

	boards, ok := models.GetUsersBoards(user, db)
	if !ok {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, models.SerializeBoards(boards))
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
		Color:  models.ChooseRandomBoardColor(),
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

	board, ok := models.GetBoardWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	// check if the user owns the board
	if board.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	lists, ok := models.GetListsRelatedToBoard(board, db)
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

	board, ok := models.GetBoardWithID(id, db)
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

	board, ok := models.GetBoardWithID(id, db)
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

/*
func shareBoard(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(models.User)

	type RequestBody struct {
		UserID string `json:"user_id" binding:"required"`
	}

	var body RequestBody
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
	}

	var userToAdd models.User
	if err := db.Where("uuid = ?", body.UserID).First(&userToAdd).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	board.Users = append(board.Users, userToAdd)
	userToAdd.Shared = append(userToAdd.Shared, board)

	c.JSON(http.StatusOK, board.Serialize())
}
*/

func addTagToBoard(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(models.User)
	id := c.Param("id")

	type TagRequestBody struct {
		Color string `json:"color" binding:"required"`
		Label string `json:"label" binding:"required"`
	}

	var body TagRequestBody
	if err := c.BindJSON(&body).Error; err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	board, ok := models.GetBoardWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if user.ID != board.UserID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	newTag := Tag{
		UUID:    common.GenerateUUID(),
		Label:   body.Label,
		Color:   body.Color,
		BoardID: board.ID,
	}

	db.NewRecord(newTag)
	db.Save(&newTag)

	c.JSON(http.StatusOK, newTag.Serialize())
}

func shareBoard(c *gin.Context) {
	db := common.GetDatabase()
	user := c.MustGet("user").(models.User)
	boardID := c.Param("id")

	type RequestBody struct {
		Username string `json:"username" binding:"required"`
	}

	var board Board
	if err := db.Where("uuid = ?", boardID).First(&board).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if board.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	var userToShare models.User
	if err := db.Where("uuid = ?", boardID).First(&userToShare).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	newSharedBoard := models.SharedBoard{
		SharedBoard:   board,
		SharedBoardID: board.ID,
		SharedUser:    userToShare,
		SharedUserID:  userToShare.ID,
	}

	db.NewRecord(newSharedBoard)
	db.Save(&newSharedBoard)
	c.Status(http.StatusNoContent)
}
