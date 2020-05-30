import React, { Dispatch, SetStateAction } from 'react';
import { Board } from '../../interfaces/Board';
import Icon from '@material-ui/core/Icon';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

type Props = {
  boards: Board[];
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Boards: React.FC<Props> = ({ boards, setOpen }) => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Icon style={{ paddingTop: '1.052rem' }}>
          <PermIdentityOutlinedIcon />
        </Icon>
        <h3>Personal boards</h3>
        <IconButton
          onClick={() => setOpen(true)}
          style={{ marginLeft: '1rem' }}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Divider style={{ marginBottom: '1rem' }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {boards.map((board: Board) => (
          <Link
            to={`/board/${board.uuid}`}
            style={{
              textDecoration: 'none',
              margin: '3px',
            }}
          >
            <div
              className={`board-button color-${board.color}`}
              style={{
                color: 'white',
              }}
            >
              <button
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    height: '80px',
                    marginRight: '1rem',
                    border: 'none',
                  }}
                >
                  <div
                    style={{
                      paddingLeft: '0.5rem',
                      paddingRight: '4rem',
                      display: 'flex',
                    }}
                  >
                    <h3
                      style={{
                        marginTop: '5px',
                        padding: 0,
                        color: 'white',
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
      </div>
    </div>
  );
};
