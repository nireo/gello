package item

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

// Item model alias
type Item = models.Item

// List model alias
type List = models.List

// JSON type alias
type JSON = common.JSON

func create(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(400)
		return
	}

	type RequestBody struct {
		Content string `json:"content" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(400)
		return
	}

	var list List
	if err := db.Where("uuid = ?", id).First(&list).Error; err != nil {
		c.AbortWithStatus(404)
		return
	}

	item := Item{
		Content: body.Content,
		ListID:  list.ID,
		UUID:    common.GenerateUUID(),
	}

	db.NewRecord(item)
	db.Save(&item)

	c.JSON(200, item.Serialize())
}
