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
  cityId?: string;
  pointId?: string;
  carId?: string;
  rateId?: string;
  start?: number;
  end?: number;
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
  auth: { [x: string]: boolean };
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

export type TypeAuth = { admin: boolean; auth: string | boolean };

export type GenericBoolean = {
  type: string;
  payload: TypeAuth;
};

export interface NumberForms {
  current: number;
  active: number;
}

export interface DiffTimeProps {
  start: number;
  end: number;
}

export type pointInfo = { value?: string; cityId?: string; pointId?: string };

export type GenericActionPoint = {
  type: string;
  payload: pointInfo;
};

export type StatusType = { active: number; current: number };

type TypeCommomTable = { name: string; id: string };
export interface DataItem {
  categoryId?: { name: string };
  car?: TypeCommomTable;
  carId?: { name: string; thumbnail: { path: string }; id: string };
  description?: string;
  id?: string;
  name?: string;
  priceMin?: number;
  priceMax?: number;
  thumbnail?: { path: string };
  colors?: string[];
  number?: string | number;
  price?: number;
  rateTypeId?: { unit: string; name: string };
  cityId?: { name?: string; id?: string };
  city?: TypeCommomTable;
  pointId?: { name: string; id: string; address: string };
  point?: TypeCommomTable;
  address?: string;
  orderStatusId?: { name: string; id: string };
  rateId?: { rateTypeId: { name: string } };
  orderStatus?: TypeCommomTable;
  isFullTank?: boolean;
  isNeedChildChair?: boolean;
  isRightWheel?: boolean;
  color?: string;
  dateFrom?: number;
  dateTo?: number;
  page?: string;
  key?: number;
}
export interface Data {
  count: number;
  data: DataItem[];
}
