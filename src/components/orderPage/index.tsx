import React, { useState } from 'react';
import { Layout } from 'antd';
import { Location } from './Location';
import { Cars } from './Cars';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { Result } from './Result';
import { Tabs } from './Tabs';
import './style.scss';

const { Content } = Layout;

export const OrderPage: React.FunctionComponent = () => {
  const [numberStatus, setNumberStatus] = useState<{
    active: number;
    current: number;
  }>({ active: 0, current: 0 });

  const switchForm = () => {
    const nextStatus = numberStatus.active + 1;
    if (nextStatus > numberStatus.current) {
      setNumberStatus({
        current: nextStatus,
        active: nextStatus,
      });
    } else {
      setNumberStatus({ ...numberStatus, active: nextStatus });
    }
  };

  const showCurrentStatus = () => {
    switch (numberStatus.active) {
      case 0:
        return <Location />;
      case 1:
        return <Cars />;
      case 2:
        return <div />;
      default:
        return <div />;
    }
  };

  return (
    <Layout
      className="order-page"
      style={{ overflow: 'hidden', background: '#fff' }}
    >
      <SideBar />
      <Content className="wrapper">
        <Layout>
          <Head />
          <Content className="tabs">
            <Tabs
              numberStatus={numberStatus}
              setNumberStatus={setNumberStatus}
            />
          </Content>
          <Content className="content">
            <div className="forms">{showCurrentStatus()}</div>
            <Result numberStatus={numberStatus} switchForm={switchForm} />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
