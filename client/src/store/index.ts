import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/index';
import boardReducer from './boards/index';
import listReducer from './lists/index';
import activeReducer from './currentBoard/index';
import templateReducer from './templates/index';

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardReducer,
  lists: listReducer,
  active: activeReducer,
  templates: templateReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppState = ReturnType<typeof rootReducer>;
export default store;
