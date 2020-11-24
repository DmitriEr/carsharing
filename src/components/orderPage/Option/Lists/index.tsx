import React from 'react';
import { Radio } from 'antd';

interface ListsProps {
  title: string;
  setOption: (e: string) => void;
  list: string[];
}

export const Lists: React.FunctionComponent<ListsProps> = ({
  title,
  setOption,
  list,
}) => {
  return (
    <div>
      <div>{title}</div>
      <Radio.Group onChange={(e) => setOption(e.target.value)}>
        {list.map((option) => (
          <Radio value={option} key={option}>
            {option}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};
