import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { Location } from './Location';
import { Cars } from './Cars';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { statuses } from '../../constants/orderPage';
import { place, list } from '../../redux/selectors';
import './style.scss';

const { Content } = Layout;

export const OrderPage: React.FunctionComponent = () => {
  const [currentStatus, setCurrentStatus] = useState('Местоположение');
  const [numberStatus, setNumberStatus] = useState(0);

  const userCity = useSelector(place);
  const orderList = useSelector(list);

  const checkCurrentStatus = (text: string) => {
    return currentStatus === text ? 'status-active' : '';
  };

  const checkPrevStatus = (indexStatus: number) => {
    const numberStatus = statuses.findIndex((item) => item === currentStatus);
    return indexStatus < numberStatus ? 'status-prev' : '';
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
          </Content>
          <Content className="content">
            <div className="forms">{showCurrentStatus()}</div>
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
