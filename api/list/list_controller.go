package list

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

// List model alias
type List = models.List

// Board model alias
type Board = models.Board

// JSON type alias
type JSON = common.JSON

// Item model alias
type Item = models.Item

// User model alias
type User = models.User

// RequestBody is the common request body between controllers
type RequestBody struct {
	Title string `json:"title" binding:"required"`
}

func validateRequestBody(c *gin.Context) (RequestBody, bool) {
	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return body, false
	}

	return body, true
}

func get(c *gin.Context) {
	db := common.GetDatabase()
	id := c.Param("id")
	user := c.MustGet("user").(models.User)

	board, err := models.FindOneBoard(&Board{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if user.ID == board.UserID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	lists, ok := models.GetListsRelatedToBoard(board, db)
	if !ok {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, models.SerializeLists(lists))
}

func create(c *gin.Context) {
	db := common.GetDatabase()
	id := c.Param("id")
	user := c.MustGet("user").(models.User)

	body, ok := validateRequestBody(c)
	if !ok {
		return
	}

	board, err := models.FindOneBoard(&Board{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if board.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	uuid := common.GenerateUUID()
	list := List{
		Title:   body.Title,
		UUID:    uuid,
		BoardID: board.ID,
		UserID:  user.ID,
	}

	db.NewRecord(list)
	db.Save(&list)

	c.JSON(http.StatusOK, list.Serialize())
}

func delete(c *gin.Context) {
	db := common.GetDatabase()
	id := c.Param("id")
	user := c.MustGet("user").(User)

	list, err := models.FindOneList(&List{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	if user.ID != list.UserID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	db.Delete(&list)
	c.Status(http.StatusNoContent)
}

func update(c *gin.Context) {
	db := common.GetDatabase()
	id := c.Param("id")
	user := c.MustGet("user").(User)

	body, ok := validateRequestBody(c)
	if !ok {
		return
	}

	list, err := models.FindOneList(&List{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if user.ID != list.UserID {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	list.Title = body.Title

	db.Save(&list)
	c.JSON(http.StatusOK, list.Serialize())
}

func copyList(c *gin.Context) {
	db := common.GetDatabase()
	id := c.Param("id")
	user := c.MustGet("user").(User)

	list, err := models.FindOneList(&List{UUID: id})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if user.ID != list.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	// create the list
	uuid := common.GenerateUUID()
	newList := List{
		Title:   list.Title,
		UUID:    uuid,
		BoardID: list.BoardID,
		UserID:  user.ID,
	}

	db.NewRecord(newList)
	db.Create(&newList)

	// copy the items
	var itemsRelatedToList []Item
	if err := db.Model(&list).Related(&itemsRelatedToList).Error; err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	for index := range itemsRelatedToList {
		newItemUUID := common.GenerateUUID()
		newItem := Item{
			Content: itemsRelatedToList[index].Content,
			UUID:    newItemUUID,
			ListID:  newList.ID,
		}

		db.NewRecord(newItem)
		db.Create(&newItem)
	}

	c.JSON(http.StatusOK, newList.Serialize())
}
