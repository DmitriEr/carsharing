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

export type TypeTableAdmin = {
  key?: number;
  number?: number;
  name?: string;
  id: string;
  page: string;
  description?: string;
  car?: string;
  city?: string;
  point?: string;
  dateTo?: number;
  dateFrom?: number;
  isFullTank?: boolean;
  isNeedChildChair?: boolean;
  isRightWheel?: boolean;
  color?: string;
  price?: number;
};

interface DataItem {
  categoryId?: { name: string };
  carId?: { name: string; thumbnail: { path: string } };
  description?: string;
  id?: string;
  name?: string;
  priceMin?: number;
  priceMax?: number;
  thumbnail?: { path: string };
  colors?: string[];
  number?: string;
  price?: number;
  rateTypeId?: { unit: string; name: string };
  cityId?: { name?: string; id?: string };
  pointId?: { name: string; id: string; address: string };
  address?: string;
  orderStatusId?: { name: string; id: string };
  isFullTank?: boolean;
  isNeedChildChair?: boolean;
  isRightWheel?: boolean;
  color?: string;
  dateFrom?: number;
  dateTo?: number;
}
export interface Data {
  count: number;
  data: DataItem[];
}

type CommonType = { [x: string]: string };

type MixType = { [x: string]: string };

export type TypePromiseData = {
  orderStatusId?: CommonType;
  colors?: string[];
  createdAt?: number;
  description?: string;
  id?: string;
  name?: string;
  number?: string;
  priceMax?: number;
  priceMin?: number;
  tank?: number;
  thumbnail?: MixType;
  updatedAt?: number;
  address?: string;
  cityId?: CommonType;
  price?: number;
  rateTypeId?: CommonType;
  unit?: string;
};
