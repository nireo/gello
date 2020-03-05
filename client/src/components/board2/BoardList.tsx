import React from 'react';
import { BoardCard } from './BoardCard';

type Props = {
  title: string;
};

export const BoardList: React.FC<Props> = ({ title }) => {
  return (
    <div style={styles.container}>
      <h4>{title}</h4>
      <BoardCard />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ccc',
    borderRadius: 3,
    width: 300
  }
};
