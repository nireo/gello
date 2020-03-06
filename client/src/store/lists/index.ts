import { CONSTANTS } from '../../actions';

let listID = 4;
let itemID = 5;

const initialState = [
  {
    title: 'List 1',
    uuid: 0,
    items: [
      {
        uuid: 1,
        content: 'Create a good board'
      },
      {
        uuid: 2,
        content: 'Create a good board'
      }
    ]
  },
  {
    title: 'List 2',
    uuid: 1,
    items: [
      {
        uuid: 3,
        content: 'Create a good board'
      },
      {
        uuid: 4,
        content: 'Create a good board'
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
        uuid: listID
      };

      listID += 1;
      return [...state, newList];
    case CONSTANTS.ADD_ITEM:
      const newCard = {
        content: action.payload.text,
        uuid: itemID
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
    default:
      return state;
  }
};

export default reducer;
