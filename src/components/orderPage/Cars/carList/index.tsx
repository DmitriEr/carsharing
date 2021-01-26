import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Image } from 'antd';
import classnames from 'classnames';

import { showSrc } from '../../../../helper';
import { changeModel } from '../../../../redux/actions';
import { list } from '../../../../redux/selectors';
import { DataItem } from '../../../../interfaces';

type ListType = {
  cars: DataItem[];
  currentCar: string;
  setColorsOpt: (colors: string[]) => void;
};

export const CarList: React.FunctionComponent<ListType> = ({
  cars,
  currentCar,
  setColorsOpt,
}) => {
  const dispatch = useDispatch();
  const userCar = useSelector(list);

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
    <>
      {cars.map((data, index) => {
        const {
          name,
          priceMin,
          priceMax,
          thumbnail,
          number,
          colors,
          id,
        } = data;

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
            <Image
              preview={false}
              src={showSrc(thumbnail)}
              alt={name}
              referrerPolicy="origin"
              crossOrigin="anonymous"
            />
          </Card>
        );
      })}
    </>
  );
};
