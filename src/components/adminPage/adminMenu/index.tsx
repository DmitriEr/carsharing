import React from 'react';
import { Layout, List } from 'antd';
import { MenuLogo } from '../menuLogo';
import { menu } from '../../../constants/admin';

import { startPage } from '../../../constants/admin';
import './style.scss';

type PropsAdminMenu = {
  setIsOpen: (x: boolean) => void;
  setPage: (x: string) => void;
  setCurrentPage: (x: number) => void;
  setCurrentTitle: (x: string) => void;
};

export const AdminMenu: React.FunctionComponent<PropsAdminMenu> = ({
  setIsOpen,
  setPage,
  setCurrentPage,
  setCurrentTitle,
}) => {
  const handlerItem = (value: string, name: string) => {
    setIsOpen(false);
    setPage(value);
    setCurrentPage(startPage);
    setCurrentTitle(name);
  };

  return (
    <Layout className="menu" style={{ background: '#fff' }}>
      <List
        itemLayout="horizontal"
        dataSource={menu}
        className="wrapper"
        renderItem={(item) => (
          <List.Item
            className="list"
            onClick={() => handlerItem(item.type, item.name)}
          >
            <List.Item.Meta
              avatar={
                <MenuLogo
                  svg={item.picture}
                  color={item.fill}
                  width={item.width}
                  height={item.height}
                />
              }
              description={item.name}
              className="item"
            />
          </List.Item>
        )}
      />
    </Layout>
  );
};
