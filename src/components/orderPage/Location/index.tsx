import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { Map } from './Map';
import { changeUserCity, changeUserPoint } from '../../../redux/actions';
import { getCities, getPoints } from '../../../server/data';
import { Cities } from '../../../server/data/interface';
import { RootReducer } from '../../../interfaces/redux';
import './style.scss';

const { Option } = Select;

export const Location: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const [cities, setCities] = useState<Array<string>>([]);
  const [points, setPionts] = useState<Array<string>>([]);
  const [pointsTest, setPointTest] = useState<Array<string>>([]);

  const cityData = useSelector((state: RootReducer) => state.information);

  const { userCity, userPoint } = cityData;

  useEffect(() => {
    const arr: string[] = [];
    getCities()
      .then((city: Cities) => {
        city.data.forEach((item) => arr.push(item.name));
      })
      .then(() => setCities(arr));
  }, []);

  // получение данных по поинтам из сваггера
  useEffect(() => {
    const arr: string[] = [];
    if (userCity.length) {
      getPoints()
        .then((point) => {
          point.data.forEach((item) => {
            if (item.cityId.name === userCity) {
              arr.push(item);
            }
          });
        })
        .then(() => setPointTest(arr));
    }
  }, [userCity]);

  const showSelect: (name: string, array: string[]) => JSX.Element = (
    name: string,
    array: string[]
  ) => (
    <Select
      placeholder={`Начните вводить ${name}`}
      className="location__select"
      showArrow={false}
      showSearch={true}
      bordered={false}
      onChange={(value: string) => {
        if (name === 'город') {
          dispatch(changeUserCity(value));
          dispatch(changeUserPoint(''));
        } else {
          dispatch(changeUserPoint(value));
        }
      }}
      value={name === 'город' ? userCity : userPoint}
    >
      {array.map((item: string) => (
        <Option value={item} label={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  );

  return (
    <div className="location">
      <div className="location__city">
        <span className="location__input-name">Город:</span>
        {showSelect('город', cities)}
      </div>
      <div className="location__point">
        <span className="location__input-name">Пункт выдачи:</span>
        {showSelect('пункт', points)}
      </div>
      <div className="location__map">
        <span className="location__map-name">Выбрать на карте:</span>
        <Map setPionts={setPionts} pointsTest={pointsTest} />
      </div>
    </div>
  );
};
