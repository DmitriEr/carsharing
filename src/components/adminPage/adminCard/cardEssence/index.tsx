import React from 'react';
import { Layout, Progress, Typography, Image } from 'antd';

import { columns } from '../../../../constants/admin';
import { DataItem } from '../../../../interfaces';

import { herokuapp } from '../../../../constants/server';

const { Content } = Layout;
const { Text } = Typography;

type CardType = {
  essence: DataItem;
};

export const CardEssence: React.FunctionComponent<CardType> = ({ essence }) => {
  const { name, description, page, thumbnail, id } = essence;

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
    if (
      page === 'car' &&
      id !== 'new' &&
      thumbnail.path.startsWith('/files/')
    ) {
      return (
        <Image
          src={`${herokuapp}${thumbnail.path}`}
          alt={page}
          referrerPolicy="origin"
          crossOrigin="anonymous"
        />
      );
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
