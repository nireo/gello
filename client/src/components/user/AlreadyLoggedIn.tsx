import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export const AlreadyLoggedIn: React.FC = () => {
  return (
    <Container style={{ marginTop: '5rem' }}>
      <Typography variant="h3">You've already logged in.</Typography>
      <Link to="/home">Go to homepage</Link>
    </Container>
  );
};
