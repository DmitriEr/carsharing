import React, { useState, useEffect } from 'react';
import { Map } from './Map';
import { getData } from '../../../server/data';
import { changePoint, changeUserCity } from '../../../redux/actions';
import { SelectAddress } from './SelectAddress';
import { pointInfo } from '../../../interfaces';
import './style.scss';

type TypeLocation = {
  userCity: string;
  checkPoint: string;
};

export const Location: React.FunctionComponent<TypeLocation> = ({
  userCity,
  checkPoint,
}) => {
  const [cities, setCities] = useState<pointInfo[]>([]);
  const [points, setPoints] = useState<pointInfo[]>([]);

  useEffect(() => {
    getData('city').then((city) => {
      const result = city.data.map(({ name }) => {
        return { value: name };
      });
      setCities(result);
    });
  }, []);

  useEffect(() => {
    if (userCity.length) {
      getData('point').then((point) => {
        const newPoints = point.data.reduce((item, ind) => {
          if (
            !item.some((obj) => {
              return obj.value === ind.address;
            }) &&
            userCity === ind.cityId.name
          ) {
            item.push({
              value: ind.address,
              pointId: ind.id,
              cityId: ind.cityId.id,
            });
          }
          return item;
        }, []);
        setPoints(newPoints);
      });
    }
  }, [userCity]);

  return (
    <div className="location">
      <div className="city">
        <span className="name">Город:</span>
        <SelectAddress
          options={cities}
          name={'город'}
          changeOption={changeUserCity}
          deletePoint={changePoint}
          initValue={userCity}
          deleteOption={true}
        />
      </div>
      <div className="point">
        <span className="name">Пункт выдачи:</span>
        <SelectAddress
          options={points}
          name={'пункт'}
          changeOption={changePoint}
          initValue={checkPoint}
          deleteOption={false}
        />
      </div>
      <div className="map">
        <span className="name">Выбрать на карте:</span>
        <Map points={points} />
      </div>
    </div>
  );
};
