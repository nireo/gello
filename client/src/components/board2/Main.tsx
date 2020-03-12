import React from 'react';
import { BoardList } from './BoardList';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import ActionButton from './ActionButton';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { sort, initListData } from '../../actions';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    }
  });
});

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
    loaded: false,
    open: false
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

  componentDidMount(): void {
    if (this.state.loaded === false) {
      this.props.dispatch(initListData(this.props.id));
    }
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { lists } = this.props;
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div>
            <div style={{ display: 'flex' }}>
              <h2>Board title</h2>
              <div style={{ float: 'right' }}>
                <button onClick={this.handleOpen}>Open drawer</button>
              </div>
            </div>
            <Droppable
              droppableId="all-lists"
              direction="horizontal"
              type="list"
            >
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
                  <ActionButton boardID={this.props.id} />
                </ListContainer>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        <Drawer
          style={{ width: 300, flexShrink: 0 }}
          variant="persistent"
          anchor="right"
          open={this.state.open}
        >
          <div>Hello from drawer</div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  lists: state.lists
});

export default connect(mapStateToProps)(Main);
