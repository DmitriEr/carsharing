import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Menu, Image } from 'antd';
import { RootReducer } from '../../../interfaces';
import { menuItems, socialNetworks } from '../.././../constants/mainPage';
import './style.scss';

const { Sider } = Layout;
const { Item } = Menu;

export const SideBar: React.FunctionComponent = () => {
  const page = (state: RootReducer) => state.router.location.pathname;
  const currentPage = useSelector(page).split('/');

  const [widthPercent, setWidthPercent] = useState<string | number>(80);
  const [sideOpen, setSideOpen] = useState<boolean>(false);

  const showMenu = () => {
    if (sideOpen) {
      setWidthPercent(80);
      setSideOpen(false);
    } else {
      setWidthPercent('100%');
      setSideOpen(true);
    }
  };

  const switchSlide = () => {
    setSideOpen(false);
    setWidthPercent(80);
  };

  const showContent = () => {
    if (sideOpen) {
      return (
        <div className="menu">
          <div className="menu-open">
            <div className="inner-wrapper">
              <Menu className="items">
                {menuItems.map((item: string) => (
                  <Item onClick={() => switchSlide()} key={item}>
                    <Link to="/carsharing" className="item">
                      {item.toUpperCase()}
                    </Link>
                  </Item>
                ))}
              </Menu>
              <ul className="links">
                {socialNetworks.map(
                  (network: {
                    picture: string;
                    name: string;
                    link: string;
                  }) => {
                    const { picture, name, link } = network;
                    return (
                      <a href={link} target="blank" key={name} className="link">
                        <Image
                          src={picture}
                          alt="social"
                          preview={false}
                          className="img"
                        />
                      </a>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
          <div
            className={
              currentPage[currentPage.length - 1] === 'order'
                ? 'menu-full dark'
                : 'menu-full light'
            }
          ></div>
        </div>
      );
    }
    return null;
  };

  return (
    <Sider className="sidebar" width={widthPercent}>
      <div
        onClick={showMenu}
        className={sideOpen ? 'btn-off btn' : 'btn-on btn'}
      />
      {showContent()}
    </Sider>
  );
};
