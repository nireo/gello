package list

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/api/board"
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

// RequestBody is the common request body between controllers
type RequestBody struct {
	Title string `json:"title" binding:"required"`
}

func getListWithID(id string, db *gorm.DB) (List, bool) {
	var list List
	if err := db.Where("uuid = ?", id).First(&list).Error; err != nil {
		return list, false
	}

	return list, true
}

func getListsRelatedToABoard(board *Board, db *gorm.DB) ([]List, bool) {
	var lists []List
	if err := db.Model(&board).Related(&lists).Error; err != nil {
		return lists, false
	}

	return lists, true
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
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	board, ok := board.GetBoardWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	lists, ok := getListsRelatedToABoard(&board, db)
	if !ok {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	listsSerialized := make([]JSON, len(lists), len(lists))
	for index := range lists {
		listsSerialized[index] = lists[index].Serialize()
	}

	c.JSON(http.StatusOK, listsSerialized)
}

func create(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	body, ok := validateRequestBody(c)
	if !ok {
		return
	}

	board, ok := board.GetBoardWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
	}

	uuid := common.GenerateUUID()
	list := List{
		Title:   body.Title,
		UUID:    uuid,
		BoardID: board.ID,
	}

	db.NewRecord(list)
	db.Save(&list)

	c.JSON(http.StatusOK, list.Serialize())
}

func delete(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	list, ok := getListWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	db.Delete(&list)
	c.Status(http.StatusNoContent)
}

func update(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	body, ok := validateRequestBody(c)
	if !ok {
		return
	}

	list, ok := getListWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	list.Title = body.Title

	db.Save(&list)
	c.JSON(http.StatusOK, list.Serialize())
}

func copyList(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	list, ok := getListWithID(id, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	// create the list
	uuid := common.GenerateUUID()
	newList := List{
		Title:   list.Title,
		UUID:    uuid,
		BoardID: list.BoardID,
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
