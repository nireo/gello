import React from 'react';
import { BoardList } from './BoardList';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import ActionButton from './ActionButton';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { sort, initListData } from '../../actions';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: 'row';
`;

type Props = {
  lists: any;
  dispatch?: any;
  id: string;
};

class Main extends React.Component<Props> {
  state = {
    loaded: false
  };
  onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

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
        draggableId,
        type
      )
    );
  };

  componentDidMount() {
    if (this.state.loaded === false) {
      this.props.dispatch(initListData(this.props.id));
    }
  }

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h2>Board title</h2>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <ListContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((list: any, index: number) => (
                  <BoardList
                    id={list.uuid}
                    title={list.title}
                    items={list.items}
                    key={list.uuid}
                    index={index}
                  />
                ))}
                <ActionButton />
              </ListContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  lists: state.lists
});

export default connect(mapStateToProps)(Main);
