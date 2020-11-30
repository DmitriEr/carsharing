import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { Card, Radio } from 'antd';
import { Loader } from '../../common/Loader';
import { getCars } from '../../../server/data';
import { changeModel } from '../../../redux/actions';
import { list } from '../../../redux/selectors';
import { radioBtnsText } from '../../../constants/orderPage';
import './style.scss';

interface CarsData {
  name: string;
  priceMin: number;
  priceMax: number;
  thumbnail: { path: string };
  categoryId: { name: string };
}

export const Cars: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const userCar = useSelector(list);
  const currentCar = userCar[1].value;

  const [cars, setCars] = useState<CarsData[]>([]);
  const [radioBtn, setRadioBtn] = useState('Все модели');
  const [isLoading, setIsLoading] = useState(true);
  const [arrayCars, setArrayCars] = useState<CarsData[]>([]);

  useEffect(() => {
    getCars().then(({ data }) => {
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

  return (
    <div className="cards">
      {isLoading ? <Loader /> : null}
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
      {cars.map(({ name, priceMin, priceMax, thumbnail }, index) => {
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
            onClick={() => dispatch(changeModel(name))}
          >
            <img
              className="image"
              src={`https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com${thumbnail.path}`}
              alt={name}
              referrerPolicy="origin"
              crossOrigin="anonymous"
            />
          </Card>
        );
      })}
    </div>
  );
};
