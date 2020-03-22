import React, { useState } from 'react';
import AboutBoard from './DrawerPages/AboutBoard';
import ChangeBackground from './DrawerPages/ChangeBackground';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import BoardActions from './DrawerPages/BoardActions';

type Props = {
  closeDrawer: () => void;
  id: string;
};

export const DrawerContent: React.FC<Props> = ({ closeDrawer, id }) => {
  const [page, setPage] = useState<string>('');

  return (
    <div>
      <div style={{ width: '100%' }}>
        {page !== '' && (
          <div style={{ display: 'inline-block' }}>
            <IconButton onClick={() => setPage('')}>
              <ArrowBackIcon />
            </IconButton>
          </div>
        )}
        <h4
          style={{
            paddingLeft: '10px',
            display: 'inline-block',
            textAlign: 'center'
          }}
        >
          Menu
        </h4>
        <div
          style={{
            paddingLeft: `${page === '' ? '14' : '10'}rem`,
            display: 'inline-block'
          }}
        >
          <IconButton onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {page === '' && (
        <nav>
          <ul>
            <li
              className="nav-link"
              style={{ listStyle: 'none', marginBottom: '8px' }}
            >
              <button onClick={() => setPage('about')} className="link-button">
                About this board
              </button>
            </li>
            <li
              className="nav-link"
              style={{ listStyle: 'none', marginBottom: '8px' }}
            >
              <button onClick={() => setPage('color')} className="link-button">
                Change board color
              </button>
            </li>
            <li
              className="nav-link"
              style={{ listStyle: 'none', marginBottom: '8px' }}
            >
              <button
                onClick={() => setPage('actions')}
                className="link-button"
              >
                Board actions
              </button>
            </li>
          </ul>
        </nav>
      )}
      {page === 'about' && (
        <AboutBoard title="Board title" description="You can a" />
      )}
      {page === 'color' && <ChangeBackground />}
      {page === 'actions' && <BoardActions id={id} />}
    </div>
  );
};
