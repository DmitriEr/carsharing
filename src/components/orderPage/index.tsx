import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import { Location } from './Location';
import { Cars } from './Cars';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { statuses } from '../../constants/orderPage';
import { list } from '../../redux/selectors';
import './style.scss';

const { Content } = Layout;

export const OrderPage: React.FunctionComponent = () => {
  const [numberStatus, setNumberStatus] = useState<{
    active: number;
    current: number;
  }>({ active: 0, current: 0 });

  const orderList = useSelector(list);

  const checkCurrentStatus = (ind: number) => {
    return numberStatus.current === ind ? 'status-active' : '';
  };

  const checkPrevStatus = (indexStatus: number) => {
    const prevStatus = statuses.findIndex(
      (_, index) => index === numberStatus.current
    );
    return indexStatus < prevStatus ? 'status-prev' : '';
  };

  const hiddenMobile = (ind: number) => {
    const current = numberStatus.active;
    return ind >= current - 1 && ind <= current + 1 ? '' : 'status-mobile';
  };

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
            <div className="statuses">
              {statuses.map((status: string, index: number) => (
                <span
                  key={status}
                  onClick={() =>
                    index <= numberStatus.current
                      ? setNumberStatus({ ...numberStatus, active: index })
                      : null
                  }
                  className={classnames(
                    'status',
                    checkCurrentStatus(index),
                    checkPrevStatus(index),
                    hiddenMobile(index)
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
                if (orderNumber <= numberStatus.current) {
                  return (
                    <div className="list" key={name}>
                      <div className="dots link">
                        <span className="field">{name}</span>
                      </div>
                      <span className="address">{value}</span>
                    </div>
                  );
                }
              })}
              <div className="price">
                <span>Цена:</span> от 8 000 до 12 000 ₽
              </div>
              <Button
                disabled={
                  orderList[numberStatus.active].value.length ? false : true
                }
                onClick={() => switchForm()}
                className={
                  orderList[numberStatus.active].value.length
                    ? classnames('btn', 'btn-active')
                    : classnames('btn', 'btn-disable')
                }
              >
                {statuses[numberStatus.active + 1]}
              </Button>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
