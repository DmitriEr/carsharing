import React, { memo } from 'react';
import { Button, Layout } from 'antd';

import SelectItem from './SelectItem';
import { SwitchItem } from './SwitchItem';
import { DateItem } from './DateItem';
import { updateById } from '../../../../server/updateById';

import { DataItem } from '../../../../interfaces';

import './style.scss';

const statuses = {
  car: 'Машина',
  city: 'Город',
  point: 'Адресс',
  orderStatus: 'Статус заказа',
  color: 'Цвет',
};

const switches = {
  isFullTank: 'Полный бак',
  isNeedChildChair: 'Детское кресло',
  isRightWheel: 'Правый руль',
};

type TypeOrderOptional = {
  essence: DataItem;
  setEssence: (essence: DataItem) => void;
  setPage: (page: string) => void;
};

const OrderCard: React.FunctionComponent<TypeOrderOptional> = ({
  essence,
  setEssence,
  setPage,
}) => {
  const {
    dateTo,
    dateFrom,
    id,
    orderStatus,
    city,
    point,
    car,
    color,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
  } = essence;

  const handleUpdate = () => {
    updateById(
      id,
      {
        orderStatusId: orderStatus.id,
        cityId: city.id,
        pointId: point.id,
        carId: car.id,
        color: color,
        dateFrom,
        dateTo,
        price,
        isFullTank,
        isNeedChildChair,
        isRightWheel,
      },
      'order'
    );
    setPage('order');
  };

  return (
    <Layout className="setttings-order">
      {Object.entries(statuses).map(([name, translate], i) => (
        <SelectItem
          func={setEssence}
          essence={essence}
          property={name}
          key={i}
          trans={translate}
        />
      ))}
      {Object.entries(switches).map(([name, translate], i) => (
        <SwitchItem
          func={setEssence}
          essence={essence}
          property={name}
          key={i}
          trans={translate}
        />
      ))}
      {[dateFrom, dateTo].map((item, i) => (
        <DateItem key={item} func={setEssence} essence={essence} property={i} />
      ))}
      <Layout className="wrapper">
        <Button onClick={() => setPage('order')} className="cancel">
          Отменить
        </Button>
        <Button onClick={handleUpdate} className="save">
          Сохранить
        </Button>
      </Layout>
    </Layout>
  );
};

export default memo(OrderCard);
