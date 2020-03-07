import React from 'react';
import { BoardCard } from './BoardCard';
import ActionButton from './ActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

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
  id: number;
  index: number;
};

export const BoardList: React.FC<Props> = ({ title, items, id, index }) => {
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
                <h4>{title}</h4>
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
