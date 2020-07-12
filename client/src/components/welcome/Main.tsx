import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Footer } from '../layout/Footer';

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
      <Container maxWidth="lg" style={{ marginTop: '4rem' }}>
        <Typography variant="h4">Collaborate with others!</Typography>
        <Typography style={{ fontSize: '18px' }}>
          Gello makes it easier to add multiple users to a board for
          collaboration. Also different tags can be added to a board so that
          everyone knows what you're doing.
        </Typography>
        <Typography variant="h4" style={{ marginTop: '8rem' }}>
          A productive way of working!
        </Typography>
        <Typography style={{ fontSize: '18px' }}>
          With lots of different settings gello let's you configure your
          experience fully. From different lists to colors; gello let's you edit
          them all!
        </Typography>
        <Typography variant="h4" style={{ marginTop: '8rem' }}>
          Open source
        </Typography>
        <Typography style={{ fontSize: '18px' }}>
          All of gello's source code can be found on{' '}
          <a
            href="https://github.com/nireo/gello"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#0079b9' }}
          >
            github
          </a>
          .
        </Typography>
      </Container>
      <Footer />
    </div>
  );
};
