import React, { useEffect, useState } from 'react';
import { Layout, Button } from 'antd';
import { getUserLocation } from '../../../server/userLocation';
import location from '../../../assets/mainPage/order/location.svg';
import './style.scss';

const { Header, Content, Footer } = Layout;

export const Order: React.FunctionComponent = () => {
  const [userLocation, setUserLocation] = useState<string>('Ulyanovsk');

  useEffect(() => {
    getUserLocation().then((userCity) => {
      setUserLocation(userCity.city);
    });
  }, []);

  return (
    <Layout className="main-page__order">
      <Header className="order__header">
        <span className="header__logo">Need for drive</span>
        <div className="header__location">
          <img src={location} alt="location" />
          <span className="header__city">{userLocation}</span>
        </div>
      </Header>
      <Content className="order__content">
        <div className="order__wrapper">
          <div className="order__name content__common">Каршеринг</div>
          <div className="order__title content__common">Need for drive</div>
          <div className="order__description content__common">
            Поминутная аренда авто твоего города
          </div>
          <Button className="content__btn" type="primary">
            Забронировать
          </Button>
        </div>
      </Content>
      <Footer className="order__footer">
        <span>© 2016-2019 «Need for drive»</span>
        <a href="tel:8-495-234-22-44">8 (495) 234-22-44</a>
      </Footer>
    </Layout>
  );
};
