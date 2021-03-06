package api

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/api/auth"
	"github.com/nireo/gello/api/board"
	"github.com/nireo/gello/api/item"
	"github.com/nireo/gello/api/list"
	"github.com/nireo/gello/api/template"
)

// ApplyRoutes adds router to gin engine
func ApplyRoutes(r *gin.Engine) {
	routes := r.Group("/api")
	{
		board.ApplyRoutes(routes)
		list.ApplyRoutes(routes)
		item.ApplyRoutes(routes)
		auth.ApplyRoutes(routes)
		template.ApplyRoutes(routes)
	}
}
