import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeUserCity } from '../../../redux/actions';
import { Layout } from 'antd';
import { getUserLocation } from '../../../server/userLocation';
import { TypeUserLocation } from '../../../server/userLocation/interface';
import location from '../../../assets/common/location.svg';
import { translateCityName } from '../../../constants/common';
import { place } from '../../../redux/selectors';
import './style.scss';

const { Header } = Layout;

export const Head: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const userLocation: string = useSelector(place);

  useEffect(() => {
    getUserLocation().then((userCity: TypeUserLocation) => {
      const translate = translateCityName[userCity.city];
      dispatch(changeUserCity(translate));
      // dispatch(changeUserCity({ userCity: translate, id: '' }));
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
