import React from 'react';
import { Button, Typography } from 'antd';

import { columns, addToCar, cardEssence } from '../../../../../constants/admin';

import { DataItem } from '../../../../../interfaces';

import './style.scss';

const { Title } = Typography;

type TypeButton = {
  setEssence: (essence: DataItem) => void;
  setPage: (page: string) => void;
  currentTitle: string;
  page: string;
};

export const AdditionButton: React.FunctionComponent<TypeButton> = ({
  setEssence,
  setPage,
  currentTitle,
  page,
}) => {
  return (
    <>
      <Title className="title">{currentTitle}</Title>
      <Button
        className="button"
        onClick={() => {
          const obj = columns[page].reduce(
            (prev: { [key: string]: string }, item: string) => {
              const result = { ...prev, [item]: '', id: 'new', page };
              switch (page) {
                case 'point':
                  return { ...result, cityId: { name: '', id: '' } };
                case 'car':
                  return { ...result, ...addToCar };
                default:
                  return result;
              }
            },
            {}
          );
          setEssence(obj);
          setPage(cardEssence);
        }}
      >{`Создать ${currentTitle}`}</Button>
    </>
  );
};
