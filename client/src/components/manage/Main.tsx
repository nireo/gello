import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { initBoards } from '../../actions';
import { Board } from '../../interfaces/Board';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import Icon from '@material-ui/core/Icon';

type Props = {
  dispatch: any;
  boards: Board[];
};

const ManageMain: React.FC<Props> = ({ boards, dispatch }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!loaded && boards.length === 0) {
      dispatch(initBoards());
      setLoaded(false);
    }
  }, []);
  console.log(boards);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={3}>
          <h2>Welcome user</h2>
          <button className="button">Create new board</button>
        </Grid>
        <Grid item xs={9}>
          <div style={{ display: 'flex' }}>
            <Icon style={{ paddingTop: '1.052rem' }}>
              <PermIdentityOutlinedIcon />
            </Icon>
            <h3>Personal boards</h3>
          </div>
          {boards.map((board: Board) => (
            <div>{board.title}</div>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  boards: state.boards
});

export default connect(mapStateToProps)(ManageMain);
