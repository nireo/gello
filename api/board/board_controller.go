package board

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/database"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

// Board type alias
type Board = models.Board

// JSON type alias
type JSON = common.JSON

func get(c *gin.Context) {
	db := database.GetDB()

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
