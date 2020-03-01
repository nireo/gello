package list

import "github.com/gin-gonic/gin"

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	list := r.Group("/list")
	{
		list.GET("/:id")
		list.POST("/:id")
		list.DELETE("/:id")
		list.PATCH("/:id")
	}
}
