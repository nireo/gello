import React, { useState, ChangeEvent } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { deleteBoard } from '../../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

type Props = {
  id: string;
  deleteBoard: (id: string) => void;
};

const BoardActions: React.FC<Props> = ({ id, deleteBoard }) => {
  const [newUser, setNewUser] = useState<string>('');
  const handleBoardDeletion = () => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      deleteBoard(id);
      return <Redirect to="/home" />;
    }
  };

  const addNewUserToBoard = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container>
      <div style={{ marginBottom: '3rem' }}>
        <Typography variant="h6">Delete board</Typography>
        <Typography>This action can't be reversed.</Typography>
        <Button onClick={handleBoardDeletion} variant="contained">
          Delete
        </Button>
      </div>
      <div>
        <Typography variant="h6">Share board</Typography>
        <Typography>
          You can share this board to other users. So that you can collaborate
          on it.
        </Typography>
        <form onSubmit={addNewUserToBoard}>
          <TextField
            value={newUser}
            onChange={({ target }) => setNewUser(target.value)}
            placeholder="Username"
          />
          <Button variant="contained" style={{ marginTop: '1rem' }}>
            Add user
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default connect(null, { deleteBoard })(BoardActions);
