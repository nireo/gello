import React, { useState } from 'react';
import AboutBoard from './DrawerPages/AboutBoard';
import ChangeBackground from './DrawerPages/ChangeBackground';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import BoardActions from './DrawerPages/BoardActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
            textAlign: 'center',
          }}
        >
          Menu
        </h4>
        <div
          style={{
            paddingLeft: `${page === '' ? '14' : '10'}rem`,
            display: 'inline-block',
          }}
        >
          <IconButton onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {page === '' && (
        <div>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem button onClick={() => setPage('about')}>
              <ListItemText primary="About this board" />
            </ListItem>
            <ListItem button onClick={() => setPage('color')}>
              <ListItemText primary="Change board color" />
            </ListItem>
            <ListItem button onClick={() => setPage('actions')}>
              <ListItemText primary="Board actions" />
            </ListItem>
          </List>
        </div>
      )}
      {page === 'about' && <AboutBoard title="Board title" description="" />}
      {page === 'color' && <ChangeBackground />}
      {page === 'actions' && <BoardActions id={id} />}
    </div>
  );
};
