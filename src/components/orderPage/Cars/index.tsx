import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Radio, Typography } from 'antd';

import { PaginationPages } from '../../common/Pagination';
import { CarList } from './carList';

import { Loader } from '../../common/Loader';
import { getData } from '../../../server/data';
import { list } from '../../../redux/selectors';
import { radioBtnsText } from '../../../constants/orderPage';
import { startPage } from '../../../constants/admin';
import { DataItem } from '../../../interfaces';
import './style.scss';

const { Paragraph } = Typography;

interface CarsProps {
  setColorsOpt: (color: string[]) => void;
}

export const Cars: React.FunctionComponent<CarsProps> = ({ setColorsOpt }) => {
  const userCar = useSelector(list);
  const currentCar = userCar[1].value;

  const [cars, setCars] = useState<DataItem[]>([]);
  const [radioBtn, setRadioBtn] = useState('Все модели');
  const [isLoading, setIsLoading] = useState(true);
  const [arrayCars, setArrayCars] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(startPage);
  const [countPages, setCountPages] = useState(0);

  useEffect(() => {
    const firstIndex = currentPage - 1;
    getData('car', firstIndex, 10).then(({ data, count }) => {
      setCars(data);
      setArrayCars(data);
      setCountPages(Math.ceil(count / 10));
    });
  }, [currentPage]);

  useEffect(() => {
    const result = arrayCars.filter(({ categoryId }) => {
      switch (radioBtn) {
        case categoryId.name:
          return true;
        case radioBtnsText[0]:
          return true;
        default:
          return false;
      }
    });
    setCars(result);
  }, [radioBtn]);

  useEffect(() => {
    cars.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [cars]);

  return (
    <Paragraph className="cards">
      <Radio.Group
        onChange={(e) => setRadioBtn(e.target.value)}
        value={radioBtn}
        className="radio-btns"
      >
        {radioBtnsText.map((text) => (
          <Radio value={text} key={text}>
            {text}
          </Radio>
        ))}
      </Radio.Group>
      {isLoading ? (
        <Loader />
      ) : (
        <CarList
          cars={cars}
          currentCar={currentCar}
          setColorsOpt={setColorsOpt}
        />
      )}
      <Paragraph className="pagination">
        <PaginationPages
          currentPage={currentPage}
          func={setCurrentPage}
          countPages={countPages}
        />
      </Paragraph>
    </Paragraph>
  );
};
