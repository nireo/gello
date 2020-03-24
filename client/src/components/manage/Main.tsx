import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { initBoards } from '../../actions';
import { Board } from '../../interfaces/Board';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateBoard from './CreateBoard';
import { User } from '../../interfaces/User';

type Props = {
  dispatch: any;
  boards: Board[];
  user: User | null;
};

const ManageMain: React.FC<Props> = ({ boards, dispatch, user }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (!loaded && boards.length === 0) {
      dispatch(initBoards());
      setLoaded(false);
    }
  }, []);

  console.log(user);
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
              <li style={{ listStyle: 'none ' }}>
                <Link to="/home" className="nav-link">
                  <Icon style={{ marginRight: '0.5rem' }}>
                    <DashboardIcon />
                  </Icon>
                  {'  '}
                  <strong>Boards</strong>
                </Link>
              </li>
            </ul>
          </nav>
        </Grid>
        <Grid item xs={9}>
          <div style={{ display: 'flex' }}>
            <Icon style={{ paddingTop: '1.052rem' }}>
              <PermIdentityOutlinedIcon />
            </Icon>
            <h3>Personal boards</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {boards.map((board: Board) => (
              <Link
                to={`/board/${board.uuid}`}
                style={{
                  textDecoration: 'none',
                  margin: '3px'
                }}
              >
                <div
                  className={`board-button color-${board.color}`}
                  style={{
                    color: 'white'
                  }}
                >
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <div
                      style={{
                        height: '80px',
                        marginRight: '1rem',
                        border: 'none'
                      }}
                    >
                      <div
                        style={{
                          paddingLeft: '0.5rem',
                          paddingRight: '4rem',
                          display: 'flex'
                        }}
                      >
                        <h3
                          style={{
                            marginTop: '5px',
                            padding: 0,
                            color: 'white'
                          }}
                        >
                          {board.title}
                        </h3>
                        {'   '}
                      </div>
                    </div>
                  </button>
                </div>
              </Link>
            ))}
            <button
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
              onClick={() => setOpen(true)}
            >
              <div className="create-board-button">
                <p
                  style={{
                    marginLeft: '1rem',
                    marginRight: '1rem'
                  }}
                >
                  Create new board
                </p>
              </div>
            </button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  boards: state.boards,
  user: state.user
});

export default connect(mapStateToProps)(ManageMain);
