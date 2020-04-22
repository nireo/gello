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

	var templates []models.Template
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
