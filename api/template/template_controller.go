package template

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

// JSON type alias
type JSON = common.JSON

// User model alias
type User = models.User

// Board model alias
type Board = models.Board

// List model alias
type List = models.List

// Template model alias
type Template = models.Template

func getTemplates(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)

	var templates []Template
	if err := db.Find(&templates).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "no templates found"})
		return
	}

	var userTemplates []Template
	if err := db.Model(&user).Related(&userTemplates).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	serializedTemplates := make([]JSON, len(templates), len(templates))
	for index := range templates {
		serializedTemplates[index] = templates[index].Serialize()
	}

	serializedUserTemplates := make([]JSON, len(userTemplates), len(userTemplates))
	for index := range userTemplates {
		serializedUserTemplates[index] = userTemplates[index].Serialize()
	}

	c.JSON(http.StatusOK, gin.H{"userTemplates": serializedUserTemplates, "templates": serializedTemplates})
}

func createTemplate(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)

	type RequestBody struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description" binding:"required"`
		Lists       string `json:"lists" binding:"required"`
		Private     string `json:"private" binding:"required"`
	}

	var body RequestBody
	fmt.Println(body)
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		fmt.Println(err)
		return
	}

	privateValue := false
	if body.Private == "true" {
		privateValue = true
	}

	uuid := common.GenerateUUID()
	newTemplate := Template{
		Title:       body.Title,
		Description: body.Description,
		Official:    false,
		UUID:        uuid,
		User:        user,
		UserID:      user.ID,
		Private:     privateValue,
		Lists:       body.Lists,
	}

	db.NewRecord(newTemplate)
	db.Create(&newTemplate)

	c.JSON(http.StatusOK, newTemplate.Serialize())
}

func updateTemplate(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)
	id := c.Param("id")

	type RequestBody struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description" binding:"required"`
		Private     string `json:"private" binding:"required"`
		Lists       string `json:"lists" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var template Template
	if err := db.Where("uuid = ?", id).First(&template).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "template not found"})
		return
	}

	if user.ID != template.UserID {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "you don't own this template"})
		return
	}

	template.Title = body.Title
	template.Description = body.Description

	db.Save(&template)
	c.JSON(http.StatusOK, template.Serialize())
}

func deleteTemplate(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)
	id := c.Param("id")

	if id == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "an id has to be provided"})
		return
	}

	var template Template
	if err := db.Where("uuid = ?", id).First(&template).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "template not found"})
		return
	}

	if template.UserID != user.ID {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "you don't own this template"})
		return
	}

	db.Delete(&template)
	c.Status(http.StatusNoContent)
}

// the function for creating the new board with the lists in the template
func applyTemplate(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	user := c.MustGet("user").(User)

	if id == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	type RequestBody struct {
		Title string `json:"title" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var template Template
	if err := db.Where("uuid = ?", id).First(&template).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "template has not been found"})
		return
	}

	if template.Private && template.UserID != user.ID {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	// Create new board
	boardUUID := common.GenerateUUID()
	board := Board{
		Title:  body.Title,
		UUID:   boardUUID,
		Color:  "blue",
		UserID: user.ID,
	}

	db.NewRecord(board)
	db.Create(&board)

	// Create the lists
	lists := strings.Split(template.Lists, "|")
	for _, list := range lists {
		listUUID := common.GenerateUUID()
		newList := List{
			Title:   list,
			UUID:    listUUID,
			BoardID: board.ID,
		}

		db.NewRecord(newList)
		db.Save(&newList)
	}

	c.Status(http.StatusNoContent)
}
