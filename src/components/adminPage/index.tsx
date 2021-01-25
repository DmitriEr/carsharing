import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

import { authorization } from '../../redux/selectors';
import { AdminMenu } from './adminMenu';
import { AdminHeader } from './adminHeader';
import { AdminContent } from './adminContent';
import { AdminFooter } from './adminFooter';
import { getData, getOrders } from '../../server/data';
import { DataItem, Data } from '../../interfaces';
import { startPage, links, order, error } from '../../constants/admin';
import './style.scss';

const { Sider, Header, Content, Footer } = Layout;

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
        getOrders(page, firstIndex)
          .then((dataEssence) => {
            setOrdersInfo(dataEssence);
            setCountPages(dataEssence.count);
          })
          .catch(() => setPage(error));
      } else {
        getData(page, firstIndex, 10)
          .then((dataEssence) => {
            const keys = dataEssence.data.map((item, i) => ({
              ...item,
              key: i,
              page,
            }));
            setTableData(keys);
            setCountPages(dataEssence.count);
          })
          .catch(() => setPage(error));
      }
    }
  }, [page, currentPage]);

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
            <AdminContent
              setEssence={setEssence}
              setPage={setPage}
              setCurrentPage={setCurrentPage}
              ordersInfo={ordersInfo}
              essence={essence}
              tableData={tableData}
              countPages={countPages}
              currentPage={currentPage}
              currentTitle={currentTitle}
              page={page}
            />
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
