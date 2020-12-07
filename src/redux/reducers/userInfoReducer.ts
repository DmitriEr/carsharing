import { CHANGE_USER_CITY } from '../type';
import { GenericActionOrder } from '../../interfaces';

type InfoState = { userCity: string };

const currentState: InfoState = {
  userCity: '',
};

export const userInfoReducer = (
  state: InfoState = currentState,
  action: GenericActionOrder
) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_USER_CITY:
      return { ...state, userCity: payload };
    default:
      return state;
  }
};
