import React, { useState, ChangeEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { loginAction } from '../../actions';
import { User, LoginInterface } from '../../interfaces/User';
import { AlreadyLoggedIn } from './AlreadyLoggedIn';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#0079b9'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },

  root: {
    '& label.Mui-focused': {
      color: '#0079b9'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#0079b9'
    }
  }
}));

type Props = {
  user: User | null;
  loginAction: (credentials: LoginInterface) => void;
};

const Login: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (props.user !== null) {
    return <AlreadyLoggedIn />;
  }

  const login = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginObject: LoginInterface = { username, password };
    props.loginAction(loginObject);
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
              <Link href="#" variant="body2" style={{ color: '#0079b9' }}>
                {`Don't have an account? Register`}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user
});

export default connect(mapStateToProps, { loginAction })(Login);
