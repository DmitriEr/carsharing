import { combineReducers } from 'redux';
import { userInfoReducer } from '../reducers/userInfoReducer';
import { userOrderReducer } from '../reducers/userOrderReducer';

export const rootReducer = combineReducers({
  information: userInfoReducer,
  order: userOrderReducer,
});
