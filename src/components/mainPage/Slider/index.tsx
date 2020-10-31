import React from 'react';
import { Carousel, Image, Layout, Button } from 'antd';
import { sliderItems } from '../../../constants/mainPage';
import { sliderInterface } from '../../../interfaces/mainPage';
import left from '../../../assets/mainPage/slider/left.svg';
import right from '../../../assets/mainPage/slider/right.svg';
import './style.scss';

const { Content } = Layout;

export const Slider: React.FunctionComponent = () => {
  return (
    <Carousel
      className="main-page__slider"
      dots={{ className: 'slider__btn-down' }}
    >
      {sliderItems.map((slide: sliderInterface, index: number) => {
        const { title, content, background } = slide;
        return (
          <Layout key={title} className="slide__wrapper">
            <Content className="slide">
              <Image
                src={background}
                alt={title}
                className={`slide__background slide__background-${index}`}
                preview={false}
              />
              <div className="slide__filter"></div>
              <Button
                type="ghost"
                className="slide__control-left slide__control"
              >
                <Image src={left} alt="left" />
              </Button>
              <Button
                type="ghost"
                className="slide__control-right slide__control"
              >
                <Image src={right} alt="right" />
              </Button>
              <div className="slide__content">
                <span className="slide__title">{title}</span>
                <div className="slide__description">{content}</div>
                <Button
                  className={`slide__btn-${index} slide__btn`}
                  type="primary"
                >
                  Подробнее
                </Button>
              </div>
            </Content>
          </Layout>
        );
      })}
    </Carousel>
  );
};
