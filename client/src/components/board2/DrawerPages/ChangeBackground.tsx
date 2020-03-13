import React from 'react';
import Container from '@material-ui/core/Container';

const ChangeBackground: React.FC = () => {
  return (
    <Container style={{ display: 'flex' }}>
      <div className="color-preview"></div>
      <div className="color-preview"></div>
      <div className="color-preview"></div>
      <div className="color-preview"></div>
    </Container>
  );
};

export default ChangeBackground;
