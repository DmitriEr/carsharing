import React from 'react';
import { Button, Layout } from 'antd';
import './style.scss';

export const AdminError: React.FunctionComponent = () => (
  <Layout className="admin-error">
    <p className="code">500</p>
    <p className="description">Что то пошло не так</p>
    <p>Попробуйте перезагрузить страницу</p>
    <Button>Назад</Button>
  </Layout>
);
