import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { menuItems } from '../.././../constants/mainPage';
import burger from '../../../assets/mainPage/sideBar/menu_btn.svg';
import './style.scss';

const { Sider } = Layout;
const { Item } = Menu;

export const SideBar: React.FunctionComponent = () => {
  const showMenu: () => JSX.Element = () => (
    <Menu mode="inline" defaultSelectedKeys={['4']}>
      {menuItems.map((item: string) => (
        <Item key={item}>{item}</Item>
      ))}
    </Menu>
  );

  return (
    <Sider className="sidebar" width={80}>
      <Button
        type="link"
        icon={<img src={burger} alt="btn" className="sidebar__burger-menu" />}
      ></Button>
    </Sider>
  );
};
