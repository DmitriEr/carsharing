import React from 'react';
import { Redirect } from 'react-router-dom';

import { AdminCard } from './adminCard';
import { AdminOrders } from './adminOrders';
import { AdminError } from './adminError';
import { AdminList } from './adminList';

import { Data, DataItem } from '../../../interfaces';

import { logoApp, cardEssence, order, error } from '../../../constants/admin';

type ContentType = {
  setEssence: (essence: DataItem) => void;
  setPage: (page: string) => void;
  setCurrentPage: (currentPage: number) => void;
  ordersInfo: Data;
  essence: DataItem;
  tableData: DataItem[];
  countPages: number;
  currentPage: number;
  currentTitle: string;
  page: string;
};

export const AdminContent: React.FunctionComponent<ContentType> = ({
  setPage,
  setEssence,
  setCurrentPage,
  essence,
  tableData,
  ordersInfo,
  countPages,
  currentPage,
  currentTitle,
  page,
}) => {
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
          currentTitle={currentTitle}
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
          currentTitle={currentTitle}
        />
      );
  }
};
