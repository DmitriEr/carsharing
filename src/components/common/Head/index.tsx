import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { getUserLocation } from '../../../server/userLocation';
import { TypeUserLocation } from '../../../server/userLocation/interface';
import location from '../../../assets/common/location.svg';
import './style.scss';

const { Header } = Layout;

export const Head: React.FunctionComponent = () => {
  const [userLocation, setUserLocation] = useState<string>('Ulyanovsk');

  useEffect(() => {
    getUserLocation().then((userCity: TypeUserLocation) => {
      setUserLocation(userCity.city);
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
