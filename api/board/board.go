package board

import (
	"github.com/gin-gonic/gin"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	board := r.Group("/board")
	{
		board.GET("/", get)
		board.GET("/:id", getSingle)
		board.POST("/", create)
		board.DELETE("/:id", delete)
		board.PATCH("/:id", update)
	}
}
