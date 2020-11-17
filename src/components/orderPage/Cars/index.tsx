import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { getCars } from '../../../server/data';
import { CarsData } from '../../../interfaces/orderPage';
import './style.scss';

export const Cars: React.FunctionComponent = () => {
  const [cars, setCars] = useState<Array<CarsData>>([]);

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

  return (
    <div className="cards">
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
            className="card"
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
