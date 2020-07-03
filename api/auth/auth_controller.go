package auth

import (
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
	"golang.org/x/crypto/bcrypt"
)

// User model alias
type User = models.User

// JSON type alias
type JSON = common.JSON

// Template model alias
type Template = models.Template

// Board model alias
type Board = models.Board

func hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	return string(bytes), err
}

func checkHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func generateToken(data JSON) (string, error) {
	// get time seven days from now
	date := time.Now().Add(time.Hour * 24 * 7)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user": data,
		"exp":  date.Unix(),
	})

	tokenString, err := token.SignedString([]byte("secret key"))
	return tokenString, err
}

func addTokenWithUserToResponse(serializedUser JSON) common.JSON {
	token, _ := generateToken(serializedUser)
	return common.JSON{
		"user":  serializedUser,
		"token": token,
	}
}

func registerController(c *gin.Context) {
	db := common.GetDatabase()

	type RequestBody struct {
		Email    string `json:"email" binding:"required"`
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	// if the user was found, return a conflict notice that the user already exists
	_, err := models.FindOneUser(&User{Username: requestBody.Username})
	if err == nil {
		c.AbortWithStatus(http.StatusConflict)
		return
	}

	hash, err := hash(requestBody.Password)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	user := User{
		Username: requestBody.Username,
		Password: hash,
		UUID:     common.GenerateUUID(),
	}

	db.NewRecord(user)
	db.Save(&user)

	c.JSON(http.StatusOK, addTokenWithUserToResponse(user.Serialize()))
}

func loginController(c *gin.Context) {
	type RequestBody struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	user, err := models.FindOneUser(&User{Username: requestBody.Username})
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if !checkHash(requestBody.Password, user.Password) {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	c.JSON(http.StatusOK, addTokenWithUserToResponse(user.Serialize()))
}

func removeUser(c *gin.Context) {
	db := common.GetDatabase()
	user := c.MustGet("user").(User)

	// remove all of the user's templates
	var templates []Template
	if err := db.Where("user_id = ?", user.ID).Find(&templates).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	for index := range templates {
		db.Delete(&templates[index])
	}

	// remove all of the user's boards
	var boards []Board
	if err := db.Where("user_id = ?", user.ID).Find(&boards).Error; err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	for index := range boards {
		db.Delete(&boards[index])
	}

	db.Delete(&user)
}

func updateUser(c *gin.Context) {
	db := common.GetDatabase()
	user := c.MustGet("user").(models.User)

	type RequestBody struct {
		Username string `json:"username" binding:"required"`
		Email    string `json:"email" binding:"required"`
	}

	var body RequestBody
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// check that there is a difference in information
	if user.Username == body.Username && user.Email == body.Email {
		// return no content because the request was successful, but there is no content to return
		c.AbortWithStatus(http.StatusNoContent)
		return
	}

	// check for new username
	if user.Username != body.Username {
		// check for conflicts
		_, err := models.FindOneUser(&User{Username: body.Username})
		if err == nil {
			c.AbortWithStatus(http.StatusConflict)
			return
		}

		user.Username = body.Username
	}

	if user.Email != body.Email {
		// check for conflicts
		_, err := models.FindOneUser(&User{Email: body.Email})
		if err == nil {
			c.AbortWithStatus(http.StatusConflict)
			return
		}

		user.Email = body.Email
	}

	db.Save(&user)

	c.Status(http.StatusNoContent)
}

func updatePassword(c *gin.Context) {
	user := c.MustGet("user").(models.User)

	type RequestBody struct {
		OldPassword string `json:"oldPassword" binding:"required"`
		NewPassword string `json:"newPassword" binding:"required"`
	}

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if !checkHash(requestBody.OldPassword, user.Password) {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	hash, err := hash(requestBody.NewPassword)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	user.Password = hash
	user.Save()

	c.Status(http.StatusNoContent)
}
