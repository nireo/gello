import { CONSTANTS } from '../../actions';

let listID = 4;
let itemID = 5;

const initialState = [
  {
    title: 'List 1',
    uuid: `list-${1}`,
    items: [
      {
        uuid: `card-${1}`,
        content: 'Create a good board 1'
      },
      {
        uuid: `card-${2}`,
        content: 'Create a good board 2'
      }
    ]
  },
  {
    title: 'List 2',
    uuid: `list-${2}`,
    items: [
      {
        uuid: `card-${3}`,
        content: 'Create a good board 3'
      },
      {
        uuid: `card-${4}`,
        content: 'Create a good board 4'
      }
    ]
  }
];

const reducer = (state: any = initialState, action: any) => {
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
        draggableId
      } = action.payload;

      const newState2 = [...state];

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list: any) => droppableIdStart === list.uuid);
        const item = list.items.splice(droppableIndexStart, 1);
        list.items.splice(droppableIndexEnd, 0, ...item);
      }

      return newState2;

    default:
      return state;
  }
};

export default reducer;
