import React, { useState, useEffect } from 'react';
import { Layout, Image, Checkbox, Pagination } from 'antd';
import moment from 'moment';

import { herokuapp } from '../../../constants/server';
import { AdminError } from '../adminError';
import { updateById } from '../../../server/updateById';
import { translateStatus } from '../../../constants/admin';
import { TypeTableAdmin, Data } from '../../../interfaces';
import { getData } from '../../../server/data';

import ok from '../../../assets/admin/Shape1.svg';
import cancel from '../../../assets/admin/Shape2.svg';
import change from '../../../assets/admin/Shape2.svg';

import './style.scss';

type TypeOrdersInfo = {
  ordersInfo: Data;
  countPages: number;
  currentPage: number;
  setCurrentPage: (x: number) => void;
  setPage: (x: string) => void;
  setEssence: (x: TypeTableAdmin) => void;
};

const { Content, Header, Footer } = Layout;

export const AdminOrders: React.FunctionComponent<TypeOrdersInfo> = ({
  ordersInfo,
  countPages,
  currentPage,
  setCurrentPage,
}) => {
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    if (ordersInfo !== undefined) {
      setUpdateStatus(ordersInfo.data[0].orderStatusId.name);
    }
  }, [ordersInfo]);

  if (ordersInfo !== undefined) {
    const {
      carId,
      cityId,
      pointId,
      dateFrom,
      dateTo,
      color,
      isFullTank,
      isNeedChildChair,
      isRightWheel,
      price,
      id,
    } = ordersInfo.data[0];

    const firstDay = moment(dateFrom).format('DD.MM.YYYY hh:mm');
    const lastDay = moment(dateTo).format('DD.MM.YYYY hh:mm');

    const handleOrder = (action: string) => {
      getData('orderStatus')
        .then((items) => {
          return items.data.filter((item) => item.name === action);
        })
        .then((statusId) =>
          updateById(
            id,
            { ...ordersInfo.data[0], orderStatusId: { id: statusId[0].id } },
            'order'
          )
        )
        .then(() => setUpdateStatus(action));
    };

    return (
      <Layout className="wrapper-orders">
        <Header className="header">{`Статус: ${translateStatus[updateStatus]}`}</Header>
        <Content className="orders">
          <div className="picture">
            <Image
              src={`${herokuapp}${carId === null ? '' : carId.thumbnail.path}`}
              alt={carId === null ? '' : carId.name}
              referrerPolicy="origin"
              crossOrigin="anonymous"
              className="image"
            />
          </div>
          <div className="information">
            <Content>
              <span className="words">{carId === null ? '' : carId.name}</span>{' '}
              в <span className="words">{cityId.name}</span>,
              {` ${pointId.address}`}
            </Content>
            <Content>{`${firstDay} - ${lastDay}`}</Content>
            <Content>{`Цвет: ${color}`}</Content>
          </div>
          <div className="options">
            <Checkbox checked={isFullTank} className="option">
              Полный бак
            </Checkbox>
            <Checkbox checked={isNeedChildChair} className="option">
              Детское кресло
            </Checkbox>
            <Checkbox checked={isRightWheel} className="option">
              Правый руль
            </Checkbox>
          </div>
          <div className="price">{`${price} ₽`}</div>
          <div className="buttons">
            <span onClick={() => handleOrder('confirmed')}>
              <Image src={ok} alt="ok" className="image" />
              Готово
            </span>
            <span onClick={() => handleOrder('cancelled')}>
              <Image src={cancel} alt="cancel" className="image" />
              Отмена
            </span>
            <span>
              <Image src={change} alt="change" className="image" />
              Изменить
            </span>
          </div>
        </Content>
        <Footer className="footer">
          <Pagination
            className="pagination"
            size="small"
            pageSize={1}
            total={countPages}
            current={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </Footer>
      </Layout>
    );
  }
  return <AdminError />;
};
