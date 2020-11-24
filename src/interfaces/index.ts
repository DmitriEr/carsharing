import { RouterState } from 'connected-react-router';

export interface OrderType {
  name: string;
  value: string;
  orderNumber: number;
  count?: number;
}
export interface RootReducer {
  information: {
    userCity: string;
  };
  order: {
    orderList: OrderType[];
  };
  page: string;
  router: RouterState;
}
export interface GenericAction {
  type: string;
  payload: { value: string; count: number };
}

export interface NumberForms {
  current: number;
  active: number;
}

export interface DiffTimeProps {
  start: number;
  end: number;
}
