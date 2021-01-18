import React from 'react';
import { Layout, Progress } from 'antd';

import { columns } from '../../../../constants/admin';
import { DataItem } from '../../../../interfaces';

const { Content } = Layout;

type CardType = {
  essence: DataItem;
};

export const CardEssence: React.FunctionComponent<CardType> = ({ essence }) => {
  const { name, description, page } = essence;

  const progress = () => {
    const count = columns[page].reduce((prev, item) => {
      const test = essence[item].toString().length === 0 ? 0 : 1;
      prev += test;
      return prev;
    }, 0);
    const num = count / columns[page].length;
    return num * 100;
  };

  return (
    <>
      <Layout className="name-wrapper">
        <Content>{name}</Content>
      </Layout>
      <Layout className="percent-wrapper">
        <Content>
          <div className="percent">
            <span>{`Заполнено: ${progress()} %`}</span>
          </div>
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
