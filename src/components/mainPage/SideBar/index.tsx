import React, { useState } from 'react';
import { Layout, Menu, Image } from 'antd';
import { menuItems, socialNetworks } from '../.././../constants/mainPage';
import { Props } from '../../../interfaces/mainPage';
import './style.scss';

const { Sider } = Layout;
const { Item } = Menu;

export const SideBar: React.FunctionComponent<Props> = ({ sliderRef }) => {
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

  const switchSlide = (num: number) => {
    setSideOpen(false);
    setWidthPercent(80);
    sliderRef.current.goTo(num);
  };

  const showContent: () => null | JSX.Element = () => {
    if (sideOpen) {
      return (
        <div className="menu">
          <div className="menu-open">
            <div className="inner-wrapper">
              <Menu className="items">
                {menuItems.map((item: string, index: number) => (
                  <Item
                    key={item}
                    className="item"
                    onClick={() => switchSlide(index)}
                  >
                    {item.toUpperCase()}
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
          <div className="menu-full"></div>
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
