package api

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/api/board"
)

// ApplyRoutes adds router to gin engine
func ApplyRoutes(r *gin.Engine) {
	routes := r.Group("/api")
	{
		board.ApplyRoutes(routes)
	}
}
