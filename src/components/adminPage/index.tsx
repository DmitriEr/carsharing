import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Typography, Button } from 'antd';

import { authorization } from '../../redux/selectors';
import { AdminMenu } from './adminMenu';
import { AdminHeader } from './adminHeader';
import { AdminFooter } from './adminFooter';
import { AdminList } from './adminList';
import { AdminCard } from './adminCard';
import { AdminError } from './adminError';
import { AdminOrders } from './adminOrders';
import { getData, getOrders } from '../../server/data';
import { DataItem, Data } from '../../interfaces';
import {
  startPage,
  links,
  logoApp,
  cardEssence,
  error,
  order,
} from '../../constants/admin';
import './style.scss';

const { Sider, Header, Content, Footer } = Layout;
const { Title } = Typography;

const newEssence = { id: 'new', name: '', dexcription: '' };

export const AdminPage: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState('car');
  const [tableData, setTableData] = useState<DataItem[]>([]);
  const [essence, setEssence] = useState<DataItem>();
  const [countPages, setCountPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(startPage);
  const [ordersInfo, setOrdersInfo] = useState<Data>();
  const [currentTitle, setCurrentTitle] = useState('Автомобили');

  const auth = useSelector(authorization);
  const { isAdmin, isAuth } = auth;

  useEffect(() => {
    const isCurrentLink = links.some((item) => item === page);

    if (isCurrentLink) {
      const firstIndex = currentPage - 1;
      if (page === order) {
        getOrders(page, firstIndex).then((dataEssence) => {
          setOrdersInfo(dataEssence);
          setCountPages(dataEssence.count);
        });
      } else {
        getData(page, firstIndex, 10).then((dataEssence) => {
          const keys = dataEssence.data.map((item, i) => ({
            ...item,
            key: i,
            page,
          }));
          setTableData(keys);
          setCountPages(dataEssence.count);
        });
      }
    }
  }, [page, currentPage]);

  const addButton = () => {
    if (page !== cardEssence) {
      return (
        <Button
          onClick={() => {
            setPage(cardEssence);
            setEssence({ ...newEssence, page });
          }}
        >{`Создать ${currentTitle}`}</Button>
      );
    }
  };

  const showContent = () => {
    switch (page) {
      case logoApp:
        return <Redirect to="/carsharing/main" />;
      case cardEssence:
        return (
          <AdminCard
            essence={essence}
            setPage={setPage}
            setEssence={setEssence}
          />
        );
      case order:
        return (
          <AdminOrders
            ordersInfo={ordersInfo}
            countPages={countPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setPage={setPage}
            setEssence={setEssence}
          />
        );
      case error:
        return <AdminError />;
      default:
        return (
          <AdminList
            tableData={tableData}
            setPage={setPage}
            page={page}
            setEssence={setEssence}
            setCurrentPage={setCurrentPage}
            countPages={countPages}
            currentPage={currentPage}
          />
        );
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
          <AdminMenu
            setIsOpen={setIsOpen}
            setPage={setPage}
            setCurrentPage={setCurrentPage}
            setCurrentTitle={setCurrentTitle}
          />
        </Sider>
        <Layout className="wrapper-content">
          <Header className="header">
            <AdminHeader />
          </Header>
          <Content className="content">
            <Layout className="control">
              <Title className="title">{currentTitle}</Title>
              {addButton()}
            </Layout>
            {showContent()}
          </Content>
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
