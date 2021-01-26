import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Typography } from 'antd';

import { DateSelect } from './Date';
import { Lists } from './Lists';
import { CheckBox } from './CheckBox';
import { changeColor, changeTime, changePrice } from '../../../redux/actions';
import { DiffTimeProps } from '../../../interfaces';
import { getData } from '../../../server/data';
import { getTimeToString } from '../../../helper';
import { list } from '../../../redux/selectors';

import './style.scss';

const { Text } = Typography;
const { Content } = Layout;
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
    getData('rate').then(({ data }) => {
      const newValue = data.map(({ price, rateTypeId }) => {
        return `${rateTypeId.name}, ${price}₽`;
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
      rate.forEach(({ id, price, rateTypeId }) => {
        if (rateTypeId.name === name) {
          dispacth(changePrice({ value: name, count: price, rateId: id }));
        }
      });
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

  return (
    <Content className="options-wrapper">
      <Lists
        list={colorsOpt}
        title={'Цвет'}
        setOption={setColor}
        option={color}
        currentValue={currentValue[2].value}
      />
      <Content className="date-wrapper">
        <Text className="title">Дата аренды</Text>
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
      </Content>
      <Lists
        list={price}
        title={'Тариф'}
        setOption={setMoney}
        option={money}
        currentValue={`${currentValue[4].value}, ${currentValue[4].count}₽`}
      />
      <Content className="checkbox-wrapper">
        <Text className="title">Доп услуги</Text>
        <CheckBox index={5} />
        <CheckBox index={6} />
        <CheckBox index={7} />
        {/* <Checkbox.Group
          options={options}
          onChange={selectOption}
          className="checkbox"
        /> */}
      </Content>
    </Content>
  );
};
