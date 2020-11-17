import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { Location } from './Location';
import { Cars } from './Cars';
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

  const checkCurrentStatus = (text: string) => {
    if (currentStatus === text) {
      return 'status-active';
    }
    return '';
  };

  const checkPrevStatus = (num: number) => {
    const numberStatus = statuses.findIndex((item) => item === currentStatus);
    return num < numberStatus ? 'status-prev' : '';
  };

  const showCurrentStatus = () => {
    switch (currentStatus) {
      case 'Местоположение':
        return <Location />;
      case 'Модель':
        return <Cars />;
      case 'Дополнительно':
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
          <Content>
            <div className="statuses">
              {statuses.map((status: string, index: number) => (
                <span
                  key={status}
                  onClick={() => setCurrentStatus(status)}
                  className={`status ${checkCurrentStatus(
                    status
                  )} ${checkPrevStatus(index)}`}
                >
                  {status}
                </span>
              ))}
            </div>
          </Content>
          <Content className="content">
            <div className="forms">{showCurrentStatus()}</div>
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
              <Button
                disabled={orderList[0].value.length ? false : true}
                onClick={() => {
                  switch (currentStatus) {
                    case 'Местоположение':
                      setCurrentStatus('Модель');
                      break;
                    case 'Модель':
                      setCurrentStatus('Дополнительно');
                      break;
                    case 'Дополнительно':
                      setCurrentStatus('Итого');
                      break;
                    default:
                      setCurrentStatus('Результат');
                  }
                }}
                className={
                  orderList[0].value.length
                    ? classnames('btn', 'btn-active')
                    : classnames('btn', 'btn-disable')
                }
              >
                {statuses[statuses.indexOf(currentStatus) + 1]}
              </Button>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
