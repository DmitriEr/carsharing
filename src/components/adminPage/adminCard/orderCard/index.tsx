import React, { useState, useEffect } from 'react';
import { getData } from '../../../../server/data';
import { SelectAdmin } from '../../../common/SelectAdmin';

type TypeOrderOptional = {
  carModel: string;
  setCarModel: (car: string) => void;
  cityName: string;
  setCityName: (city: string) => void;
  pointName: string;
  setPointName: (point: string) => void;
};

export const OrderCard: React.FunctionComponent<TypeOrderOptional> = ({
  carModel,
  setCarModel,
  cityName,
  setCityName,
  pointName,
  setPointName,
}) => {
  const [cars, setCars] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [points, setPoints] = useState<string[]>([]);

  useEffect(() => {
    getData('car').then((item) => {
      const arr = item.data.map((value) => value.name);
      setCars(arr);
    });
    getData('city').then((item) => {
      const arr = item.data.map((value) => value.name);
      setCities(arr);
    });
  }, []);

  useEffect(() => {
    getData('point').then((item) => {
      const arr = item.data.reduce((prev, item) => {
        if (item.cityId.name === cityName) {
          prev.push(item.name);
        }
        return prev;
      }, []);
      setPoints(arr);
    });
  }, [cityName]);

  if (cars.length) {
    return (
      <>
        <SelectAdmin defaultValue={carModel} array={cars} func={setCarModel} />
        <SelectAdmin
          defaultValue={cityName}
          array={cities}
          func={setCityName}
        />
        <SelectAdmin
          defaultValue={pointName}
          array={points}
          func={setPointName}
        />
      </>
    );
  }
  return <div />;
};
