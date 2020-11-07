import React, { useState } from 'react';
import { Layout } from 'antd';
import { Location } from './Location';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { Props } from '../../interfaces/common';
import { statuses } from '../../constants/orderPage';
import './style.scss';

const { Content } = Layout;

export const OrderPage: React.FunctionComponent<Props> = ({ sliderRef }) => {
  const [currentStatus, setCurrentStatus] = useState<string>('Местоположение');

  const checkCurrentStatus: (text: string) => string | null = (
    text: string
  ) => {
    if (currentStatus === text) {
      return 'status-active';
    }
    return null;
  };

  const checkPrevStatus: (num: number) => string | null = (num: number) => {
    const numberStatus = statuses.findIndex((item) => item === currentStatus);
    return num < numberStatus ? 'status-prev' : null;
  };

  return (
    <Layout
      className="order-page"
      style={{ overflow: 'hidden', background: '#fff' }}
    >
      <SideBar sliderRef={sliderRef} />
      <Content>
        <Layout>
          <Head />
          <Content className="order-page__content">
            <div className="order__statuses">
              {statuses.map((status: string, index: number) => (
                <span
                  key={status}
                  className={`order__status ${checkCurrentStatus(
                    status
                  )} ${checkPrevStatus(index)}`}
                >
                  {status}
                </span>
              ))}
            </div>
            <div className="order__forms">
              <Location />
            </div>
            <div className="order__result">Hello world</div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
