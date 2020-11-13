import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Location } from './Location';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { statuses } from '../../constants/orderPage';
import { changePage } from '../../redux/actions';
import { RootReducer, OrderType } from '../../interfaces/redux';
import './style.scss';

const { Content } = Layout;

export const OrderPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const [currentStatus, setCurrentStatus] = useState<string>('Местоположение');
  const [numberStatus, setNumberStatus] = useState(0);

  useEffect(() => {
    dispatch(changePage('order'));
  }, []);

  const userCity = useSelector(
    (state: RootReducer) => state.information.userCity
  );
  const orderList = useSelector((state: RootReducer) => state.order.orderList);

  const checkCurrentStatus: (text: string) => string | null = (
    text: string
  ) => {
    if (currentStatus === text) {
      return 'status-active';
    }
    return '';
  };

  const checkPrevStatus: (num: number) => string | null = (num: number) => {
    const numberStatus = statuses.findIndex((item) => item === currentStatus);
    return num < numberStatus ? 'status-prev' : '';
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
                  className={`status ${checkCurrentStatus(
                    status
                  )} ${checkPrevStatus(index)}`}
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
              {orderList.map(({ name, value, orderNumber }: OrderType) => {
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
