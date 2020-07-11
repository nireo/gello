import React, { useState, useEffect, useCallback } from 'react';
import { Activity } from '../../../interfaces/Board';
import {
  getBoardActivities,
  removeBoardActivity,
} from '../../../services/board';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';

type Props = {
  boardID: string;
};

export const Activities: React.FC<Props> = ({ boardID }) => {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);

  const loadActivities = useCallback(async () => {
    const data = await getBoardActivities(boardID);
    setActivities(data);
  }, [boardID]);

  useEffect(() => {
    if (activities === null) {
      loadActivities();
    }
  }, [activities]);

  const handleCheckboxToggle = (value: Activity) => () => {
    const currentIndex = selectedActivities.indexOf(value);
    const newSelectedActivities = [...selectedActivities];

    if (currentIndex === -1) {
      newSelectedActivities.push(value);
    } else {
      newSelectedActivities.splice(currentIndex, 1);
    }

    setSelectedActivities(newSelectedActivities);
  };

  const removeAllSelectedActivities = () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${selectedActivities.length} activities?`
      )
    ) {
      selectedActivities.forEach(async (activity: Activity) => {
        await removeBoardActivity(activity.uuid, boardID);
      });
    }
  };

  return (
    <Container>
      {activities === null ? (
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <List>
            {activities.map((activity: Activity) => (
              <ListItem
                key={activity.uuid}
                button
                onClick={handleCheckboxToggle(activity)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    checked={selectedActivities.indexOf(activity) !== -1}
                  />
                </ListItemIcon>
                <ListItemText primary={activity.content} />
              </ListItem>
            ))}
          </List>
          {selectedActivities.length > 0 && (
            <Button variant="contained" onClick={removeAllSelectedActivities}>
              Remove activities
            </Button>
          )}
        </div>
      )}
    </Container>
  );
};
