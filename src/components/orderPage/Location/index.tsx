import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Select } from 'antd';
import { Map } from './Map';
import { changeUserCity } from '../../../redux/actions';
import { getCities } from '../../../server/data';
import { Cities } from '../../../server/data/interface';

const { Option } = Select;

export const Location: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const [cities, setCities] = useState<Array<string>>([]);
  const [points, setPionts] = useState<Array<string>>([]);

  useEffect(() => {
    const arr: string[] = [];
    getCities()
      .then((city: Cities) => {
        city.data.forEach((item) => arr.push(item.name));
      })
      .then(() => setCities(arr));
  }, []);

  const showSelect: (name: string, array: string[]) => JSX.Element = (
    name: string,
    array: string[]
  ) => (
    <Select
      placeholder={`Выберите ${name}`}
      style={{ width: '100%' }}
      showArrow={false}
      onChange={(value: string) => {
        name === 'город' ? dispatch(changeUserCity(value)) : null;
      }}
    >
      {array.map((item: string) => (
        <Option value={item} label={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  );

  return (
    <>
      {showSelect('город', cities)}
      {showSelect('пункт', points)}
      <Map setPionts={setPionts} />
    </>
  );
};
