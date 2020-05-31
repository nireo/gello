import React, { useState } from 'react';
import { BoardCard } from './BoardCard';
import ActionButton from './ActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import { Item } from '../../interfaces/Item';
import ListMenu from './ListMenu';

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
  setItem: (item: Item) => void;
};

const BoardList: React.FC<Props> = ({ title, items, id, index, setItem }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const componentId = open ? 'menu-popover' : undefined;

  return (
    <div>
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => (
          <ListContainer
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <div style={{ display: 'flex' }}>
              <h4>{title}</h4>
              <IconButton
                style={{ marginLeft: 'auto' }}
                size="small"
                disableFocusRipple={true}
                aria-describedby={id}
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
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <ListMenu id={id} />
            </Popover>
            <Droppable droppableId={String(id)}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((item: any, index: number) => (
                    <BoardCard
                      setItem={setItem}
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

export default BoardList;
