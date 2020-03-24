import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export const Main: React.FC = () => {
  return (
    <div>
      <div className="main-view">
        <Container style={{ paddingTop: '10rem', marginBottom: '7.5rem' }}>
          <Typography variant="h2">
            Gello makes managing tasks easier
          </Typography>
          <div style={{ marginTop: '10rem', marginBottom: '7.5rem' }}>
            <input
              className="welcome-input"
              style={{ fontSize: '20px' }}
              placeholder="Email"
            />
            <button className="welcome-button">Sign up!</button>
          </div>
        </Container>
      </div>
      <Container maxWidth="md" style={{ marginTop: '4rem' }}>
        <Typography variant="h4">Collaborate with others!</Typography>
        <Typography style={{ fontSize: '16px' }}>
          Gello lets you collaborate with other people.
        </Typography>
      </Container>
    </div>
  );
};
