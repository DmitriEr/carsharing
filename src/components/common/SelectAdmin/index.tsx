import React from 'react';
import { Select } from 'antd';

type TypeSelect = {
  defaultValue: string;
  array: string[];
  func: (x: string) => void;
};

export const SelectAdmin: React.FunctionComponent<TypeSelect> = ({
  defaultValue,
  array,
  func,
}) => {
  return (
    <>
      <Select defaultValue={defaultValue} onChange={(value) => func(value)}>
        {array.map((item) => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};
