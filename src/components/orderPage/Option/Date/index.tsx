import React from 'react';
import { Space, DatePicker } from 'antd';
import { Moment } from 'moment';
import { DiffTimeProps } from '../../../../interfaces';

interface DateProps {
  queue: boolean;
  setDiffTime: ({ start, end }: DiffTimeProps) => void;
  diffTime: DiffTimeProps;
  disabledDate: (current, option) => boolean;
  option?: Date | number;
  setMomentStart?: (value) => void;
  setMomentEnd?: (value) => void;
  moments: Moment;
}

export const DateSelect: React.FunctionComponent<DateProps> = ({
  queue,
  setDiffTime,
  diffTime,
  disabledDate,
  option,
  moments,
  setMomentStart,
  setMomentEnd,
}) => {
  const getDatahandler = (value) => {
    const timeToSeconds = value._d.getTime();
    if (queue) {
      setDiffTime({ ...diffTime, end: timeToSeconds });
      setMomentEnd(value);
    } else {
      setDiffTime({ ...diffTime, start: timeToSeconds });
      setMomentStart(value);
    }
  };

  const updateValue = (value) => {
    if (value === null) {
      if (queue) {
        setMomentEnd(null);
      } else {
        setMomentStart(null);
        setMomentEnd(null);
      }
    }
  };

  return (
    <div>
      <span>{queue ? 'По' : 'C'}</span>
      <Space direction="vertical" size={224}>
        <DatePicker
          showTime={{ format: 'HH:mm' }}
          format="DD-MM-YYYY HH:mm"
          disabledDate={(current) => disabledDate(current, option)}
          onOk={getDatahandler}
          allowClear={true}
          bordered={false}
          placeholder={'Выберите дату и время'}
          value={moments}
          onChange={(e) => updateValue(e)}
        />
      </Space>
    </div>
  );
};
