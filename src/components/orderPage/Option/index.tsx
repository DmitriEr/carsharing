import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'antd';
import { DateSelect } from './Date';
import { Lists } from './Lists';
import { options } from '../../../constants/orderPage';
import {
  changeColor,
  changeTime,
  changePrice,
  changeOption,
} from '../../../redux/actions';
import { DiffTimeProps } from '../../../interfaces';
import { getRate } from '../../../server/data';
import { getTimeToString } from '../../../helper';
import { list } from '../../../redux/selectors';
import './style.scss';

interface OptionProps {
  colorsOpt: string[];
}

export const Option: React.FunctionComponent<OptionProps> = ({ colorsOpt }) => {
  const dispacth = useDispatch();

  const currentValue = useSelector(list);

  const [color, setColor] = useState<string>();
  const [money, setMoney] = useState<string>();
  const [price, setPrice] = useState<string[]>([]);
  const [rate, setRates] = useState([]);
  const [diffTime, setDiffTime] = useState<DiffTimeProps>({
    start: currentValue[3].start,
    end: currentValue[3].end,
  });
  const [finishDate, setFinishDate] = useState(Date.now());
  const [momentStart, setMomentStart] = useState();
  const [momentEnd, setMomentEnd] = useState();

  useEffect(() => {
    getRate().then(({ data }) => {
      const newValue = data.map(({ price, rateTypeId }) => {
        return `${rateTypeId.name}, ${price}₽/${rateTypeId.unit}`;
      });
      setRates(data);
      setPrice(newValue);
    });
  }, []);

  useEffect(() => {
    if (color && typeof color !== 'undefined') {
      dispacth(changeColor(color));
    }
  }, [color]);

  useEffect(() => {
    if (money) {
      const [name] = money.split(',');
      rate.forEach(({ id, price, rateTypeId }) =>
        rateTypeId.name === name
          ? dispacth(changePrice({ value: name, count: price, rateId: id }))
          : null
      );
    }
  }, [money]);

  useEffect(() => {
    const { start, end } = diffTime;
    const minutes = (end - start) / (60 * 1000);
    dispacth(
      changeTime({
        value: getTimeToString(start, end),
        count: minutes,
        start,
        end,
      })
    );
    setFinishDate(diffTime.start);
  }, [diffTime]);

  const disabledDate = (value, option) => {
    const selectedDate = value._d;
    return new Date(option).valueOf() >= new Date(selectedDate).valueOf();
  };

  const selectOption = (checkedValues) => {
    options.forEach((item) => {
      const [value] = item.split(',');
      const checkValue = checkedValues.find((value) => value === item);
      if (checkValue === undefined) {
        dispacth(changeOption({ value, visible: false }));
      } else {
        dispacth(changeOption({ value, visible: true }));
      }
    });
  };

  return (
    <div className="options-wrapper">
      <Lists
        list={colorsOpt}
        title={'Цвет'}
        setOption={setColor}
        option={color}
        currentValue={currentValue[2].value}
      />
      <div className="date-wrapper">
        <div className="title">Дата аренды</div>
        <DateSelect
          queue={false}
          setDiffTime={setDiffTime}
          diffTime={diffTime}
          disabledDate={disabledDate}
          option={Date.now()}
          setMomentEnd={setMomentEnd}
          setMomentStart={setMomentStart}
          moments={momentStart}
          defaultTime={diffTime.start}
        />
        <DateSelect
          queue={true}
          setDiffTime={setDiffTime}
          diffTime={diffTime}
          disabledDate={disabledDate}
          option={finishDate}
          setMomentStart={setMomentStart}
          setMomentEnd={setMomentEnd}
          moments={momentEnd}
          defaultTime={diffTime.end}
        />
      </div>
      <Lists
        list={price}
        title={'Тариф'}
        setOption={setMoney}
        option={money}
        currentValue={`${currentValue[4].value}, ${currentValue[4].count}₽/мин`}
      />
      <div className="checkbox-wrapper">
        <div className="title">Доп услуги</div>
        <Checkbox.Group
          options={options}
          onChange={selectOption}
          className="checkbox"
        />
      </div>
    </div>
  );
};
