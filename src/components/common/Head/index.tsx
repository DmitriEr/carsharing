import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeUserCity } from '../../../redux/actions';
import { Layout } from 'antd';
import { getUserLocation } from '../../../server/userLocation';
import { TypeUserLocation } from '../../../server/userLocation/interface';
import { RootReducer } from '../../../interfaces/redux';
import location from '../../../assets/common/location.svg';
import { translateCityName } from '../../../constants/common';
import './style.scss';
import { getCars } from '../../../server/data';

const { Header } = Layout;

export const Head: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const userLocation: string = useSelector(
    (state: RootReducer) => state.information.userCity
  );

  useEffect(() => {
    getUserLocation().then((userCity: TypeUserLocation) => {
      const translate = translateCityName[userCity.city];
      dispatch(changeUserCity(translate));
    });
  }, []);

  return (
    <Header className="order__header">
      <span className="header__logo">Need for drive</span>
      <div className="header__location">
        <img src={location} alt="location" />
        <span className="header__city">{userLocation}</span>
      </div>
    </Header>
  );
};
