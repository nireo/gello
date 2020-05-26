package item

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	item := r.Group("/items")
	{
		item.POST("/create/:id", middlewares.Authorized, create)
		item.DELETE("/:id", middlewares.Authorized, delete)
		item.PATCH("/:id", middlewares.Authorized, update)
		item.POST("/tag/:id", addTagToItem)
	}
}
