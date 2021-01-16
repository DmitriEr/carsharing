import React, { memo } from 'react';
import { Button } from 'antd';

import SelectItem from './SelectItem';
import { SwitchItem } from './SwitchItem';
import { DateItem } from './DateItem';

import { TypeTableAdmin } from '../../../../interfaces';

type TypeOrderOptional = {
  essence: TypeTableAdmin;
  setEssence: (essence: TypeTableAdmin) => void;
  setPage: (page: string) => void;
};

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

const OrderCard: React.FunctionComponent<TypeOrderOptional> = ({
  essence,
  setEssence,
  setPage,
}) => {
  const { dateTo, dateFrom } = essence;
  console.log(essence);
  return (
    <>
      {Object.entries(statuses).map(([name, translate], i) => (
        <SelectItem
          func={setEssence}
          essence={essence}
          property={name}
          key={`${name}${i}`}
          trans={translate}
        />
      ))}
      {Object.entries(switches).map(([name, translate]) => (
        <SwitchItem
          func={setEssence}
          essence={essence}
          property={name}
          key={name}
          trans={translate}
        />
      ))}
      {[dateFrom, dateTo].map((item, i) => (
        <DateItem key={item} func={setEssence} essence={essence} property={i} />
      ))}
      <Button onClick={() => setPage('order')}>Отменить</Button>
      <Button>Сохранить</Button>
    </>
  );
};

export default memo(OrderCard);
