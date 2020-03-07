import React from 'react';
import { BoardList } from './BoardList';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import ActionButton from './ActionButton';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { sort } from '../../actions';

type Props = {
  lists: any;
  dispatch?: any;
};

class Main extends React.Component<Props> {
  onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // item not dropped anywhere
    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

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

export default connect(mapStateToProps)(Main);
