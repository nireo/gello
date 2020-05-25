package item

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/api/list"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

// Item model alias
type Item = models.Item

// List model alias
type List = models.List

// JSON type alias
type JSON = common.JSON

// Board model alias
type Board = models.Board

// User model alias
type User = models.User

func getItemWithID(id string, db *gorm.DB) (Item, bool) {
	var item Item
	if err := db.Where("uuid = ?", id).First(&item).First(&item).Error; err != nil {
		return item, false
	}

	return item, true
}

func create(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	type RequestBody struct {
		Content string `json:"content" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	list, ok := list.GetListWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	// check that user owns list
	if list.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	item := Item{
		Content:  body.Content,
		ListID:   list.ID,
		ListUUID: list.UUID,
		UUID:     common.GenerateUUID(),
	}

	db.NewRecord(item)
	db.Save(&item)

	c.JSON(http.StatusOK, item.Serialize())
}

func delete(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(User)

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	item, ok := getItemWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	list, ok := list.GetListWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if list.UserID != user.ID {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	db.Delete(&item)
	c.Status(http.StatusNoContent)
}

func update(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(User)

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	type RequestBody struct {
		Content  string `json:"content" binding:"required"`
		ListUUID string `json:"uuid" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	item, ok := getItemWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	list, ok := list.GetListWithID(body.ListUUID, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if list.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	if item.ListID != list.ID {
		item.ListID = list.ID
	}

	item.Content = body.Content
	db.Save(&item)

	c.JSON(http.StatusOK, item.Serialize())
}
