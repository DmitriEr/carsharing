import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { Map } from './Map';
import { changeUserCity, changePoint } from '../../../redux/actions';
import { getCities, getPoints } from '../../../server/data';
import { RootReducer } from '../../../interfaces/redux';
import './style.scss';

const { Option } = Select;

export const Location: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const [cities, setCities] = useState<Array<string>>([]);
  const [points, setPointTest] = useState<Array<string>>([]);

  const cityData = useSelector((state: RootReducer) => state.information);
  const userPoint = useSelector((state: RootReducer) => state.order.orderList);

  const { userCity } = cityData;

  useEffect(() => {
    const arr: string[] = [];
    getCities()
      .then((city) => {
        city.data.forEach(({ name }) => arr.push(name));
      })
      .then(() => setCities(arr));
  }, []);

  useEffect(() => {
    const set: Set<string> = new Set();
    if (userCity.length) {
      getPoints()
        .then((point) => {
          point.data.forEach((item) => {
            if (item.cityId.name === userCity) {
              set.add(item.address);
            }
          });
        })
        .then(() => setPointTest(Array.from(set)));
    }
  }, [userCity]);

  const showSelect = (name: string, array: string[]) => (
    <Select
      placeholder={`Начните вводить ${name}`}
      className="select"
      showArrow={false}
      showSearch={true}
      bordered={false}
      onChange={(value: string) => {
        if (name === 'город') {
          dispatch(changeUserCity(value));
          dispatch(changePoint(''));
        } else {
          dispatch(changePoint(value));
        }
      }}
      value={name === 'город' ? userCity : userPoint[0].value}
    >
      {array.map((item: string) => {
        if (item === 'Нариманова 1, корп.2') {
          return null;
        }
        return (
          <Option value={item} label={item} key={item}>
            {item}
          </Option>
        );
      })}
    </Select>
  );

  return (
    <div className="location">
      <div className="city">
        <span className="name">Город:</span>
        {showSelect('город', cities)}
      </div>
      <div className="point">
        <span className="name">Пункт выдачи:</span>
        {showSelect('пункт', points)}
      </div>
      <div className="map">
        <span className="name">Выбрать на карте:</span>
        <Map points={points} />
      </div>
    </div>
  );
};
