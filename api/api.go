package api

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/api/board"
	"github.com/nireo/gello/api/item"
	"github.com/nireo/gello/api/list"
)

// ApplyRoutes adds router to gin engine
func ApplyRoutes(r *gin.Engine) {
	routes := r.Group("/api")
	{
		board.ApplyRoutes(routes)
		list.ApplyRoutes(routes)
		item.ApplyRoutes(routes)
	}
}
