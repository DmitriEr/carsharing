import { CHANGE_USER_CITY } from '../type';
import { GenericAction } from '../../interfaces';

type InfoState = { userCity: string };

const currentState: InfoState = {
  userCity: '',
};

export const userInfoReducer = (
  state: InfoState = currentState,
  action: GenericAction
) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_USER_CITY:
      return { ...state, userCity: payload };
    default:
      return state;
  }
};
