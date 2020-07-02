import React, { useState, useEffect, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import { User } from '../../../interfaces/User';
import { getSharedUsers } from '../../../services/board';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { unShareBoard } from '../../../services/board';

type Props = {
  boardID: string;
};

export const SharedUsers: React.FC<Props> = ({ boardID }) => {
  const [users, setUsers] = useState<User[] | null>(null);

  const loadSharedUsers = useCallback(async () => {
    const data = await getSharedUsers(boardID);
    setUsers(data);
  }, [boardID]);

  useEffect(() => {
    if (users === null) {
      loadSharedUsers();
    }
  }, []);

  const handleUserRemove = (username: string) => {
    if (
      window.confirm(`Are you sure you want remove ${username} from the board?`)
    ) {
      unShareBoard(username, boardID);
    }
  };

  return (
    <Container>
      {users === null ? (
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          {users.map((user: User) => (
            <div style={{ marginBottom: '0.5rem', display: 'flex' }}>
              {user.username}
              <Button
                style={{ marginLeft: '2rem' }}
                onClick={() => handleUserRemove(user.username)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};
