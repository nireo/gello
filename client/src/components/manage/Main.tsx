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
import Card from '@material-ui/core/Card';
import CarContent from '@material-ui/core/CardContent';
import CardContent from '@material-ui/core/CardContent';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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

  return (
    <Container maxWidth="lg">
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
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {boards.map((board: Board) => (
              <Card
                style={{
                  height: '80px',
                  marginRight: '1rem',
                  border: 'none'
                }}
              >
                <div style={{ paddingLeft: '0.5rem', paddingRight: '4rem' }}>
                  <h4 style={{ margin: 0, padding: 0 }}>{board.title}</h4>
                  <Icon>
                    <StarBorderIcon />
                  </Icon>
                </div>
              </Card>
            ))}
            <button
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              <div className="create-board-button">
                <p style={{ marginLeft: '1rem', marginRight: '1rem' }}>
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
  boards: state.boards
});

export default connect(mapStateToProps)(ManageMain);
