import { combineReducers } from 'redux';
import { userInfoReducer } from '../reducers/userInfoReducer';

export const rootReducer = combineReducers({
  information: userInfoReducer,
});
