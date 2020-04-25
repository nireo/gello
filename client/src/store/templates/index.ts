import { CONSTANTS } from '../../actions';

const initialState = {
  userTemplates: [],
  templates: [],
};

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case CONSTANTS.GET_TEMPLATES:
      return action.data;
    case CONSTANTS.CREATE_TEMPLATE:
      let newState = state;
      newState.userTemplates = [...newState.userTemplates, action.data];
      newState.templates = [...newState.templates, action.data];

      return newState;
    default:
      return state;
  }
};

export default reducer;
