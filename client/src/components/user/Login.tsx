import React, { useState, ChangeEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { loginAction } from '../../actions';
import { User, LoginInterface } from '../../interfaces/User';
import { Redirect, Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#0079b9',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

    root: {
      '& label.Mui-focused': {
        color: '#0079b9',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#0079b9',
      },
    },
  })
);

type Props = {
  user: User | null;
  loginAction: (credentials: LoginInterface) => void;
};

const Login: React.FC<Props> = ({ user, loginAction }) => {
  const classes = useStyles();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (user !== null) {
    return <Redirect to="/home" />;
  }

  const login = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginObject: LoginInterface = { username, password };
    loginAction(loginObject);
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
          <TextField
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            autoComplete="username"
            className={classes.root}
          />
          <TextField
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="current-password"
            className={classes.root}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ color: 'white', backgroundColor: '#0079b9' }}
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                to="/register"
                style={{ color: '#0079b9', textDecoration: 'none' }}
              >
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loginAction })(Login);
