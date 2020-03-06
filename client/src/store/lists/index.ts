import { CONSTANTS } from '../../actions';

let listID = 3;

const initialState = [
  {
    title: 'List 1',
    uuid: 0,
    items: [
      {
        uuid: '123',
        content: 'Create a good board'
      },
      {
        uuid: '1234',
        content: 'Create a good board'
      }
    ]
  },
  {
    title: 'List 2',
    uuid: 0,
    items: [
      {
        uuid: '123',
        content: 'Create a good board'
      },
      {
        uuid: '1234',
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
        id: listID
      };

      listID += 1;
      return [...state, newList];
    default:
      return state;
  }
};

export default reducer;
