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
		board.GET("/board/:id", middlewares.Authorized, getSingle)
		board.GET("/activity/:boardID", middlewares.Authorized, getBoardActivity)
		board.GET("/shared/:id", middlewares.Authorized, getSharedUsers)

		board.POST("/", middlewares.Authorized, create)
		board.POST("/share/:id", middlewares.Authorized, shareBoard)
		board.POST("/tag/:id", middlewares.Authorized, addTagToBoard)

		board.PATCH("/:id", middlewares.Authorized, update)

		board.DELETE("activity/:boardID/:activityID", middlewares.Authorized, deleteBoardActivity)
		board.DELETE("/board/:id", middlewares.Authorized, delete)
		board.DELETE("/share/:id/:username", middlewares.Authorized, unShareBoard)
	}
}
