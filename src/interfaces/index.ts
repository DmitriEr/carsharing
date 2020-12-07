import { RouterState } from 'connected-react-router';

export interface OrderType {
  name: string;
  value: string;
  orderNumber: number;
  count?: number;
  visible?: boolean;
  min?: number;
  max?: number;
  number?: string;
  pathImg?: string;
  time?: string;
}
export interface RootReducer {
  information: {
    userCity: string;
  };
  order: {
    orderList: OrderType[];
  };
  page: string;
  price: number;
  router: RouterState;
}

export type GenericActionOrder = {
  type: string;
  payload: OrderType;
};

export type GenericActionString = {
  type: string;
  payload: string;
};
export interface NumberForms {
  current: number;
  active: number;
}

export interface DiffTimeProps {
  start: number;
  end: number;
}
