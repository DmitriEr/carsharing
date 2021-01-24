import React, { useState, useEffect } from 'react';
import { Layout, Image, Checkbox, Typography } from 'antd';
import moment from 'moment';

import { AdminError } from '../adminError';
import { PaginationPages } from '../../../../components/common/Pagination';

import { herokuapp } from '../../../../constants/server';
import { updateById } from '../../../../server/updateById';
import { translate, cardEssence } from '../../../../constants/admin';
import { Data, DataItem } from '../../../../interfaces';
import { getData } from '../../../../server/data';

import ok from '../../../../assets/admin/Shape1.svg';
import cancel from '../../../../assets/admin/Shape2.svg';
import change from '../../../../assets/admin/Shape2.svg';

import './style.scss';

const { Title } = Typography;

type TypeOrdersInfo = {
  ordersInfo: Data;
  countPages: number;
  currentPage: number;
  currentTitle: string;
  setCurrentPage: (currentPage: number) => void;
  setPage: (page: string) => void;
  setEssence: (essence: DataItem) => void;
};

const { Content, Header, Footer } = Layout;

export const AdminOrders: React.FunctionComponent<TypeOrdersInfo> = ({
  ordersInfo,
  countPages,
  currentPage,
  currentTitle,
  setCurrentPage,
  setEssence,
  setPage,
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
      orderStatusId,
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

    const handleChange = () => {
      setPage(cardEssence);
      setEssence({
        id,
        color,
        dateFrom,
        dateTo,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
        car: { name: carId.name, id: carId.id },
        city: { name: cityId.name, id: cityId.id },
        orderStatus: { name: orderStatusId.name, id: orderStatusId.id },
        point: { name: pointId.address, id: pointId.id },
        page: 'order',
      });
    };

    const showImage = () => {
      if (carId) {
        return (
          <div className="picture">
            <Image
              src={`${herokuapp}${carId.thumbnail.path}`}
              alt={carId.name}
              referrerPolicy="origin"
              crossOrigin="anonymous"
              className="image"
            />
          </div>
        );
      }
    };

    const showCarName = () => {
      if (carId) return carId.name;
    };

    return (
      <>
        <Title className="title">{currentTitle}</Title>
        <Layout className="wrapper-orders">
          <Header className="header-orders">{`Статус: ${translate[updateStatus]}`}</Header>
          <Content className="orders">
            {showImage()}
            <div className="information">
              <Content>
                <span className="words">{showCarName()}</span>
                <span className="words">{`в ${cityId.name},`}</span>
                <span>{` ${pointId.address}`}</span>
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
              <span onClick={handleChange}>
                <Image src={change} alt="change" className="image" />
                Изменить
              </span>
            </div>
          </Content>
          <Footer className="footer-orders">
            <PaginationPages
              func={setCurrentPage}
              countPages={countPages}
              currentPage={currentPage}
            />
          </Footer>
        </Layout>
      </>
    );
  }
  return <AdminError />;
};
