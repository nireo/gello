import React from 'react';
import { BoardCard } from './BoardCard';
import ActionButton from './ActionButton';
import { Droppable } from 'react-beautiful-dnd';

type Props = {
  title: string;
  items: any;
  id: number;
};

export const BoardList: React.FC<Props> = ({ title, items, id }) => {
  return (
    <Droppable droppableId={String(id)}>
      {provided => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={styles.container}
        >
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
  );
};

const styles = {
  container: {
    backgroundColor: '#dfe3e6',
    borderRadius: 3,
    width: 300,
    padding: 9,
    marginRight: 8,
    height: '100%'
  }
};
