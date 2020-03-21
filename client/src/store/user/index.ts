import { User } from '../../interfaces/User';
import { CONSTANTS } from '../../actions';

const reducer = (state: null | User = null, action: any) => {
  switch (action.type) {
    case CONSTANTS.LOGIN:
      return action.data;
    case CONSTANTS.LOGOUT:
      return null;
    default:
      return state;
  }
};

export default reducer;
