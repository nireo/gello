import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { removeUserAction } from '../../actions';

type Props = {
  removeUserAction: () => void;
};

const Settings: React.FC<Props> = ({ removeUserAction }) => {
  const removeAccount = () => {
    if (
      window.confirm('Are you sure you want to delete all your information?')
    ) {
      removeUserAction();
      localStorage.clear();
    }
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
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, { removeUserAction })(Settings);
