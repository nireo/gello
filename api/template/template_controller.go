package template

import "github.com/gin-gonic/gin"

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	template := r.Group("/template")
	{
		template.GET("/")
		template.POST("/")
		template.PATCH("/:id")
	}
}
