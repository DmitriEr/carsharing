// export interface UserInfoType {
//   userCity: string;
// }

// Usercity
export interface UserCityType {
  type: string;
  payload: string;
}

export interface RootReducer {
  information: {
    userCity: string;
  };
}
