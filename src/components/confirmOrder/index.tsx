import React from 'react';
import { Layout } from 'antd';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';

const { Content } = Layout;

export const ConfirmOrder: React.FunctionComponent = () => {
  return (
    <Layout
      className="order-page"
      style={{ overflow: 'hidden', background: '#fff' }}
    >
      <SideBar />
      <Content className="wrapper">
        <Layout>
          <Head />
        </Layout>
      </Content>
    </Layout>
  );
};
