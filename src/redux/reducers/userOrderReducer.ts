import { initState } from '../../constants/redux';
import { CHANGE_POINT, CHANGE_MODEL } from '../../redux/type';
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
          return index === 1 ? { ...item, value: payload } : item;
        }),
      };
    default:
      return state;
  }
};
