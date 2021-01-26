import React from 'react';
import { Layout } from 'antd';

import { FormEssence } from './formEssence';
import { CardEssence } from './cardEssence';
import OrderCard from './orderCard';

import { DataItem } from '../../../../interfaces';

import './style.scss';

type TypeCard = {
  essence: DataItem;
  setPage: (page: string) => void;
  setEssence: (essence: DataItem) => void;
};

export const AdminCard: React.FunctionComponent<TypeCard> = ({
  essence,
  setPage,
  setEssence,
}) => {
  const { page } = essence;

  if (page === 'order') {
    return (
      <OrderCard essence={essence} setEssence={setEssence} setPage={setPage} />
    );
  }

  return (
    <Layout className="card-wrapper" style={{ flexDirection: 'initial' }}>
      <Layout className="card">
        <CardEssence essence={essence} setEssence={setEssence} />
      </Layout>
      <Layout className="form">
        <FormEssence
          essence={essence}
          setEssence={setEssence}
          setPage={setPage}
        />
      </Layout>
    </Layout>
  );
};
