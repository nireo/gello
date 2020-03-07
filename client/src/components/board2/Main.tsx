import React from 'react';
import { BoardList } from './BoardList';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import ActionButton from './ActionButton';
import { DragDropContext } from 'react-beautiful-dnd';

type Props = {
  lists: any;
};

class Main extends React.Component<Props> {
  onDragEnd = () => {};

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h2>Board title</h2>
          <div
            style={{ marginRight: 8, flexDirection: 'row', display: 'flex' }}
          >
            {lists.map((list: any) => (
              <BoardList id={list.uuid} title={list.title} items={list.items} />
            ))}
            <ActionButton />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  lists: state.lists
});

export default connect(mapStateToProps, {})(Main);
