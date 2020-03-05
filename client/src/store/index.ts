import { createStore, combineReducers } from 'redux';
import userReducer from './user/index';
import boardReducer from './boards/index';
import listReducer from './lists/index';

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardReducer,
  lists: listReducer
});

const store = createStore(rootReducer);
export type AppState = ReturnType<typeof rootReducer>;
export default store;
