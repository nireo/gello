import React from 'react';
import { Board } from './components/board/Main';
import { Navbar } from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ManageMain } from './components/manage/Main';
import { Register } from './components/user/Register';
import BoardMain from './components/board2/Main';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route
          path="/board"
          exact
          render={() => <Board id="b0cca1a3-44e2-4b1d-85ab-b7ffd50d0501" />}
        />
        <Route path="/manage" exact render={() => <ManageMain />} />
        <Route path="/register" exact render={() => <Register />} />
        <Route path="/board2" exact render={() => <BoardMain />} />
      </Switch>
    </Router>
  );
};

export default App;
