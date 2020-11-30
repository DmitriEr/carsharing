import { RootReducer } from '../../interfaces';

export const place = (state: RootReducer) => state.information.userCity;
export const page = (state: RootReducer) => state.router.location.pathname;
export const list = (state: RootReducer) => state.order.orderList;
export const info = (state: RootReducer) => state.information;
