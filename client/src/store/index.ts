import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/index';
import boardReducer from './boards/index';
import listReducer from './lists/index';

const rootReducer = combineReducers({
  user: userReducer,
  boards: boardReducer,
  lists: listReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppState = ReturnType<typeof rootReducer>;
export default store;
