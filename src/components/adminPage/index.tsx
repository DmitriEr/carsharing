import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authorization } from '../../redux/selectors';
import { AdminMenu } from './adminMenu';
import { Layout } from 'antd';
import './style.scss';

const { Sider, Header, Content, Footer } = Layout;

export const AdminPage: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const auth = useSelector(authorization);
  const { isAdmin, isAuth } = auth;

  if (isAuth && isAdmin) {
    return (
      <Layout className="admin-page">
        <button
          className={isOpen ? 'control btn-off' : 'control btn-on'}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Sider width="285px" className={isOpen ? 'slider-open' : 'slider'}>
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
