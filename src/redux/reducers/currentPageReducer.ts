import { CHANGE_PAGE } from '../type';
import { UserCityType } from '../../interfaces/redux';

const currentState = 'main';

export const currentPageReducer = (
  state = currentState,
  action: UserCityType
) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_PAGE:
      return payload;
    default:
      return state;
  }
};
