package board

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/lib/middlewares"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	board := r.Group("/board")
	{
		board.GET("/", middlewares.Authorized, get)
		board.GET("/:id", middlewares.Authorized, getSingle)
		board.POST("/", middlewares.Authorized, create)
		board.DELETE("/:id", middlewares.Authorized, delete)
		board.PATCH("/:id", middlewares.Authorized, update)
		board.POST("/share/:id", middlewares.Authorized)
		board.POST("/tag/:id", middlewares.Authorized, addTagToBoard)
	}
}
