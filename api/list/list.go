package list

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	list := r.Group("/list")
	{
		list.GET("/:id", middlewares.Authorized, get)
		list.POST("/:id", middlewares.Authorized, create)
		list.DELETE("/:id", middlewares.Authorized, delete)
		list.PATCH("/:id", middlewares.Authorized, update)
		list.POST("/:id/copy", middlewares.Authorized, copyList)
	}
}
