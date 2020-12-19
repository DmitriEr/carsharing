import React from 'react';
import { Layout, List } from 'antd';
import { MenuLogo } from '../menuLogo';
import { menu } from '../../../constants/admin';
import './style.scss';

export const AdminMenu: React.FunctionComponent = () => {
  return (
    <Layout className="menu" style={{ background: '#fff' }}>
      <List
        itemLayout="horizontal"
        dataSource={menu}
        className="wrapper"
        renderItem={(item) => (
          <List.Item className="list">
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
