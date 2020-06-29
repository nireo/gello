import React, { useState, useEffect, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import { User } from '../../../interfaces/User';
import { getSharedUsers } from '../../../services/board';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
  boardID: string;
};

export const SharedUsers: React.FC<Props> = ({ boardID }) => {
  const [users, setUsers] = useState<User[] | null>(null);

  const loadSharedUsers = useCallback(async () => {
    const data = await getSharedUsers(boardID);
    setUsers(null);
  }, [boardID]);

  useEffect(() => {
    if (users === null) {
      loadSharedUsers();
    }
  }, []);

  return (
    <Container>
      {users === null ? (
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          {users.map((user: User) => (
            <div style={{ marginBottom: '0.5rem' }}>{user.username}</div>
          ))}
        </div>
      )}
    </Container>
  );
};
