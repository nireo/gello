package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Authorized blocks unauthorized requests
func Authorized(c *gin.Context) {
	_, exists := c.Get("user")
	if !exists {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}
}
