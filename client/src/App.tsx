import React from 'react';
import { Board } from './components/board/Main';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #4bcffa;
  }
`;

const App: React.FC = () => {
  return (
    <div>
      <Board />
      <GlobalStyle />
    </div>
  );
};

export default App;
