import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Map } from './Map';
import { getCities, getPoints } from '../../../server/data';
import { changePoint, changeUserCity } from '../../../redux/actions';
import { RootReducer } from '../../../interfaces';
import { SelectAddress } from './SelectAddress';
import './style.scss';

export const Location: React.FunctionComponent = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [points, setPointTest] = useState<string[]>([]);

  const info = (state: RootReducer) => state.information;

  const cityData = useSelector(info);

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
          initValue={userCity}
        />
      </div>
      <div className="point">
        <span className="name">Пункт выдачи:</span>
        <SelectAddress
          options={points}
          name={'пункт'}
          changeOption={changePoint}
        />
      </div>
      <div className="map">
        <span className="name">Выбрать на карте:</span>
        <Map points={points} />
      </div>
    </div>
  );
};
