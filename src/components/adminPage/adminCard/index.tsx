import React from 'react';
import { Layout } from 'antd';

import { titleTranslate } from '../../../constants/admin';
import { TypeTableAdmin } from '../../../interfaces';

import './style.scss';

const { Header } = Layout;

type TypeCard = { essence: TypeTableAdmin };

export const AdminCard: React.FunctionComponent<TypeCard> = ({ essence }) => {
  return (
    <Layout className="card-wrapper">
      <Layout className="result"></Layout>
      <Layout className="form">
        <Header className="header">{`Настройка ${
          titleTranslate[essence.page]
        }`}</Header>
      </Layout>
    </Layout>
  );
};
