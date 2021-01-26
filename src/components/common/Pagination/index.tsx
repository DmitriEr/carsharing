import React from 'react';
import { Pagination } from 'antd';

type PaginationType = {
  countPages: number;
  currentPage: number;
  func: (page: number) => void;
};

export const PaginationPages: React.FunctionComponent<PaginationType> = ({
  countPages,
  currentPage,
  func,
}) => {
  return (
    <Pagination
      className="pagination"
      size="small"
      pageSize={1}
      total={countPages}
      current={currentPage}
      onChange={(page) => func(page)}
    />
  );
};
