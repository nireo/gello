package main

import (
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/api"
	"github.com/nireo/gello/database"
	"github.com/nireo/gello/lib/middlewares"
)

func main() {
	app := gin.Default()
	db, _ := database.Initialize()
	app.Use(database.Inject(db))
	app.Use(middlewares.JWTMiddleware())
	api.ApplyRoutes(app)
	app.Run(":8080")
}
