import { CHANGE_USER_CITY } from '../type';

type InfoState = { userCity: string };

const currentState: InfoState = {
  userCity: '',
};

export const userInfoReducer: (
  state: InfoState,
  action: { type: string; payload: string }
) => { userCity: string } = (state = currentState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_USER_CITY:
      return { ...state, userCity: payload };
    default:
      return state;
  }
};
