import React, { useState } from 'react';
import AboutBoard from './DrawerPages/AboutBoard';
import ChangeBackground from './DrawerPages/ChangeBackground';

export const DrawerContent: React.FC = () => {
  const [page, setPage] = useState<string>('');

  return (
    <div>
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
          </ul>
        </nav>
      )}
      {page === 'about' && (
        <AboutBoard title="Board title" description="You can a" />
      )}
      {page === 'color' && <ChangeBackground />}
    </div>
  );
};
