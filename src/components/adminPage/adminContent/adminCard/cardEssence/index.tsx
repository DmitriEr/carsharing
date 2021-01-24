import React from 'react';
import { Layout, Progress, Typography } from 'antd';

import { ImageCar } from './imageCar';

import { columns } from '../../../../../constants/admin';
import { DataItem } from '../../../../../interfaces';

const { Content } = Layout;
const { Text } = Typography;

type CardType = {
  essence: DataItem;
  setEssence: (essence: DataItem) => void;
};

export const CardEssence: React.FunctionComponent<CardType> = ({
  essence,
  setEssence,
}) => {
  const { name, description, page } = essence;

  const progress = () => {
    const count = columns[page].reduce((prev, item) => {
      if (essence[item]) {
        prev += 1;
      }
      return prev;
    }, 0);
    const num = count / columns[page].length;
    return num * 100;
  };

  const showCar = () => {
    if (page === 'car') {
      return <ImageCar setEssence={setEssence} essence={essence} />;
    }
  };

  return (
    <>
      <Layout className="name-wrapper">
        <Content>
          <Text>{name}</Text>
          {showCar()}
        </Content>
      </Layout>
      <Layout className="percent-wrapper">
        <Content>
          <Text>{`Заполнено: ${progress()} %`}</Text>
          <Progress percent={progress()} status="active" showInfo={false} />
        </Content>
      </Layout>
      <Layout className="description-wrapper">
        Описание:
        <Content className="description">{description}</Content>
      </Layout>
    </>
  );
};
