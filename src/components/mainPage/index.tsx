import React, { useRef } from 'react';
import { Layout } from 'antd';
import { Order } from './Order';
import { SideBar } from '../common/SideBar';
import { Slider } from './Slider';
import { Props } from '../../interfaces/common';
import './style.scss';

export const MainPage: React.FunctionComponent<Props> = ({ sliderRef }) => {
  // const sliderRef = useRef(null);

  return (
    <Layout
      className="main-page"
      style={{ overflow: 'hidden', background: '#fff' }}
    >
      <SideBar sliderRef={sliderRef} />
      <Order />
      <Slider sliderRef={sliderRef} />
    </Layout>
  );
};
