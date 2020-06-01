package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
	"github.com/nireo/gello/lib/common"
)

var messageTypes = [4]string{"deleteItem", "deleteList", "addList", "addItem"}

// Activity model
type Activity struct {
	gorm.Model
	UUID string

	// we could store the whole user here, but I don't think that is necessary.
	// for the activity display just showing the username is fine.
	Username string
	Content  string
}

// CreateActivityReport creates a activity entry with username, actionType and boardID
// and returns a status on if the creation was successful
func CreateActivityReport(username, actionType, boardID string, db *gorm.DB) bool {
	// finding the board could be handeled in the controllers, but searching for boards
	// in a item controller isn't really consistent in my opinion.
	var board Board
	if err := db.Where("uuid = ?", boardID).First(&board).Error; err != nil {
		return false
	}

	contentMessage, ok := generateActivityMessage(username, actionType)
	if !ok {
		return false
	}

	newActivity := Activity{
		UUID:     common.GenerateUUID(),
		Username: username,
		Content:  contentMessage,
	}

	db.NewRecord(newActivity)
	db.Save(&newActivity)

	return true
}

// DeleteActivityReport takes an activity\s id and deletes that activity
func DeleteActivityReport(activityID string, db *gorm.DB) bool {
	activity, ok := FindActivity(activityID, db)
	if !ok {
		return false
	}

	db.Delete(&activity)
	return true
}

// FindActivity takes an activity's id and return that activity
func FindActivity(activityID string, db *gorm.DB) (Activity, bool) {
	var activity Activity
	if err := db.Where("uuid = ?", activityID).First(&activity).Error; err != nil {
		return activity, false
	}

	return activity, true
}

func generateActivityMessage(username, actionType string) (string, bool) {
	switch actionType {
	case messageTypes[0]:
		return fmt.Sprintf("%s has deleted an item.", username), true
	case messageTypes[1]:
		return fmt.Sprintf("%s has deleted a list", username), true
	case messageTypes[2]:
		return fmt.Sprintf("%s has created a list", username), true
	case messageTypes[3]:
		return fmt.Sprintf("%s has created an item", username), true
	default:
		return "", false
	}
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

// SerializeActivities serializes an array of activities
func SerializeActivities(activities []Activity) []common.JSON {
	serialized := make([]common.JSON, len(activities), len(activities))
	for index := range activities {
		serialized[index] = activities[index].Serialize()
	}

	return serialized
}
