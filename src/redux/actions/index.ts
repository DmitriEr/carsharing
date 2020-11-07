import { CHANGE_USER_CITY } from '../type';
// import { ActionType } from '../../interfaces/redux';

export function changeUserCity(item: string) {
  return {
    type: CHANGE_USER_CITY,
    payload: item,
  };
}
