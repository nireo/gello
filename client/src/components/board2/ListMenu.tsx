import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { deleteList } from '../../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

type Props = {
  id: string;
  deleteList: (listID: string) => void;
};

const ListMenu: React.FC<Props> = ({ id, deleteList }) => {
  const classes = useStyles();

  const handleListDeletion = () => {
    deleteList(id);
  };

  return (
    <div>
      <List
        component="nav"
        aria-labelledby="list-menu"
        subheader={<ListSubheader component="div">List actions</ListSubheader>}
        className={classes.root}
      >
        <ListItem button style={{ width: '100%' }}>
          <ListItemText primary="Add card..." />
        </ListItem>
        <ListItem button onClick={handleListDeletion}>
          <ListItemText primary="Delete list..." />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Copy list..." />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Move list..." />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Sort by..." />
        </ListItem>
      </List>
    </div>
  );
};

export default connect(null, { deleteList })(ListMenu);
