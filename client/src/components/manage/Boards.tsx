import React, { Dispatch, SetStateAction } from 'react';
import { Board } from '../../interfaces/Board';
import Icon from '@material-ui/core/Icon';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import { Link } from 'react-router-dom';

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
      </div>
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
        <button
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setOpen(true)}
        >
          <div className="create-board-button">
            <p
              style={{
                marginLeft: '1rem',
                marginRight: '1rem',
              }}
            >
              Create new board
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
