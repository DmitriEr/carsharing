import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Map } from './Map';
import { getCities, getPoints } from '../../../server/data';
import { changePoint, changeUserCity } from '../../../redux/actions';
import { info, list } from '../../../redux/selectors';
import { SelectAddress } from './SelectAddress';
import './style.scss';

export const Location: React.FunctionComponent = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [points, setPointTest] = useState<string[]>([]);

  const cityData = useSelector(info);
  const pointValue = useSelector(list);

  const checkPoint = pointValue[0].value;

  const { userCity } = cityData;

  useEffect(() => {
    getCities().then((city) => {
      const result = city.data.map(({ name }) => name);
      setCities(result);
    });
  }, []);

  useEffect(() => {
    if (userCity.length) {
      getPoints().then((point) => {
        const set: Set<string> = new Set();
        point.data.forEach((item) => {
          if (item.cityId.name === userCity) {
            if (item.address === 'Нариманова 1, корп.2') {
              item.address = 'Нариманова 1';
            }
            set.add(item.address);
          }
        });
        setPointTest(Array.from(set));
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
