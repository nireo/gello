package template

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	template := r.Group("/template")
	{
		template.GET("/", getTemplates)
		template.POST("/", middlewares.Authorized, createTemplate)
		template.PATCH("/:id", middlewares.Authorized, updateTemplate)
	}
}
