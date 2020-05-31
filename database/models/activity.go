package models

import (
	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/lib/common"
)

// Activity model
type Activity struct {
	gorm.Model
	UUID string

	// we could store the whole user here, but I don't think that is necessary.
	// for the activity display just showing the username is fine.
	Username string
	Content  string
}

// Serialize activity data into JSON-format
func (activity *Activity) Serialize() common.JSON {
	return common.JSON{
		"content":    activity.Content,
		"created_at": activity.CreatedAt,
		"username":   activity.Username,
		"uuid":       activity.UUID,
	}
}
