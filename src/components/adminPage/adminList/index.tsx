import React from 'react';
import { Layout, Table } from 'antd';

import { AdditionButton } from './additionButton';
import { updateLetterCase } from '../../../helper';

import {
  translate,
  columns,
  cardEssence,
  order,
} from '../../../constants/admin';
import { DataItem } from '../../../interfaces';

import './style.scss';

type TypeProps = {
  setPage: (page: string) => void;
  setEssence: (essence: DataItem) => void;
  setCurrentPage: (currentPage: number) => void;
  tableData: DataItem[];
  countPages: number;
  currentPage: number;
  page: string;
  currentTitle: string;
};

export const AdminList: React.FunctionComponent<TypeProps> = ({
  tableData,
  setPage,
  setEssence,
  countPages,
  setCurrentPage,
  currentPage,
  page,
  currentTitle,
}) => {
  const handleTable = (item: DataItem) => {
    setPage(cardEssence);
    setEssence(item);
  };

  const value = columns[page].map((item, i) => ({
    dataIndex: item,
    key: i,
    title: updateLetterCase(translate[item]),
  }));

  const createButton = () => {
    if (page !== cardEssence && page !== order) {
      return (
        <AdditionButton
          setEssence={setEssence}
          setPage={setPage}
          page={page}
          currentTitle={currentTitle}
        />
      );
    }
  };

  return (
    <Layout className="table-admin">
      <Layout className="wrapper-button">{createButton()}</Layout>
      <Layout className="wrapper-table">
        <Table
          dataSource={tableData}
          columns={value}
          size="small"
          onRow={(record) => {
            return {
              onClick: () => handleTable(record),
            };
          }}
          rowClassName={'card-row'}
          pagination={{
            hideOnSinglePage: true,
            size: 'small',
            position: ['bottomCenter'],
            pageSizeOptions: [],
            total: countPages,
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
          }}
          className="table"
        />
      </Layout>
    </Layout>
  );
};
