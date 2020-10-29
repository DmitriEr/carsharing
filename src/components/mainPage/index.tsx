import React from 'react';
import { Layout } from 'antd';
import { Order } from './Order';
import { SideBar } from './SideBar';
import { Slider } from './Slider';
import './style.scss';

export const MainPage: React.FunctionComponent = () => {
  return (
    <Layout className="main-page">
      <SideBar />
      <Order />
      <Slider />
    </Layout>
  );
};
