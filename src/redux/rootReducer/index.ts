import { combineReducers } from 'redux';
import { userInfoReducer } from '../reducers/userInfoReducer';
import { userOrderReducer } from '../reducers/userOrderReducer';
import { currentPageReducer } from '../reducers/currentPageReducer';

export const rootReducer = combineReducers({
  information: userInfoReducer,
  order: userOrderReducer,
  page: currentPageReducer,
});
