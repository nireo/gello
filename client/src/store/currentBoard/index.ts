import { CONSTANTS } from '../../actions';

const reducer = (state: any = null, action: any) => {
  switch (action.type) {
    case CONSTANTS.SET_NEW_ACTIVE_BOARD:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
