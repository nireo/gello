import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { initBoards } from '../../actions';
import { Board } from '../../interfaces/Board';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateBoard from './CreateBoard';
import { User } from '../../interfaces/User';
import { Boards } from './Boards';
import Templates from './Templates';

type Props = {
  dispatch: any;
  boards: Board[];
  user: User | null;
};

const ManageMain: React.FC<Props> = ({ boards, dispatch, user }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    if (!loaded && boards.length === 0) {
      dispatch(initBoards());
      setLoaded(false);
    }
  }, [boards.length, dispatch, loaded]);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '4rem' }}>
      <CreateBoard open={open} closeModal={closeModal} />
      <Grid container>
        <Grid item xs={3}>
          <nav>
            <ul>
              <li style={{ listStyle: 'none ' }} onClick={() => setPage(0)}>
                <Link to="/home" className="nav-link">
                  <Icon style={{ marginRight: '0.5rem' }}>
                    <DashboardIcon />
                  </Icon>
                  {'  '}
                  <strong>Boards</strong>
                </Link>
              </li>
              <li
                style={{ listStyle: 'none', marginTop: '0.3rem' }}
                onClick={() => setPage(1)}
              >
                <Link to="/home" className="nav-link">
                  <Icon style={{ marginRight: '0.5rem' }}>
                    <DashboardIcon />
                  </Icon>
                  {'  '}
                  <strong>Templates</strong>
                </Link>
              </li>
            </ul>
          </nav>
        </Grid>
        <Grid item xs={9}>
          {page === 0 && (
            <div>
              <Boards boards={boards} setOpen={setOpen} />
            </div>
          )}
          {page === 1 && (
            <div>
              <Templates />
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  boards: state.boards,
  user: state.user,
});

export default connect(mapStateToProps)(ManageMain);
