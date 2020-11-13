import { CHANGE_USER_CITY, CHANGE_POINT, CHANGE_PAGE } from '../type';

export function changeUserCity(
  item: string
): { type: string; payload: string } {
  return {
    type: CHANGE_USER_CITY,
    payload: item,
  };
}

export function changePoint(item: string): { type: string; payload: string } {
  return {
    type: CHANGE_POINT,
    payload: item,
  };
}

export function changePage(item: string): { type: string; payload: string } {
  return {
    type: CHANGE_PAGE,
    payload: item,
  };
}
