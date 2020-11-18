import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { Card, Spin } from 'antd';
import { getCars } from '../../../server/data';
import { changeModel } from '../../../redux/actions';
import { list } from '../../../redux/selectors';
import './style.scss';

interface CarsData {
  name: string;
  priceMin: number;
  priceMax: number;
  picture: string;
}

export const Cars: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const userCar = useSelector(list);
  const currentCar = userCar[1].value;

  const [cars, setCars] = useState<CarsData[]>([]);

  useEffect(() => {
    getCars().then(({ data }) => {
      data.forEach(({ name, priceMin, priceMax, thumbnail }) => {
        if (thumbnail.path.startsWith('/files/')) {
          setCars((prev) => [
            ...prev,
            { priceMin, priceMax, name, picture: thumbnail.path },
          ]);
        }
      });
    });
  }, []);

  const showSpin = () => {
    return !cars.length ? <Spin /> : null;
  };

  return (
    <div className="cards">
      {showSpin()}
      {cars.map(({ name, priceMin, priceMax, picture }, index) => {
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
              src={`http://api-factory.simbirsoft1.com${picture}`}
              alt={name}
            />
          </Card>
        );
      })}
    </div>
  );
};
