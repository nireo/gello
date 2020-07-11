import React, { useState, useEffect, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import { User } from '../../../interfaces/User';
import { getSharedUsers } from '../../../services/board';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { unShareBoard } from '../../../services/board';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ListItem } from '@material-ui/core';

type Props = {
  boardID: string;
};

export const SharedUsers: React.FC<Props> = ({ boardID }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const loadSharedUsers = useCallback(async () => {
    const data = await getSharedUsers(boardID);
    setUsers(data);
  }, [boardID]);

  useEffect(() => {
    if (users === null) {
      loadSharedUsers();
    }
  }, []);

  const removeAllSelectedUsers = () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${selectedUsers.length} users?`
      )
    ) {
      selectedUsers.forEach(async (user) => {
        await unShareBoard(user.username, boardID);
      });
    }
  };

  const handleCheckboxToggle = (value: User) => () => {
    const currentIndex = selectedUsers.indexOf(value);
    const newSelectedUsers = [...selectedUsers];

    if (currentIndex === -1) {
      newSelectedUsers.push(value);
    } else {
      newSelectedUsers.splice(currentIndex, 1);
    }

    setSelectedUsers(newSelectedUsers);
  };

  return (
    <Container>
      {users === null ? (
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <List>
            {users.map((user: User) => (
              <ListItem
                key={user.id}
                button
                onClick={handleCheckboxToggle(user)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    checked={selectedUsers.indexOf(user) !== -1}
                  />
                </ListItemIcon>
                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>
          {selectedUsers.length > 0 && (
            <Button variant="contained" onClick={removeAllSelectedUsers}>
              Remove selected users
            </Button>
          )}
        </div>
      )}
    </Container>
  );
};
