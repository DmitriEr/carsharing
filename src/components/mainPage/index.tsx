import React from 'react';
import { Layout } from 'antd';
import { Order } from './Order';
import { SideBar } from '../common/SideBar';
import { Slider } from './Slider';
import './style.scss';

export const MainPage: React.FunctionComponent = () => (
  <Layout
    className="main-page"
    style={{ overflow: 'hidden', background: '#fff' }}
  >
    <SideBar />
    <Order />
    <Slider />
  </Layout>
);
