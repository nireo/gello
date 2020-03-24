import React, { useState } from 'react';
import { BoardCard } from './BoardCard';
import ActionButton from './ActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { deleteList } from '../../actions';

const ListContainer = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  width: 300px;
  padding: 9px;
  margin-right: 8px;
  height: '100%';
`;

type Props = {
  title: string;
  items: any;
  id: string;
  index: number;
  deleteList: (listID: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  })
);

const BoardList: React.FC<Props> = ({
  title,
  items,
  id,
  index,
  deleteList
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const componentId = open ? 'menu-popover' : undefined;

  const handleListDeletion = () => {
    deleteList(id);
  };

  return (
    <div>
      <Draggable draggableId={String(id)} index={index}>
        {provided => (
          <ListContainer
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <Droppable droppableId={String(id)}>
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div style={{ display: 'flex' }}>
                    <h4>{title}</h4>
                    <IconButton
                      style={{ marginLeft: 'auto' }}
                      size="small"
                      disableFocusRipple={true}
                      aria-descripedby={id}
                      onClick={handleClick}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </div>
                  <Popover
                    id={componentId}
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                  >
                    <div>
                      <List
                        component="nav"
                        aria-labelledby="list-menu"
                        subheader={
                          <ListSubheader component="div">
                            List actions
                          </ListSubheader>
                        }
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
                  </Popover>
                  {items.map((item: any, index: number) => (
                    <BoardCard
                      key={item.uuid}
                      index={index}
                      text={item.content}
                      id={item.uuid}
                    />
                  ))}
                  <ActionButton listID={id} list={true} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </ListContainer>
        )}
      </Draggable>
    </div>
  );
};

export default connect(null, { deleteList })(BoardList);
