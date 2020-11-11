import React from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Head } from '../../common/Head';
import './style.scss';

const { Content, Footer } = Layout;

export const Order: React.FunctionComponent = () => (
  <Layout className="main-page__order">
    <Head />
    <Content className="content">
      <div className="wrapper">
        <div className="name common">Каршеринг</div>
        <div className="title common">Need for drive</div>
        <div className="description common">
          Поминутная аренда авто твоего города
        </div>
        <Link to="/carsharing/order">
          <Button className="btn" type="primary">
            Забронировать
          </Button>
        </Link>
      </div>
    </Content>
    <Footer className="footer">
      <span>© 2016-2019 «Need for drive»</span>
      <a href="tel:8-495-234-22-44">8 (495) 234-22-44</a>
    </Footer>
  </Layout>
);
