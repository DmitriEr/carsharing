import React from 'react';
import { Layout } from 'antd';
import { Location } from './Location';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { Props } from '../../interfaces/common';
import './style.scss';

const { Content } = Layout;

export const OrderPage: React.FunctionComponent<Props> = ({ sliderRef }) => {
  return (
    <div>
      <Layout
        className="order-page"
        style={{ overflow: 'hidden', background: '#fff' }}
      >
        <SideBar sliderRef={sliderRef} />
        <Content>
          <Layout className="order-page">
            <Head />
            <Content>
              <Location />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};
