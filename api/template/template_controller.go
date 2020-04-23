package template

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

// JSON type alias
type JSON = common.JSON

// User model alias
type User = models.User

// Template model alias
type Template = models.Template

func getTemplates(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	page := c.Param("page")

	if page == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "you need to provide a page"})
		return
	}

	pageNumber, err := strconv.Atoi(page)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "error occurred while parsing page"})
		return
	}

	var templates []Template
	if err := db.Find(&templates).Offset(pageNumber * 10).Limit(10).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "no templates found"})
		return
	}

	serializedTemplates := make([]JSON, len(templates), len(templates))
	for index := range templates {
		serializedTemplates[index] = templates[index].Serialize()
	}

	c.JSON(http.StatusOK, serializedTemplates)
}

func createTemplate(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	user := c.MustGet("user").(User)

	type RequestBody struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body).Error; err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	uuid := common.GenerateUUID()
	newTemplate := Template{
		Title:       body.Title,
		Description: body.Description,
		Official:    false,
		UUID:        uuid,
		User:        user,
		UserID:      user.ID,
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
	}

	var body RequestBody
	if err := c.BindJSON(&body).Error; err != nil {
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
