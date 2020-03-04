import { createStore, combineReducers } from 'redux';
import userReducer from './user/index';
import boardReducer from './boards/index';

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardReducer
});

const store = createStore(rootReducer);
export type AppState = ReturnType<typeof rootReducer>;
export default store;
