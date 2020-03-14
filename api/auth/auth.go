package auth

import (
	"github.com/gin-gonic/gin"
)

// ApplyRoutes to gin engine
func ApplyRoutes(r *gin.RouterGroup) {
	auth := r.Group("/auth")
	{
		auth.POST("/login")
		auth.POST("/register", registerController)
	}
}
