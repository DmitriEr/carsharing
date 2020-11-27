import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { userInfoReducer } from '../reducers/userInfoReducer';
import { userOrderReducer } from '../reducers/userOrderReducer';
import { userPrice } from '../reducers/userPrice';

export const createRootReducer = (history: History) =>
  combineReducers({
    information: userInfoReducer,
    order: userOrderReducer,
    price: userPrice,
    router: connectRouter(history),
  });
