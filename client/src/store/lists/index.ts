import { CONSTANTS } from '../../actions';
import { updateItem } from '../../services/item';

let listID = 4;
let itemID = 5;

const reducer = (state: any = [], action: any) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        items: [],
        uuid: `list-${listID}`
      };

      listID += 1;
      return [...state, newList];
    case CONSTANTS.ADD_ITEM:
      const newCard = {
        content: action.payload.text,
        uuid: `card-${itemID}`
      };

      itemID += 1;

      const newState = state.map((list: any) => {
        if (list.uuid === action.payload.listID) {
          return {
            ...list,
            items: [...list.items, newCard]
          };
        } else {
          return list;
        }
      });

      return newState;
    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type
      } = action.payload;

      const newState2 = [...state];

      if (type === 'list') {
        const list = newState2.splice(droppableIndexStart, 1);
        newState2.splice(droppableIndexEnd, 0, ...list);
        return newState2;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list: any) => droppableIdStart === list.uuid);
        const item = list.items.splice(droppableIndexStart, 1);
        list.items.splice(droppableIndexEnd, 0, ...item);
      }

      // in to other list
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find(
          (list: any) => droppableIdStart === list.uuid
        );
        const item = listStart.items.splice(droppableIndexStart, 1);
        const listEnd = state.find((list: any) => droppableIdEnd === list.uuid);
        listEnd.items.splice(droppableIndexEnd, 0, ...item);

        // update item to the new list
        updateTheItemList(listEnd, item);
      }

      return newState2;
    case CONSTANTS.LOAD_BOARD_DATA:
      return action.payload;
    case CONSTANTS.CREATE_NEW_LIST:
      return [...state, action.payload];
    case CONSTANTS.CREATE_NEW_ITEM:
      const newState3 = state.map((list: any) => {
        if (list.uuid === action.payload.id) {
          return {
            ...list,
            items: [...list.items, action.payload.data]
          };
        } else {
          return list;
        }
      });
      return newState3;
    case CONSTANTS.REMOVE_LIST:
      const filteredLists = state.filter(
        (list: any) => list.uuid !== action.id
      );
      return filteredLists;
    default:
      return state;
  }
};

const updateTheItemList = (newList: any, item: any) => {
  const updatedItem = {
    content: item[0].content,
    uuid: newList.uuid
  };

  updateItem(updatedItem, item[0].uuid);
};

export default reducer;
