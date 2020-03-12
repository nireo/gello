import React from 'react';

export const DrawerContent: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li
            className="nav-link"
            style={{ listStyle: 'none', marginBottom: '8px' }}
          >
            <button className="link-button">About this board</button>
          </li>
          <li
            className="nav-link"
            style={{ listStyle: 'none', marginBottom: '8px' }}
          >
            <button className="link-button">Change board color</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
