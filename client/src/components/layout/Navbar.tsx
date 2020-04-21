import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { User } from '../../interfaces/User';
import Button from '@material-ui/core/Button';
import { logoutAction } from '../../actions';

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: 'black',
    textDecoration: 'none',
  },
}));

type Props = {
  user: User | null;
  logoutAction: () => void;
};

const Navbar: React.FC<Props> = (props) => {
  const classes = useStyles(props);

  const handleLogout = () => {
    props.logoutAction();
    console.log('hello');
    return <Redirect to="/" />;
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          gello
        </Typography>
        <nav>
          {props.user !== null && (
            <Link to="/home" className={classes.link}>
              Home
            </Link>
          )}
          {props.user === null && (
            <Link to="/login" className={classes.link}>
              Login
            </Link>
          )}
          {props.user !== null && (
            <Link to="/settings" className={classes.link}>
              Settings
            </Link>
          )}
          {props.user !== null && (
            <Button
              variant="contained"
              style={{ color: 'white', backgroundColor: '#0079b9' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutAction })(Navbar);
