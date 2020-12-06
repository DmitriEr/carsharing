import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import moment from 'moment';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { Confirm } from '../orderPage/Confirm';
import { getOrderById } from '../../server/getOrderById';
import { getTimeToString } from '../../helper';
// import { list, resultMoney } from '../../redux/selectors';

const { Content } = Layout;

const orderTitles: { [x: string]: string } = {
  'Пункт выдачи': '',
  Модель: '',
  Цвет: '',
  'Длительность аренды': '',
  Тариф: '',
  'Полный бак': '',
};

export const ConfirmOrder: React.FunctionComponent = () => {
  const [result, setResult] = useState(orderTitles);

  const showMenu = (title: string, state: boolean) => {
    if (state) {
      return { title: 'Да' };
    }
  };

  useEffect(() => {
    getOrderById(localStorage.getItem('id')).then(({ data }) => {
      const {
        cityId,
        pointId,
        carId,
        color,
        dateFrom,
        dateTo,
        rateId,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
      } = data;
      setResult({
        'Пункт выдачи': `${cityId.name} ${pointId.address}`,
        Модель: `${carId.name}`,
        Цвет: `${color}`,
        'Длительность аренды': getTimeToString(dateFrom, dateTo),
        Тариф: `${rateId.rateTypeId.name}`,
      });
    });
  }, []);

  const refuseOrder = () => {
    console.log('a');
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
            <div className="forms">
              <Confirm />
              <div className="result">
                <h2>Ваш заказ</h2>
                {/* {orderList.map(({ name, value, visible }) => {
                  console.log(name, value, visible);
                })} */}
                {/* <div className="price">{`Цена: ${money}`}</div> */}
                <Button onClick={refuseOrder}>Отменить</Button>
              </div>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
