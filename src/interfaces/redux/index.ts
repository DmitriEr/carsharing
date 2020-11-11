export interface UserCityType {
  type: string;
  payload: string;
}

export interface OrderType {
  name: string;
  value: string;
  orderNumber: number;
}

export interface RootReducer {
  information: {
    userCity: string;
  };
  order: {
    orderList: OrderType[];
  };
}

export interface CommonType {
  type: string;
  payload: string;
}
