import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { AppState } from '../../store';

const Settings: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4">Settings</Typography>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Settings);
