package middlewares

import (
	"errors"
	"fmt"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/nireo/gello/database/models"
	"github.com/nireo/gello/lib/common"
)

var secretKey []byte

// JSON type alias
type JSON = common.JSON

// User model alias
type User = models.User

// TODO: implement opening a key file instead of hard coded string
func init() {
	secretKey = []byte("secret key")
}

func validateToken(tokenString string) (JSON, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil {
		return JSON{}, err
	}

	if !token.Valid {
		return JSON{}, errors.New("Invalid token")
	}

	return token.Claims.(jwt.MapClaims), nil
}

func extractTokenFromAuthorizationHeader(c *gin.Context) (string, error) {
	authorization := c.Request.Header.Get("Authorization")
	if authorization == "" {
		return "", errors.New("Authorization header empty")
	}

	token := []string{}

	// check for different bearer token types, since some services use 'bearer' and other 'Bearer'
	if strings.Contains(authorization, "bearer") {
		token = strings.Split(authorization, "bearer ")
		if len(token) < 1 {
			return "", errors.New("Token not in bearer format")
		}
	} else if strings.Contains(authorization, "Bearer") {
		token = strings.Split(authorization, "Bearer ")
		if len(token) < 1 {
			return "", errors.New("Token not in Bearer format")
		}
	} else {
		return "", errors.New("Authorization field doesn't include a token")
	}

	return token[1], nil
}

// JWTMiddleware extracts and parses token from header/cookie
func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString, err := c.Cookie("token")
		if err != nil {
			tempTokenString, err := extractTokenFromAuthorizationHeader(c)
			if err != nil {
				c.Next()
				return
			}

			tokenString = tempTokenString
		}

		tokenData, err := validateToken(tokenString)
		if err != nil {
			c.Next()
			return
		}

		var user User
		user.Read(tokenData["user"].(JSON))
		c.Set("user", user)
		c.Set("token_expire", tokenData["exp"])
		c.Next()
	}
}
