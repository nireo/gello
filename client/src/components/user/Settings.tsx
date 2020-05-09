import React, { useState, ChangeEvent } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { removeUserAction } from '../../actions';
import TextField from '@material-ui/core/TextField';
import { User, UpdateUser } from '../../interfaces/User';
import { updateUser } from '../../services/user';

type Props = {
  removeUserAction: () => void;
  user: User | null;
};

const Settings: React.FC<Props> = ({ removeUserAction, user }) => {
  const [newEmail, setNewEmail] = useState<string>('');
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>('');
  const [showUsernameForm, setShowUsernameForm] = useState<boolean>(false);

  if (user === null) {
    return null;
  }

  const removeAccount = () => {
    if (
      window.confirm('Are you sure you want to delete all your information?')
    ) {
      removeUserAction();
      localStorage.clear();
    }
  };

  const updateEmail = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newInformation: UpdateUser = {
      email: newEmail,
      username: user.email,
    };

    updateUser(newInformation);
  };

  const updateUsername = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newInformation: UpdateUser = {
      email: user.email,
      username: newUsername,
    };

    updateUser(newInformation);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={{ marginTop: '4rem' }}>
        Settings
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Here you can configure your gello settings.
      </Typography>
      <Divider style={{ marginBottom: '2rem', marginTop: '2rem' }} />
      <div>
        <Typography variant="h5">Delete your information</Typography>
        <Typography variant="body1" color="textSecondary">
          Delete all the information we have about you. You will lose your
          templates, boards and this account.
        </Typography>
        <Button
          variant="contained"
          onClick={() => removeAccount()}
          style={{ marginTop: '1rem' }}
        >
          Delete account
        </Button>
      </div>
      <Divider style={{ marginBottom: '2rem', marginTop: '2rem' }} />
      <div>
        <Typography variant="h5">Change your email</Typography>
        <Typography variant="body1" color="textSecondary">
          Update your email address so that we can send messages to the right
          person.
        </Typography>
        {showEmailForm ? (
          <form onSubmit={updateEmail} style={{ marginTop: '1rem' }}>
            <TextField
              value={newEmail}
              onChange={({ target }) => setNewEmail(target.value)}
              placeholder="New email"
              label="New email"
              type="email"
              style={{ width: '100%' }}
            />
            <div style={{ marginTop: '1rem' }}>
              <Button variant="contained" type="submit">
                Update
              </Button>
              <Button
                variant="contained"
                onClick={() => setShowEmailForm(false)}
                style={{ marginLeft: '0.5rem' }}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button
            variant="contained"
            style={{ marginTop: '1rem' }}
            onClick={() => setShowEmailForm(true)}
          >
            Change email
          </Button>
        )}
      </div>
      <Divider style={{ marginBottom: '2rem', marginTop: '2rem' }} />
      <div>
        <Typography variant="h5">Change your username</Typography>
        <Typography variant="body1" color="textSecondary">
          Update your username
        </Typography>
        {showUsernameForm ? (
          <form onSubmit={updateUsername} style={{ marginTop: '1rem' }}>
            <TextField
              value={newUsername}
              onChange={({ target }) => setNewUsername(target.value)}
              placeholder="New username"
              label="New username"
              style={{ width: '100%' }}
            />
            <div style={{ marginTop: '1rem' }}>
              <Button variant="contained" type="submit">
                Update
              </Button>
              <Button
                variant="contained"
                onClick={() => setShowUsernameForm(false)}
                style={{ marginLeft: '0.5rem' }}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button
            variant="contained"
            style={{ marginTop: '1rem' }}
            onClick={() => setShowUsernameForm(true)}
          >
            Change username
          </Button>
        )}
      </div>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { removeUserAction })(Settings);
