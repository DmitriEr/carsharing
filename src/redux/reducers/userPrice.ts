import { CALCULATE_PRICE } from '../type';

const currentState = 0;

export const userPrice = (
  state: number = currentState,
  action: { type: string; payload: number }
) => {
  const { type, payload } = action;
  switch (type) {
    case CALCULATE_PRICE:
      return payload;
    default:
      return state;
  }
};
