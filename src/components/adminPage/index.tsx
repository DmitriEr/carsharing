import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authorization } from '../../redux/selectors';
import { AdminMenu } from './adminMenu';
import { AdminHeader } from './adminHeader';
import { AdminFooter } from './adminFooter';
import { AdminCard } from './adminCard';
import { AdminList } from './adminList';
import { AdminOrder } from './adminOrder';
import { AdminError } from './adminError';
import { Layout } from 'antd';
import './style.scss';

const { Sider, Header, Content, Footer } = Layout;

export const AdminPage: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState('card');

  const auth = useSelector(authorization);
  const { isAdmin, isAuth } = auth;

  const currentPage = () => {
    switch (page) {
      case 'card':
        return <AdminCard />;
      case 'order':
        return <AdminOrder />;
      case 'list':
        return <AdminList />;
      case 'logo':
        return <Redirect to="/carsharing/main" />;
      default:
        return <AdminError />;
    }
  };

  if (isAuth && isAdmin) {
    return (
      <Layout className="admin-page">
        <button
          className={isOpen ? 'control btn-off' : 'control btn-on'}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Sider
          width="285px"
          className={isOpen ? 'slider-open slider' : 'slider-close slider'}
        >
          <AdminMenu setIsOpen={setIsOpen} setPage={setPage} />
        </Sider>
        <Layout>
          <Header className="header">
            <AdminHeader />
          </Header>
          <Content className="content">{currentPage()}</Content>
          <Footer className="footer">
            <AdminFooter />
          </Footer>
        </Layout>
      </Layout>
    );
  } else {
    return <Redirect to="/carsharing/main/" />;
  }
};
