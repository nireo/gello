import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ManageMain from './components/manage/Main';
import Register from './components/user/Register';
import BoardMain from './components/board2/Main';
import Login from './components/user/Login';
import { Main as WelcomeMain } from './components/welcome/Main';
import { connect } from 'react-redux';
import { AppState } from './store';
import { checkLocalStorage } from './actions';
import { User } from './interfaces/User';
import { PrivateRoute } from './components/user/ProtectedRoute';

type Props = {
  user: User;
  checkLocalStorage: () => void;
};

const App: React.FC<Props> = ({ user, checkLocalStorage }) => {
  useEffect(() => {
    if (!user) {
      checkLocalStorage();
      console.log('hello');
    }
  }, [user, checkLocalStorage]);
  console.log(user);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact render={() => <WelcomeMain />} />
        <PrivateRoute path="/home" exact user={user}>
          <ManageMain />
        </PrivateRoute>
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

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { checkLocalStorage })(App);
