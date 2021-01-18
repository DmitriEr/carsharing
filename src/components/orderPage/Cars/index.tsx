import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { Card, Radio } from 'antd';
import { Loader } from '../../common/Loader';
import { getData } from '../../../server/data';
import { changeModel } from '../../../redux/actions';
import { list } from '../../../redux/selectors';
import { radioBtnsText } from '../../../constants/orderPage';
import { herokuapp } from '../../../constants/server';
import { DataItem } from '../../../interfaces';
import './style.scss';

interface CarsProps {
  setColorsOpt: (color: string[]) => void;
}

export const Cars: React.FunctionComponent<CarsProps> = ({ setColorsOpt }) => {
  const dispatch = useDispatch();

  const userCar = useSelector(list);
  const currentCar = userCar[1].value;

  const [cars, setCars] = useState<DataItem[]>([]);
  const [radioBtn, setRadioBtn] = useState('Все модели');
  const [isLoading, setIsLoading] = useState(true);
  const [arrayCars, setArrayCars] = useState<DataItem[]>([]);

  useEffect(() => {
    getData('car').then(({ data }) => {
      const result = data.filter(({ thumbnail }) => {
        if (thumbnail.path.startsWith('/files/')) {
          return true;
        }
      });
      setCars(result);
      setArrayCars(result);
    });
  }, []);

  useEffect(() => {
    const result = arrayCars.filter(({ categoryId }) => {
      switch (radioBtn) {
        case categoryId.name:
          return true;
        case radioBtnsText[0]:
          return true;
        default:
          return false;
      }
    });
    setCars(result);
  }, [radioBtn]);

  useEffect(() => {
    cars.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [cars]);

  const selectCar = (value, min, max, number, pathImg, color, carId) => {
    dispatch(
      changeModel({
        ...userCar[1],
        value,
        min,
        max,
        number,
        pathImg,
        carId,
      })
    );
    setColorsOpt(color);
  };

  return (
    <div className="cards">
      <Radio.Group
        onChange={(e) => setRadioBtn(e.target.value)}
        value={radioBtn}
        className="radio-btns"
      >
        {radioBtnsText.map((text) => (
          <Radio value={text} key={text}>
            {text}
          </Radio>
        ))}
      </Radio.Group>
      {isLoading ? (
        <Loader />
      ) : (
        cars.map(
          (
            { name, priceMin, priceMax, thumbnail, number, colors, id },
            index
          ) => {
            return (
              <Card
                size="small"
                title={
                  <>
                    <div className="title">{name}</div>
                    <div className="price">{`${priceMin} - ${priceMax} Р`}</div>
                  </>
                }
                key={index}
                className={
                  currentCar === name ? classnames('active', 'card') : 'card'
                }
                onClick={() =>
                  selectCar(
                    name,
                    priceMin,
                    priceMax,
                    number,
                    thumbnail.path,
                    colors,
                    id
                  )
                }
              >
                <img
                  className="image"
                  src={`${herokuapp}${thumbnail.path}`}
                  alt={name}
                  referrerPolicy="origin"
                  crossOrigin="anonymous"
                />
              </Card>
            );
          }
        )
      )}
    </div>
  );
};
