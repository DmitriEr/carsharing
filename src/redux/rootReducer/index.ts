import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { userInfoReducer } from '../reducers/userInfoReducer';
import { userOrderReducer } from '../reducers/userOrderReducer';
import { currentPageReducer } from '../reducers/currentPageReducer';

export const createRootReducer = (history: History<any>) =>
  combineReducers({
    information: userInfoReducer,
    order: userOrderReducer,
    page: currentPageReducer,
    router: connectRouter(history),
  });
