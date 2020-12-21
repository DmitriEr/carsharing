import React from 'react';
import { Layout, List } from 'antd';
import { MenuLogo } from '../menuLogo';
import { menu } from '../../../constants/admin';
import './style.scss';

type PropsAdminMenu = {
  setIsOpen: (x: boolean) => void;
  setPage: (x: string) => void;
};

export const AdminMenu: React.FunctionComponent<PropsAdminMenu> = ({
  setIsOpen,
  setPage,
}) => {
  const handlerItem = (value: string) => {
    setIsOpen(false);
    setPage(value);
  };

  return (
    <Layout className="menu" style={{ background: '#fff' }}>
      <List
        itemLayout="horizontal"
        dataSource={menu}
        className="wrapper"
        renderItem={(item) => (
          <List.Item className="list" onClick={() => handlerItem(item.type)}>
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
