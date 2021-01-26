import React from 'react';
import { Button, Layout, Typography } from 'antd';
import './style.scss';

const { Text } = Typography;

export const AdminError: React.FunctionComponent = () => (
  <Layout className="admin-error">
    <Text className="code">500</Text>
    <Text className="description">Что то пошло не так</Text>
    <Text>Попробуйте перезагрузить страницу</Text>
    <Button>Назад</Button>
  </Layout>
);
