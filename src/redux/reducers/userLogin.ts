import { LOGIN } from '../type';
import { GenericBoolean } from '../../interfaces';

const currentState = {
  isAdmin: false,
  isAuth: false,
};

export const userLogin = (
  state: { [x: string]: boolean } = currentState,
  action: GenericBoolean
) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return { isAdmin: payload.admin, isAuth: payload.auth };
    default:
      return state;
  }
};
