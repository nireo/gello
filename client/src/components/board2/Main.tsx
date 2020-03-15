import React from 'react';
import { BoardList } from './BoardList';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import ActionButton from './ActionButton';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { sort, initListData } from '../../actions';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import { Theme, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DrawerContent } from './Drawer';
import { setActiveBoard } from '../../actions';
import { getSingleBoard } from '../../services/board';

const drawerWidth = 339;

const stylesMaterial = (theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  }
});

const ListContainer = styled.div`
  display: flex;
  flex-direction: 'row';
`;

type Props = {
  lists: any;
  dispatch?: any;
  id: string;
  classes: any;
  active: any;
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
      getSingleBoard(this.props.id).then((response: any) => {
        this.props.dispatch(setActiveBoard(response.board));
      });
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
    const { lists, active } = this.props;
    const { classes } = this.props;

    if (active === null) {
      return null;
    }

    return (
      <div
        style={{ display: 'flex', height: '100vh' }}
        className={`color-${active.color}`}
      >
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div>
            <div style={{ display: 'flex' }}>
              <h2 style={{ color: 'white' }}>{active.title}</h2>
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
                  className={`color=${active.color}`}
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
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex' }}>
              <h4 style={{ paddingLeft: '10px' }}>Menu</h4>
              <div style={{ paddingLeft: '14rem' }}>
                <IconButton onClick={this.handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <DrawerContent />
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  lists: state.lists,
  active: state.active
});

export default connect(mapStateToProps)(withStyles(stylesMaterial)(Main));
