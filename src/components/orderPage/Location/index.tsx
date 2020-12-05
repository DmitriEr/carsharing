import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Map } from './Map';
import { getCities, getPoints } from '../../../server/data';
import { changePoint, changeUserCity } from '../../../redux/actions';
import { info, list } from '../../../redux/selectors';
import { SelectAddress } from './SelectAddress';
import { pointInfo } from '../../../interfaces';
import './style.scss';

export const Location: React.FunctionComponent = () => {
  const [cities, setCities] = useState<pointInfo[]>([]);
  const [points, setPoints] = useState<pointInfo[]>([]);

  const cityData = useSelector(info);
  const pointValue = useSelector(list);

  const checkPoint = pointValue[0].value;

  const { userCity } = cityData;

  useEffect(() => {
    getCities().then((city) => {
      const result = city.data.map(({ name }) => {
        return { value: name };
      });
      setCities(result);
    });
  }, []);

  useEffect(() => {
    if (userCity.length) {
      getPoints().then((point) => {
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
