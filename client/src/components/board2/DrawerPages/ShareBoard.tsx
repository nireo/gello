import React, { useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { addUserToBoard } from '../../../services/board';

type Props = {
  id: string;
};

export const ShareBoard: React.FC<Props> = ({ id }) => {
  const [username, setUsername] = useState<string>('');

  const handleShareToUser = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    addUserToBoard(username, id);
  };

  return (
    <Container>
      <form onSubmit={handleShareToUser}>
        <TextField
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Username"
          style={{ marginBottom: '1rem' }}
        />
        <Button variant="contained">Share</Button>
      </form>
    </Container>
  );
};
