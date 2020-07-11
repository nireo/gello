package board

import (
	"net/http"

	"github.com/gin-gonic/gin"
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
	db := common.GetDatabase()
	user := c.MustGet("user").(models.User)

	boards, ok := models.GetUsersBoards(user, db)
	if !ok {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	var sharedBoards []models.SharedBoard
	db.Where(&models.SharedBoard{SharedUserID: user.ID}).Find(&sharedBoards)

	c.JSON(http.StatusOK, models.SerializeBoards(boards))
}

func create(c *gin.Context) {
	db := common.GetDatabase()
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
	db := common.GetDatabase()
	id := c.Param("id")
	user := c.MustGet("user").(models.User)

	board, err := models.FindOneBoard(&Board{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	// check if the user owns the board
	if board.UserID != user.ID || !models.CheckBoardOwnership(board.ID, user.ID) {
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
	db := common.GetDatabase()
	id := c.Param("id")
	user := c.MustGet("user").(models.User)

	board, err := models.FindOneBoard(&Board{UUID: id})
	if err != nil {
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
	db := common.GetDatabase()
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

	board, err := models.FindOneBoard(&Board{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if board.UserID != user.ID || !models.CheckBoardOwnership(board.ID, user.ID) {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	board.Title = body.Title
	board.Color = body.Color
	db.Save(&board)

	c.JSON(http.StatusOK, board.Serialize())
}

func addTagToBoard(c *gin.Context) {
	db := common.GetDatabase()
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

	board, err := models.FindOneBoard(&Board{UUID: id})
	if err != nil {
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

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	board, err := models.FindOneBoard(&Board{UUID: boardID})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if board.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	var userToShare models.User
	if err := db.Where("username = ?", body.Username).First(&userToShare).Error; err != nil {
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

func unShareBoard(c *gin.Context) {
	db := common.GetDatabase()
	user := c.MustGet("user").(models.User)
	boardID := c.Param("id")
	username := c.Param("id")

	userToRemove, err := models.FindOneUser(&models.User{Username: username})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	board, err := models.FindOneBoard(&Board{UUID: boardID})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if board.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	if err := db.Where(
		&models.SharedBoard{SharedUserID: userToRemove.ID,
			SharedBoardID: board.ID}).Delete(&models.SharedBoard{}).Error; err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusNoContent)
}

func getSharedUsers(c *gin.Context) {
	db := common.GetDatabase()
	user := c.MustGet("user").(models.User)
	boardID := c.Param("id")

	board, err := models.FindOneBoard(&Board{UUID: boardID})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if board.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	var shared []models.SharedBoard
	if err := db.Where(&models.SharedBoard{SharedBoardID: board.ID}).Find(&shared).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	// find all users
	var users []models.User
	for index := range shared {
		var sharedUser models.User
		if err := db.Where("id = ?", shared[index].SharedUserID).First(&sharedUser).Error; err != nil {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		users = append(users, sharedUser)
	}

	c.JSON(http.StatusOK, models.SerializeUsers(users))
}

func getBoardActivity(c *gin.Context) {
	db := common.GetDatabase()
	boardID := c.Param("boardID")

	board, err := models.FindOneBoard(&Board{UUID: boardID})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	var activities []models.Activity
	if err := db.Model(&board).Related(&activities).Error; err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, models.SerializeActivities(activities))
}

func deleteBoardActivity(c *gin.Context) {
	db := common.GetDatabase()
	boardID := c.Param("boardID")
	activityID := c.Param("activityID")
	user := c.MustGet("user").(models.User)

	board, err := models.FindOneBoard(&Board{UUID: boardID})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if board.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	var activity models.Activity
	if err := db.Where(&models.Activity{UUID: activityID}).First(&activity).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	db.Delete(&activity)
	c.Status(http.StatusNoContent)
}

func deleteTag(c *gin.Context) {
	db := common.GetDatabase()
	tagID := c.Param("tagID")
	user := c.MustGet("user").(models.User)

	var tag models.Tag
	if err := db.Where("uuid = ?", tagID).First(&tag).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	var board Board
	if err := db.Where("id = ?", tag.BoardID).First(&board).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if user.ID != board.UserID || !models.CheckBoardOwnership(board.ID, user.ID) {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	db.Delete(&tag)
	c.Status(http.StatusNoContent)
}
