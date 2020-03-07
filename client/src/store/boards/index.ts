import { CONSTANTS } from '../../actions';
import { Board } from '../../interfaces/Board';

const reducer = (state: Board[] = [], action: any) => {
  switch (action.type) {
    case CONSTANTS.INIT_BOARDS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
