import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import { DateSelect } from './Date';
import { Lists } from './Lists';
import { price, options } from '../../../constants/orderPage';
import {
  changeColor,
  changeTime,
  changePrice,
  changeOption,
} from '../../../redux/actions';
import { DiffTimeProps } from '../../../interfaces';
import './style.scss';

interface OptionProps {
  colorsOpt: string[];
}

export const Option: React.FunctionComponent<OptionProps> = ({ colorsOpt }) => {
  const dispacth = useDispatch();

  const [color, setColor] = useState<string>();
  const [money, setMoney] = useState<string>();
  const [diffTime, setDiffTime] = useState<DiffTimeProps>({ start: 0, end: 0 });
  const [finishDate, setFinishDate] = useState(Date.now());
  const [momentStart, setMomentStart] = useState();
  const [momentEnd, setMomentEnd] = useState();

  useEffect(() => {
    dispacth(changeColor(color));
  }, [color]);

  useEffect(() => {
    if (money) {
      const [name, number] = money.split(',');
      const tarif = parseInt(number.replace(/\D/g, ''), 10);
      dispacth(changePrice({ value: name, count: tarif }));
    }
  }, [money]);

  useEffect(() => {
    const { start, end } = diffTime;
    const minutes = (end - start) / (60 * 1000);

    const dayCount = Math.floor(minutes / 1440);
    const hourCount = Math.floor((minutes % 1440) / 60);
    const minuteCount = Math.floor(minutes % 60);

    const day = dayCount > 0 ? `${dayCount}д` : '';
    const hour = hourCount > 0 ? `${hourCount}ч` : '';
    const minute = minuteCount > 0 ? `${minuteCount}м` : '';

    if (minutes < 60) {
      dispacth(changeTime({ value: `${minute}`, count: minutes }));
    } else if (minutes >= 60 && minutes < 1440) {
      dispacth(changeTime({ value: `${hour} ${minute}`, count: minutes }));
    } else if (minutes >= 1440 && minutes < 365 * 1440) {
      dispacth(
        changeTime({ value: `${day} ${hour} ${minute}`, count: minutes })
      );
    }
  }, [diffTime]);

  useEffect(() => {
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
        dispacth(changeOption({ value, visibility: false }));
      } else {
        dispacth(changeOption({ value, visibility: true }));
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
        />
      </div>
      <Lists list={price} title={'Тариф'} setOption={setMoney} option={money} />
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
