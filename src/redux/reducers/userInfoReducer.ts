import { CHANGE_USER_CITY } from '../type';
import { UserCityType } from '../../interfaces/redux';

const currentState = {
  userCity: '',
};

export const userInfoReducer: (
  state: {
    userCity: string;
  },
  action: UserCityType
) => { userCity: string } = (state = currentState, action: UserCityType) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_USER_CITY:
      return { ...state, userCity: payload };
    default:
      return state;
  }
};
