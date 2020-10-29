import React, { useState } from 'react';
import { Layout, Menu, Button, Image } from 'antd';
import { menuItems, socialNetworks } from '../.././../constants/mainPage';
import { useWindowSize } from '../../../helper';
import burger from '../../../assets/mainPage/sideBar/menu_btn.svg';
import closeBurger from '../../../assets/mainPage/sideBar/close.svg';
import './style.scss';

const { Sider } = Layout;
const { Item } = Menu;

export const SideBar: React.FunctionComponent = () => {
  const [image, setImage] = useState<string>(burger);
  const [widthPercent, setWidthPercent] = useState<string | number>(80);

  const showMenu: () => void = () => {
    if (image === burger) {
      setImage(closeBurger);
      setWidthPercent('100%');
    } else {
      setImage(burger);
      setWidthPercent(80);
    }
  };

  const showContent = () => {
    if (image === closeBurger) {
      return (
        <div className="sidebar__menu">
          <div className="sidebar__menu-open">
            <div className="sidebar__menu-inner-wrapper">
              <Menu className="sidebar__items">
                {menuItems.map((item: string) => (
                  <Item key={item} className="sidebar__item">
                    {item.toUpperCase()}
                  </Item>
                ))}
              </Menu>
              <ul className="sidebar__links">
                {socialNetworks.map(
                  (network: {
                    picture: string;
                    name: string;
                    link: string;
                  }) => {
                    const { picture, name, link } = network;
                    return (
                      <a
                        href={link}
                        target="blank"
                        key={name}
                        className="sidebar__link"
                      >
                        <Image src={picture} alt="social" preview={false} />
                      </a>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
          <div className="sidebar__menu-full"></div>
        </div>
      );
    }
    return null;
  };

  return (
    <Sider className="sidebar" width={widthPercent}>
      <Button
        type="link"
        onClick={showMenu}
        icon={<img src={image} alt="btn" className="sidebar__burger-menu" />}
      />
      {showContent()}
    </Sider>
  );
};
