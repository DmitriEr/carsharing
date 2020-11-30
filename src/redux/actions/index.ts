import { CHANGE_USER_CITY, CHANGE_POINT, CHANGE_MODEL } from '../type';
import { GenericAction } from '../../interfaces';

export function changeUserCity(item: string): GenericAction {
  return {
    type: CHANGE_USER_CITY,
    payload: item,
  };
}

export function changePoint(item: string): GenericAction {
  return {
    type: CHANGE_POINT,
    payload: item,
  };
}

export function changeModel(item: string): GenericAction {
  return {
    type: CHANGE_MODEL,
    payload: item,
  };
}
