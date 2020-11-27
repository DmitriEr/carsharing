import { initState } from '../../constants/redux';
import {
  CHANGE_POINT,
  CHANGE_MODEL,
  CHANGE_COLOR,
  CHANGE_TIME,
  CHANGE_PRICE,
  CHANGE_OPTION,
} from '../../redux/type';
import { OrderType } from '../../interfaces';
import { GenericAction } from '../../interfaces';

const currentState = {
  orderList: initState,
};

export const userOrderReducer = (
  state: { orderList: OrderType[] } = currentState,
  action: GenericAction
) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_POINT:
      return {
        orderList: state.orderList.map((item, index) => {
          return index === 0 ? { ...item, value: payload } : item;
        }),
      };
    case CHANGE_MODEL:
      return {
        orderList: state.orderList.map((item, index) => {
          const { value, min, max } = payload;
          return index === 1 ? { ...item, value, min, max } : item;
        }),
      };
    case CHANGE_COLOR:
      return {
        orderList: state.orderList.map((item, index) => {
          return index === 2 ? { ...item, value: payload } : item;
        }),
      };
    case CHANGE_TIME:
      return {
        orderList: state.orderList.map((item, index) => {
          return index === 3
            ? { ...item, value: payload.value, count: payload.count }
            : item;
        }),
      };
    case CHANGE_PRICE:
      return {
        orderList: state.orderList.map((item, index) => {
          return index === 4
            ? { ...item, value: payload.value, count: payload.count }
            : item;
        }),
      };
    case CHANGE_OPTION:
      return {
        orderList: state.orderList.map((item, index) => {
          return index >= 5 && item.name === payload.value
            ? { ...item, visible: payload.visibility }
            : item;
        }),
      };
    default:
      return state;
  }
};
