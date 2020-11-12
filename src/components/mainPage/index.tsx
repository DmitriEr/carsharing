import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { Order } from './Order';
import { SideBar } from '../common/SideBar';
import { Slider } from './Slider';
import { changePage } from '../../redux/actions';
import { Props } from '../../interfaces/common';
import './style.scss';

export const MainPage: React.FunctionComponent<Props> = ({ sliderRef }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage('main'));
  }, []);

  return (
    <Layout
      className="main-page"
      style={{ overflow: 'hidden', background: '#fff' }}
    >
      <SideBar />
      <Order />
      <Slider sliderRef={sliderRef} />
    </Layout>
  );
};
