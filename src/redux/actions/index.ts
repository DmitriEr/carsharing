import { CHANGE_USER_CITY, CHANGE_USER_POINT } from '../type';
// import { ActionType } from '../../interfaces/redux';

export function changeUserCity(item: string) {
  return {
    type: CHANGE_USER_CITY,
    payload: item,
  };
}

export function changeUserPoint(item: string) {
  return {
    type: CHANGE_USER_POINT,
    payload: item,
  };
}
