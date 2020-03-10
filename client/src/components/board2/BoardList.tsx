import React, { useState } from 'react';
import { BoardCard } from './BoardCard';
import ActionButton from './ActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';

const ListContainer = styled.div`
  background-color: #dfe3e6;
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
};

export const BoardList: React.FC<Props> = ({ title, items, id, index }) => {
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
                  Hello
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
  );
};
