package item

import "github.com/gin-gonic/gin"

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	item := r.Group("/items")
	{
		item.POST("/:id", create)
		item.DELETE("/:id", delete)
		item.PATCH("/:id", update)
	}
}
