import React from 'react';
import { Radio } from 'antd';
import classnames from 'classnames';
import './style.scss';

interface ListsProps {
  title: string;
  setOption: (e: string) => void;
  list: string[];
  option: string;
  currentValue: string;
}

export const Lists: React.FunctionComponent<ListsProps> = ({
  title,
  setOption,
  list,
  option,
  currentValue,
}) => {
  return (
    <div className="select-wrapper">
      <div className="title">{title}</div>
      <Radio.Group
        onChange={(e) => setOption(e.target.value)}
        className="select-values"
        value={currentValue}
      >
        {list.map((item) => (
          <Radio
            value={item}
            key={item}
            className={
              option === item ? classnames('active', 'value') : 'value'
            }
          >
            {item}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};
