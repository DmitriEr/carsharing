import { CHANGE_USER_CITY, CHANGE_USER_POINT } from '../type';
import { UserCityType } from '../../interfaces/redux';

const currentState = {
  userCity: '',
  userPoint: '',
};

export const userInfoReducer = (state = currentState, action: UserCityType) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_USER_CITY:
      return { ...state, userCity: payload };
    case CHANGE_USER_POINT:
      return { ...state, userPoint: payload };
    default:
      return state;
  }
};
