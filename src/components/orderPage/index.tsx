import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { Location } from './Location';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { statuses } from '../../constants/orderPage';
import { RootReducer } from '../../interfaces';
import './style.scss';

const { Content } = Layout;

export const OrderPage: React.FunctionComponent = () => {
  const [currentStatus, setCurrentStatus] = useState<string>('Местоположение');
  const [numberStatus, setNumberStatus] = useState(0);

  const city = (state: RootReducer) => state.information.userCity;
  const list = (state: RootReducer) => state.order.orderList;

  const userCity = useSelector(city);
  const orderList = useSelector(list);

  const checkCurrentStatus = (text: string) => {
    return currentStatus === text ? 'status-active' : '';
  };

  const checkPrevStatus = (indexStatus: number) => {
    const numberStatus = statuses.findIndex((item) => item === currentStatus);
    return indexStatus < numberStatus ? 'status-prev' : '';
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
          <Content className="content">
            <div className="statuses">
              {statuses.map((status: string, index: number) => (
                <span
                  key={status}
                  className={classnames(
                    'status',
                    checkCurrentStatus(status),
                    checkPrevStatus(index)
                  )}
                >
                  {status}
                </span>
              ))}
            </div>
            <div className="forms">
              <Location />
            </div>
            <div className="result">
              <h2>Ваш заказ</h2>
              {orderList.map(({ name, value, orderNumber }) => {
                if (orderNumber <= numberStatus) {
                  return (
                    <div className="list" key={name}>
                      <div className="dots link">
                        <span className="field">{name}</span>
                      </div>
                      <span className="address">{`${userCity}, ${value}`}</span>
                    </div>
                  );
                }
              })}
              <div className="price">
                <span>Цена:</span> от 8 000 до 12 000 ₽
              </div>
              <Button disabled={true} className="btn">
                Выбрать модель
              </Button>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
