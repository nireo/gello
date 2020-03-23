import React, { useState, ChangeEvent, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { registerAction } from '../../actions';
import { RegisterInterface, User } from '../../interfaces/User';
import { AlreadyLoggedIn } from './AlreadyLoggedIn';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

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
  registerAction: (credentials: RegisterInterface) => void;
  user: User | null;
};

const Register: React.FC<Props> = props => {
  const classes = useStyles(props);
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [startedPassword, setStartedPassword] = useState<boolean>(false);
  const query = useQuery();

  useEffect(() => {
    if (query.has('email') && email === '' && !loaded) {
      const emailQuery = query.get('email');
      if (emailQuery) {
        setEmail(emailQuery);
        setLoaded(true);
      }
    }
  }, [email, loaded, query]);

  if (props.user !== null) {
    return <AlreadyLoggedIn />;
  }

  const register = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registerObject: RegisterInterface = { email, username, password };
    props.registerAction(registerObject);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
    if (startedPassword === false) {
      setStartedPassword(true);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={register}>
          <TextField
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            margin="normal"
            required
            fullWidth
            variant="filled"
            label="Email"
            name="Email"
            autoComplete="email"
            className={classes.root}
          />
          <TextField
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            margin="normal"
            required
            variant="filled"
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            className={classes.root}
          />
          <TextField
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            required
            fullWidth
            variant="filled"
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
            Register
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/login" style={{ color: '#0079b9' }}>
                {'Already have an account? Login'}
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

export default connect(mapStateToProps, { registerAction })(Register);
