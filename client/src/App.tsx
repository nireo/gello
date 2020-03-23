import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ManageMain from './components/manage/Main';
import Register from './components/user/Register';
import BoardMain from './components/board2/Main';
import Login from './components/user/Login';
import { Main as WelcomeMain } from './components/welcome/Main';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact render={() => <WelcomeMain />} />
        <Route path="/home" exact render={() => <ManageMain />} />
        <Route path="/register" exact render={() => <Register />} />
        <Route
          path="/board/:id"
          exact
          render={({ match }) => <BoardMain id={match.params.id} />}
        />
        <Route path="/register" exact render={() => <Register />} />
        <Route path="/login" exact render={() => <Login />} />
      </Switch>
    </Router>
  );
};

export default App;
