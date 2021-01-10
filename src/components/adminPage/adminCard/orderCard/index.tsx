import React, { useState, useEffect } from 'react';
import { getData } from '../../../../server/data';
import { SelectAdmin } from '../../../common/SelectAdmin';

type TypeOrderOptional = {
  carModel: string;
  setCarModel: (x: string) => void;
  cityName: string;
  setCityName: (x: string) => void;
  pointName: string;
  setPointName: (x: string) => void;
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
      const arr = item.data
        .filter((value) => value.cityId.name === cityName)
        .map((point) => point.name);
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
