import React from 'react';
import { Board } from './components/board/Main';
import { Navbar } from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ManageMain } from './components/manage/Main';
import { Register } from './components/user/Register';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/board" exact render={() => <Board />} />
        <Route path="/manage" exact render={() => <ManageMain />} />
        <Route path="/register" exact render={() => <Register />} />
      </Switch>
    </Router>
  );
};

export default App;
