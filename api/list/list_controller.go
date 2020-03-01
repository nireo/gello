package list

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/database"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

// List model alias
type List = models.List

// Board model alias
type Board = models.Board

// JSON type alias
type JSON = common.JSON

// Returns all lists related to a board
func get(c *gin.Context) {
	db := database.GetDB()
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(400)
		return
	}

	var board Board
	if err := db.Where("uuid = ?", id).First(&board).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	var lists []List
	if err := db.Model(&board).Related(&lists).Error; err != nil {
		c.AbortWithStatus(500)
		return
	}

	listsSerialized := make([]JSON, len(lists), len(lists))
	for index := range lists {
		listsSerialized[index] = lists[index].Serialize()
	}

	c.JSON(200, listsSerialized)
}

func create(c *gin.Context) {
	db := database.GetDB()
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(400)
		return
	}

	type RequestBody struct {
		Title string `json:"title" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var board Board
	if err := db.Where("uuid = ?", id).First(&board).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	uuid := common.GenerateUUID()
	list := List{
		Title:   body.Title,
		UUID:    uuid,
		BoardID: board.ID,
	}

	db.NewRecord(list)
	db.Save(&list)

	c.JSON(200, list.Serialize())
}
