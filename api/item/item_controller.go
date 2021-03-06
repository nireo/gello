package item

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

// Item model alias
type Item = models.Item

// List model alias
type List = models.List

// JSON type alias
type JSON = common.JSON

// User model alias
type User = models.User

// CheckSharedListOwnership returns a true if the board is shared to the user and false if not
func CheckSharedListOwnership(list List, userID uint) bool {
	db := common.GetDatabase()

	var sharedBoard models.SharedBoard
	if err := db.Where(&models.SharedBoard{SharedBoardID: list.BoardID, SharedUserID: userID}).First(&sharedBoard).Error; err != nil {
		return false
	}

	return true
}

func create(c *gin.Context) {
	db := common.GetDatabase()
	user := c.MustGet("user").(User)
	id := c.Param("id")

	type RequestBody struct {
		Content string `json:"content" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	list, err := models.FindOneList(&List{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	// check that user owns list
	if list.UserID != user.ID || !CheckSharedListOwnership(list, user.ID) {
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
	db := common.GetDatabase()
	id := c.Param("id")
	user := c.MustGet("user").(User)

	item, err := models.FindOneItem(&Item{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	list, err := models.FindOneList(&List{UUID: item.ListUUID})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if list.UserID != user.ID || !CheckSharedListOwnership(list, user.ID) {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	db.Delete(&item)
	c.Status(http.StatusNoContent)
}

func update(c *gin.Context) {
	db := common.GetDatabase()
	id := c.Param("id")
	user := c.MustGet("user").(User)

	type RequestBody struct {
		Content string `json:"content" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	item, err := models.FindOneItem(&Item{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return

	}

	list, err := models.FindOneList(&List{UUID: item.ListUUID})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if list.UserID != user.ID || !CheckSharedListOwnership(list, user.ID) {
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

func addTagToItem(c *gin.Context) {
	db := common.GetDatabase()
	id := c.Param("id")

	type RequestBody struct {
		TagID string `json:"tag_id" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body).Error; err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	item, err := models.FindOneItem(&Item{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	var tag models.Tag
	if err := db.Where("uuid = ?", body.TagID).First(&tag).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	item.TagID = tag.ID

	db.Save(&item)
	c.JSON(http.StatusOK, item.Serialize())
}
