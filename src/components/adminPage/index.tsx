import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

import { authorization } from '../../redux/selectors';
import { AdminMenu } from './adminMenu';
import { AdminHeader } from './adminHeader';
import { AdminFooter } from './adminFooter';
import { AdminList } from './adminList';
import { AdminCard } from './adminCard';
import { AdminError } from './adminError';
import { getData } from '../../server/data';
import {
  getCurrentName,
  getCurrentNumber,
  getCurrentOption,
} from '../../helper';
import { TypeTableAdmin } from '../../interfaces';
import {
  startPage,
  links,
  logoApp,
  cardEssence,
  error,
} from '../../constants/admin';
import './style.scss';

const { Sider, Header, Content, Footer } = Layout;

export const AdminPage: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState('car');
  const [tableData, setTableData] = useState<TypeTableAdmin[]>([]);
  const [essence, setEssence] = useState<TypeTableAdmin>();
  const [countPages, setCountPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(startPage);

  const auth = useSelector(authorization);
  const { isAdmin, isAuth } = auth;

  useEffect(() => {
    const isCurrentLink = links.some((item) => item === page);

    if (isCurrentLink) {
      const firstIndex = currentPage - 1;

      getData(page, firstIndex).then((dataEssence) => {
        const currentValues = dataEssence.data.map((item, index) => {
          const number = getCurrentNumber(index, firstIndex);
          const name: string = getCurrentName(page, item, `Заказ №${number}`);
          const description: string = getCurrentOption(page, item);
          return { key: index, number, name, id: item.id, page, description };
        });
        setTableData(currentValues);
        setCountPages(dataEssence.count);
      });
    }
  }, [page, currentPage]);

  const showContent = () => {
    switch (page) {
      case logoApp:
        return <Redirect to="/carsharing/main" />;
      case cardEssence:
        return <AdminCard essence={essence} />;
      case error:
        return <AdminError />;
      default:
        return (
          <AdminList
            tableData={tableData}
            setPage={setPage}
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
          />
        </Sider>
        <Layout>
          <Header className="header">
            <AdminHeader />
          </Header>
          <Content className="content">{showContent()}</Content>
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
