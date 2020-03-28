import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { deleteBoard } from '../../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

type Props = {
  id: string;
  deleteBoard: (id: string) => void;
};

const BoardActions: React.FC<Props> = ({ id, deleteBoard }) => {
  const handleBoardDeletion = () => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      deleteBoard(id);
      return <Redirect to="/home" />;
    }
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
      </div>
    </Container>
  );
};

export default connect(null, { deleteBoard })(BoardActions);
