package auth

import (
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
	"golang.org/x/crypto/bcrypt"
)

// User model alias
type User = models.User

// JSON type alias
type JSON = common.JSON

// RequestBody common between different controllers
type RequestBody struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Returns the user struct or a boolean telling if the user was found
func getUserWithUsername(username string, db *gorm.DB) (User, bool) {
	var user User
	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		return user, false
	}

	return user, true
}

func deleteUser(username string, db *gorm.DB) bool {
	user, ok := getUserWithUsername(username, db)
	if !ok {
		return false
	}

	db.Delete(&user)
	return true
}

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
		"exp":  date.Unix,
	})

	tokenString, err := token.SignedString([]byte("secret key"))
	return tokenString, err
}

func registerController(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// if the user was found, return a conflict notice that the user already exists
	_, ok := getUserWithUsername(requestBody.Username, db)
	if ok {
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
	}

	db.NewRecord(user)
	db.Save(&user)

	c.JSON(http.StatusOK, user.Serialize())
}

func loginController(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var requestBody RequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	user, ok := getUserWithUsername(requestBody.Username, db)
	if !ok {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if !checkHash(requestBody.Password, user.Password) {
		c.AbortWithStatus(http.StatusForbidden)
		return
	}

	c.JSON(http.StatusOK, user.Serialize())
}
