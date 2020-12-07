import React from 'react';
import { useDispatch } from 'react-redux';
import { Select } from 'antd';
import { GenericActionString } from '../../../../interfaces';

const { Option } = Select;

interface AddressType {
  options: string[];
  name: string;
  changeOption: (item: string) => GenericActionString;
  initValue: string;
  deletePoint?: (item: string) => GenericActionString;
  deleteOption: boolean;
}

export const SelectAddress: React.FunctionComponent<AddressType> = ({
  options,
  name,
  changeOption,
  initValue,
  deletePoint,
  deleteOption,
}) => {
  const dispatch = useDispatch();

  const addAddressToState = (item: string) => {
    if (deleteOption) {
      dispatch(deletePoint(''));
    }
    dispatch(changeOption(item));
  };

  return (
    <Select
      placeholder={`Начните вводить ${name}`}
      className="select"
      showArrow={false}
      showSearch={true}
      bordered={false}
      onChange={(value: string) => addAddressToState(value)}
      value={initValue}
    >
      {options.map((item: string) => (
        <Option value={item} label={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
};
