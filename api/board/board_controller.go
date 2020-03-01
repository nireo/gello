package board

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

// Board type alias
type Board = models.Board

// JSON type alias
type JSON = common.JSON

func get(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var boards []Board
	if err := db.Find(&boards).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	serialized := make([]JSON, len(boards), len(boards))
	for index := range boards {
		serialized[index] = boards[index].Serialize()
	}

	c.JSON(200, serialized)
}

func create(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	type RequestBody struct {
		Title string `json:"title" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(400)
		return
	}

	uuid := common.GenerateUUID()
	board := Board{
		Title: body.Title,
		UUID:  uuid,
	}

	db.NewRecord(board)
	db.Create(&board)

	c.JSON(200, board.Serialize())
}

func getSingle(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	var board Board
	if err := db.Where("uuid = ?", id).First(&board).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	c.JSON(200, board.Serialize())
}

func delete(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
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

	db.Delete(&board)
	c.Status(204)
}

func update(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

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

	board.Title = body.Title

	db.Save(&board)
	c.JSON(200, board.Serialize())
}
