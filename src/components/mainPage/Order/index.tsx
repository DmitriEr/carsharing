import React from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Head } from '../../common/Head';
import './style.scss';

const { Content, Footer } = Layout;

export const Order: React.FunctionComponent = () => (
  <Layout className="main-page__order">
    <Head />
    <Content className="order__content">
      <div className="order__wrapper">
        <div className="order__name content__common">Каршеринг</div>
        <div className="order__title content__common">Need for drive</div>
        <div className="order__description content__common">
          Поминутная аренда авто твоего города
        </div>
        <Link to="/carsharing/order">
          <Button className="content__btn" type="primary">
            Забронировать
          </Button>
        </Link>
      </div>
    </Content>
    <Footer className="order__footer">
      <span>© 2016-2019 «Need for drive»</span>
      <a href="tel:8-495-234-22-44">8 (495) 234-22-44</a>
    </Footer>
  </Layout>
);
