import React from 'react';
import { Layout, Table } from 'antd';

import { updateLetterCase } from '../../../helper';

import { translate, columns, cardEssence } from '../../../constants/admin';
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
};

export const AdminList: React.FunctionComponent<TypeProps> = ({
  tableData,
  setPage,
  setEssence,
  countPages,
  setCurrentPage,
  currentPage,
  page,
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

  return (
    <Layout className="table-admin">
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
  );
};
