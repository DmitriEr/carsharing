import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { useSelector } from 'react-redux';
import { Location } from './Location';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { Props } from '../../interfaces/common';
import { statuses } from '../../constants/orderPage';
import { RootReducer } from '../../interfaces/redux';
import './style.scss';

const { Content } = Layout;

export const OrderPage: React.FunctionComponent<Props> = ({ sliderRef }) => {
  const [currentStatus, setCurrentStatus] = useState<string>('Местоположение');

  const userPoint = useSelector(
    (state: RootReducer) => state.information.userPoint
  );

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
      <Content className="order-page__wrapper">
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
            <div className="order__result">
              <h2>Ваш заказ</h2>
              <div className="result__list">
                <div className="result__list-dots result__list-link">
                  <span className="result__list-field">Пункт выдачи</span>
                </div>
                <span className="result__list-address">{userPoint}</span>
              </div>
              <div className="result__list-price">
                <span>Цена:</span> от 8 000 до 12 000 ₽
              </div>
              <Button disabled={true} className="result__list-btn">
                Выбрать модель
              </Button>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
