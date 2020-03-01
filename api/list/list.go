package list

import "github.com/gin-gonic/gin"

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	list := r.Group("/list")
	{
		list.GET("/:id", get)
		list.POST("/:id", create)
		list.DELETE("/:id")
		list.PATCH("/:id")
	}
}
