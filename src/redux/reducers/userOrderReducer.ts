import { initState } from '../../constants/redux';
import { CommonType } from '../../interfaces/redux';
import { CHANGE_POINT } from '../../redux/type';

const currentState = {
  orderList: initState,
};

export const userOrderReducer = (state = currentState, action: CommonType) => {
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
