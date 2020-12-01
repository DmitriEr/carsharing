import React, { useState } from 'react';
import { Layout } from 'antd';
import { Location } from './Location';
import { Cars } from './Cars';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { Result } from './Result';
import { Tabs } from './Tabs';
import { Option } from './Option';
import { Confirm } from './Confirm';
import './style.scss';

const { Content } = Layout;

type StatusType = { active: number; current: number };

export const OrderPage: React.FunctionComponent = () => {
  const [numberStatus, setNumberStatus] = useState<StatusType>({
    active: 0,
    current: 0,
  });
  const [colorsOpt, setColorsOpt] = useState<string[]>([]);

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
        return <Cars setColorsOpt={setColorsOpt} />;
      case 2:
        return <Option colorsOpt={colorsOpt} />;
      default:
        return <Confirm />;
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
