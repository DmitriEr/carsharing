import React from 'react';
import { Space, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Moment } from 'moment';
import moment from 'moment';
import { list } from '../../../../redux/selectors';
import { changeModel } from '../../../../redux/actions';
import { DiffTimeProps } from '../../../../interfaces';
import './style.scss';

interface DateProps {
  queue: boolean;
  setDiffTime: ({ start, end }: DiffTimeProps) => void;
  diffTime: DiffTimeProps;
  disabledDate: (current, option) => boolean;
  option?: Date | number;
  setMomentStart?: (value) => void;
  setMomentEnd?: (value) => void;
  moments: Moment;
  defaultTime: number;
}

const formatter = new Intl.DateTimeFormat('ru', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

export const DateSelect: React.FunctionComponent<DateProps> = ({
  queue,
  setDiffTime,
  diffTime,
  disabledDate,
  option,
  moments,
  setMomentStart,
  setMomentEnd,
  defaultTime,
}) => {
  const dispatch = useDispatch();

  const carData = useSelector(list)[1];

  const getDatahandler = (value) => {
    const timeToSeconds = value._d.getTime();
    if (queue) {
      setDiffTime({ ...diffTime, end: timeToSeconds });
      setMomentEnd(value);
    } else {
      setDiffTime({ ...diffTime, start: timeToSeconds });
      setMomentStart(value);
      dispatch(
        changeModel({ ...carData, time: formatter.format(new Date(value._d)) })
      );
    }
  };

  const updateValue = (value) => {
    if (value === null) {
      if (queue) {
        setMomentEnd(null);
      } else {
        setMomentStart(null);
        setMomentEnd(null);
        setDiffTime({ start: 0, end: 0 });
        dispatch(changeModel({ ...carData, time: '' }));
      }
    }
  };

  return (
    <div>
      <span className="date-value">{queue ? 'По' : 'C'}</span>
      <Space direction="vertical" size={300} className="date-picker">
        <DatePicker
          showTime={{ format: 'HH:mm' }}
          className="date"
          format="DD-MM-YYYY HH:mm"
          disabledDate={(current) => disabledDate(current, option)}
          onOk={getDatahandler}
          allowClear={true}
          bordered={false}
          placeholder={'Выберите дату и время'}
          value={moments}
          onChange={(e) => updateValue(e)}
          disabled={queue && diffTime.start === 0 ? true : false}
          defaultValue={defaultTime !== 0 ? moment(defaultTime) : null}
        />
      </Space>
    </div>
  );
};
