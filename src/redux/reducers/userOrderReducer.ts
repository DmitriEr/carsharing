import { initState } from '../../constants/redux';
import {
  CHANGE_POINT,
  CHANGE_MODEL,
  CHANGE_COLOR,
  CHANGE_TIME,
  CHANGE_PRICE,
  CHANGE_OPTION,
  CLEAR_ORDER,
} from '../../redux/type';
import { OrderType } from '../../interfaces';
import { GenericActionOrder } from '../../interfaces';

const currentState = {
  orderList: initState,
};

export const userOrderReducer = (
  state: { orderList: OrderType[] } = currentState,
  action: GenericActionOrder
) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_POINT:
      return {
        orderList: state.orderList.map((item, index) => {
          const { value, cityId, pointId } = payload;
          return index === 0 ? { ...item, value, cityId, pointId } : item;
        }),
      };
    case CHANGE_MODEL:
      return {
        orderList: state.orderList.map((item, index) => {
          const { value, min, max, number, pathImg, time, carId } = payload;
          return index === 1
            ? { ...item, value, min, max, number, pathImg, time, carId }
            : item;
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
          const { value, count, start, end } = payload;
          return index === 3 ? { ...item, value, count, start, end } : item;
        }),
      };
    case CHANGE_PRICE:
      return {
        orderList: state.orderList.map((item, index) => {
          const { value, count, rateId } = payload;
          return index === 4 ? { ...item, value, count, rateId } : item;
        }),
      };
    case CHANGE_OPTION:
      return {
        orderList: state.orderList.map((item, index) => {
          const { ind, visible } = payload;
          return index === ind ? { ...item, visible } : item;
        }),
      };
    case CLEAR_ORDER:
      return { orderList: payload };
    default:
      return state;
  }
};
