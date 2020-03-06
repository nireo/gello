import React from 'react';
import { BoardCard } from './BoardCard';
import ActionButton from './ActionButton';

type Props = {
  title: string;
  items: any;
};

export const BoardList: React.FC<Props> = ({ title, items }) => {
  return (
    <div style={styles.container}>
      <h4>{title}</h4>
      {items.map((item: any) => (
        <BoardCard key={item.uuid} text={item.content} />
      ))}
      <ActionButton />
    </div>
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
