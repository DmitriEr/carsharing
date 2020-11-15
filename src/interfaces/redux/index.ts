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
  page: string;
}

export interface CommonType {
  type: string;
  payload: string;
}

export interface HTTPResponseCity {
  data: { name: string }[];
}

export interface HTTPResponsePoint {
  data: { cityId: { name: string }; address: string }[];
}

export interface HTTPResponseCoords {
  results: { geometry: { lat: number; lng: number } }[];
}

export interface HTTPResponseCars {
  data: {
    categoryId: { name: string };
    colors: string[];
    description: string;
    name: string;
    number: string;
    priceMax: number;
    priceMin: number;
    thumbnail: { originalname: string; path: string };
  }[];
}
