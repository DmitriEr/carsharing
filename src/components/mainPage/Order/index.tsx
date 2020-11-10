import React, { useEffect, useState } from 'react';
import { Layout, Button } from 'antd';
import { getUserLocation } from '../../../server/userLocation';
import { TypeUserLocation } from '../../../server/userLocation/interface';
import location from '../../../assets/mainPage/order/location.svg';
import './style.scss';

const { Header, Content, Footer } = Layout;

export const Order: React.FunctionComponent = () => {
  const [userLocation, setUserLocation] = useState('Ulyanovsk');

  useEffect(() => {
    getUserLocation().then((userCity: TypeUserLocation) => {
      setUserLocation(userCity.city);
    });
  }, []);

  return (
    <Layout className="main-page__order">
      <Header className="header">
        <span className="logo">Need for drive</span>
        <div className="location">
          <img src={location} alt="location" />
          <span className="city">{userLocation}</span>
        </div>
      </Header>
      <Content className="content">
        <div className="wrapper">
          <div className="name common">Каршеринг</div>
          <div className="title common">Need for drive</div>
          <div className="description common">
            Поминутная аренда авто твоего города
          </div>
          <Button className="btn" type="primary">
            Забронировать
          </Button>
        </div>
      </Content>
      <Footer className="footer">
        <span>© 2016-2019 «Need for drive»</span>
        <a href="tel:8-495-234-22-44">8 (495) 234-22-44</a>
      </Footer>
    </Layout>
  );
};
