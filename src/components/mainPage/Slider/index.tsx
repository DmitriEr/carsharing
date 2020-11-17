import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image, Layout, Button } from 'antd';
import classNames from 'classnames';
import { sliderItems } from '../../../constants/mainPage';
import left from '../../../assets/mainPage/slider/left.svg';
import right from '../../../assets/mainPage/slider/right.svg';
import './style.scss';

const { Content } = Layout;

export const Slider: React.FunctionComponent = () => {
  const sliderRef = useRef(null);

  const handlerLeft = () => sliderRef.current.prev();
  const handlerRight = () => sliderRef.current.next();

  return (
    <Carousel
      className="main-page__slider"
      dots={{ className: 'btn-down' }}
      ref={sliderRef}
    >
      {sliderItems.map(({ title, content, background }, index) => {
        return (
          <Layout key={title} className="wrapper">
            <Content className="slide">
              <Image
                src={background}
                alt={title}
                className={classNames('background', `background-${index}`)}
                preview={false}
              />
              <div className="filter"></div>
              <Button
                type="ghost"
                className="control-left control"
                onClick={handlerLeft}
              >
                <Image src={left} alt="left" preview={false} />
              </Button>
              <Button
                type="ghost"
                className="control-right control"
                onClick={handlerRight}
              >
                <Image src={right} alt="right" preview={false} />
              </Button>
              <div className="content">
                <span className="title">{title}</span>
                <div className="description">{content}</div>
                <Link to="/carsharing/order">
                  <Button
                    className={classNames('btn', `btn-${index}`)}
                    type="primary"
                  >
                    Подробнее
                  </Button>
                </Link>
              </div>
            </Content>
          </Layout>
        );
      })}
    </Carousel>
  );
};
