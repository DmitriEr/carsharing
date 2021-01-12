import React from 'react';
import { Layout, Table } from 'antd';

import { cardEssence, columns } from '../../../constants/admin';
import { TypeTableAdmin } from '../../../interfaces';

import './style.scss';

type TypeProps = {
  tableData: TypeTableAdmin[];
  setPage: (page: string) => void;
  setEssence: (essence: TypeTableAdmin) => void;
  setCurrentPage: (currentPage: number) => void;
  countPages: number;
  currentPage: number;
};

export const AdminList: React.FunctionComponent<TypeProps> = ({
  tableData,
  setPage,
  setEssence,
  countPages,
  setCurrentPage,
  currentPage,
}) => {
  const handleTable = (item: TypeTableAdmin) => {
    setPage(cardEssence);
    setEssence(item);
  };

  return (
    <Layout className="table-admin">
      <Table
        dataSource={tableData}
        columns={columns}
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
