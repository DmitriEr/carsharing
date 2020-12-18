import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authorization } from '../../redux/selectors';
import { AdminMenu } from './adminMenu';
import { Layout } from 'antd';
import './style.scss';

const { Sider, Header, Content, Footer } = Layout;

export const AdminPage: React.FunctionComponent = () => {
  const auth = useSelector(authorization);
  const { isAdmin, isAuth } = auth;

  if (isAuth && isAdmin) {
    return (
      <Layout className="admin-page">
        <Sider width="285">
          <AdminMenu />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  } else {
    return <Redirect to="/carsharing/main/" />;
  }
};
