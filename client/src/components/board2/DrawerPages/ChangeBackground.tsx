import React from 'react';
import Container from '@material-ui/core/Container';

const ChangeBackground: React.FC = () => {
  return (
    <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button className="color-preview color-blue"></button>
      <button className="color-preview color-red"></button>
      <button className="color-preview color-orange"></button>
      <button className="color-preview color-green"></button>
    </Container>
  );
};

export default ChangeBackground;
