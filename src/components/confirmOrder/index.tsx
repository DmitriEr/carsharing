import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';

import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { Confirm } from '../orderPage/Confirm';

import { updateStatusOrderById } from '../../components/common/UpdateOrderById';
import { getById } from '../../server/getById';
import { getTimeToString } from '../../helper';
import { initState } from '../../constants/redux';
import { clearOrder } from '../../redux/actions';
import './style.scss';

const { Content } = Layout;

enum enumOptions {
  'Пункт выдачи',
  'Модель',
  'Цвет',
  'Длительность аренды',
  'Тариф',
  'Полный бак',
  'Детское кресло',
  'Правый руль',
}

const orderTitles: { [x: string]: string | boolean } = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: false,
  6: false,
  7: false,
};

export const ConfirmOrder: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const [result, setResult] = useState(orderTitles);
  const [money, setMoney] = useState(0);
  const [data, setData] = useState({});

  const id = localStorage.getItem('id');

  useEffect(() => {
    getById('order', id).then(({ data }) => {
      setData(data);
      const {
        cityId,
        pointId,
        carId,
        color,
        dateFrom,
        dateTo,
        rateId,
        price,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
      } = data;
      setResult({
        0: `${cityId.name} ${pointId.address}`,
        1: `${carId.name}`,
        2: `${color}`,
        3: getTimeToString(dateFrom, dateTo),
        4: `${rateId.rateTypeId.name}`,
        5: isFullTank,
        6: isNeedChildChair,
        7: isRightWheel,
      });
      setMoney(price);
    });
  }, []);

  const onCancel = () => {
    updateStatusOrderById('cancelled', id, data);
    dispatch(clearOrder(initState));
  };

  return (
    <Layout
      className="confirm-page"
      style={{ overflow: 'hidden', background: '#fff' }}
    >
      <SideBar />
      <Content className="wrapper">
        <Layout>
          <Head />
          <Content className="tabs">
            <div className="statuses">
              <span className="status title-order">{`Ваш заказ ${id}`}</span>
            </div>
          </Content>
          <Content className="content">
            <div className="forms">
              <Confirm />
            </div>
            <div className="result">
              <h2>Ваш заказ</h2>
              {Object.entries(result).map((item) => {
                const [number, value] = item;
                if (value) {
                  return (
                    <div className="list" key={number}>
                      <div className="dots link">
                        <span className="field">{enumOptions[number]}</span>
                      </div>
                      <span className="address">{value}</span>
                    </div>
                  );
                }
              })}
              <div className="price">{`Цена: ${money}`}</div>
              <Link to="/carsharing/order">
                <Button className="btn-cancel" onClick={onCancel}>
                  Отменить
                </Button>
              </Link>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
