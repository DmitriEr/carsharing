import {
  CHANGE_USER_CITY,
  CHANGE_POINT,
  CHANGE_MODEL,
  CHANGE_COLOR,
  CHANGE_TIME,
  CHANGE_PRICE,
} from '../type';

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

export function changeModel(item: string): { type: string; payload: string } {
  return {
    type: CHANGE_MODEL,
    payload: item,
  };
}

export function changeColor(item: string): { type: string; payload: string } {
  return {
    type: CHANGE_COLOR,
    payload: item,
  };
}

type CommonType = { value: string; count: number };

export function changeTime(
  item: CommonType
): { type: string; payload: CommonType } {
  return {
    type: CHANGE_TIME,
    payload: item,
  };
}

export function changePrice(
  item: CommonType
): { type: string; payload: CommonType } {
  return {
    type: CHANGE_PRICE,
    payload: item,
  };
}
