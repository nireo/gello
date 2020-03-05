import React from 'react';
import { BoardList } from './BoardList';
import { connect } from 'react-redux';
import { AppState } from '../../store';

type Props = {
  lists: any;
};

const Main: React.FC<Props> = ({ lists }) => {
  return (
    <div>
      <h2>Board title</h2>
      <div style={{ marginRight: 8, flexDirection: 'row', display: 'flex' }}>
        {lists.map((list: any) => (
          <BoardList title={list.title} items={list.items} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  lists: state.lists
});

export default connect(mapStateToProps, {})(Main);
