import {
  CHANGE_USER_CITY,
  CHANGE_POINT,
  CHANGE_MODEL,
  CHANGE_COLOR,
  CHANGE_TIME,
  CHANGE_PRICE,
  CHANGE_OPTION,
  CALCULATE_PRICE,
} from '../type';
import {
  GenericActionOrder,
  GenericActionString,
  OrderType,
} from '../../interfaces';

export function changeUserCity(item: string): GenericActionString {
  return {
    type: CHANGE_USER_CITY,
    payload: item,
  };
}

export function changePoint(item: string): GenericActionString {
  return {
    type: CHANGE_POINT,
    payload: item,
  };
}

export function changeModel(item: OrderType): GenericActionOrder {
  return {
    type: CHANGE_MODEL,
    payload: item,
  };
}

export function changeColor(item: string): GenericActionString {
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

type SelectType = { value: string; visible: boolean };

export function changeOption(
  item: SelectType
): { type: string; payload: SelectType } {
  return {
    type: CHANGE_OPTION,
    payload: item,
  };
}

export function calculatPrice(item: number): { type: string; payload: number } {
  return {
    type: CALCULATE_PRICE,
    payload: item,
  };
}
