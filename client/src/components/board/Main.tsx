import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { initialBoardData } from '../../data/board-data';
import { BoardColumn } from './Column';
import axios from 'axios';

const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

type Props = {
  id: string;
};

interface ListItem {
  title: string;
  items: any;
  uuid: string;
}

interface Item {
  UUID: string;
  Content: string;
}

export class Board extends React.Component<Props> {
  state = initialBoardData;
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios
      .get(`/api/board/${this.props.id}`)
      .then((response: any) => {
        this.betterFormatting(response.data);
      })
      .catch(() => {
        console.log('something went wrong');
      });
  }

  betterFormatting(data: any) {
    if (!data) {
      return;
    }

    let dataTemplate: any = {
      items: {},
      columns: {},
      columnsOrder: []
    };

    let lists = data.lists;
    lists.forEach((item: ListItem) => {
      const temp: any = {
        id: item.uuid,
        title: item.title,
        itemsIds: []
      };

      item.items.forEach((item: Item) => {
        dataTemplate.items[item.UUID] = {
          id: item.UUID,
          content: item.Content
        };
        temp.itemsIds = temp.itemsIds.concat(item.UUID);
      });

      dataTemplate.columns[item.uuid] = temp;
      dataTemplate.columnsOrder = dataTemplate.columnsOrder.concat(item.uuid);
    });

    this.setState(dataTemplate);
  }

  onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const columnStart = (this.state.columns as any)[source.droppableId];

    const columnFinish = (this.state.columns as any)[destination.droppableId];

    if (columnStart === columnFinish) {
      // this executes when item is moved in the same column
      const newItemsIds = Array.from(columnStart.itemsIds);

      newItemsIds.splice(source.index, 1);

      newItemsIds.splice(destination.index, 0, draggableId);

      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart
        }
      };

      this.setState(newState);
    } else {
      // this executes when item is moved to a new column
      const newStartItemsIds = Array.from(columnStart.itemsIds);

      newStartItemsIds.splice(source.index, 1);

      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds
      };

      const newFinishItemsIds = Array.from(columnFinish.itemsIds);

      newFinishItemsIds.splice(destination.index, 0, draggableId);

      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      };

      this.setState(newState);
    }
  };

  render() {
    return (
      <BoardEl>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columnsOrder.map(columnId => {
            const column = (this.state.columns as any)[columnId];

            const items = column.itemsIds.map(
              (itemId: string) => (this.state.items as any)[itemId]
            );

            return (
              <BoardColumn key={column.id} column={column} items={items} />
            );
          })}
        </DragDropContext>
      </BoardEl>
    );
  }
}
