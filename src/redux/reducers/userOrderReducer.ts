import { initState } from '../../constants/redux';
import { CHANGE_POINT } from '../../redux/type';
import { OrderType } from '../../interfaces';

const currentState = {
  orderList: initState,
};

export const userOrderReducer: (
  state: { orderList: OrderType[] },
  action: { type: string; payload: string }
) => { orderList: OrderType[] } = (state = currentState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_POINT:
      return {
        orderList: state.orderList.map((item, index) => {
          return index === 0 ? { ...item, value: payload } : item;
        }),
      };
    default:
      return state;
  }
};
