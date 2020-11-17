import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { userInfoReducer } from '../reducers/userInfoReducer';
import { userOrderReducer } from '../reducers/userOrderReducer';

export const createRootReducer = (history: History) =>
  combineReducers({
    information: userInfoReducer,
    order: userOrderReducer,
    router: connectRouter(history),
  });
