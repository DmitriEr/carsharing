import React from 'react';
import { useDispatch } from 'react-redux';
import { Select } from 'antd';
import {
  GenericActionString,
  GenericActionPoint,
  pointInfo,
} from '../../../../interfaces';
import { otherCity } from '../../../../constants/orderPage';

const { Option } = Select;

interface AddressType {
  options: pointInfo[];
  name: string;
  changeOption: (item) => GenericActionString | GenericActionPoint;
  initValue: string;
  deletePoint?: (item: pointInfo) => GenericActionPoint;
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
      dispatch(deletePoint(otherCity));
      dispatch(changeOption(item));
    } else {
      options.forEach((name) => {
        name.value == item ? dispatch(changeOption(name)) : null;
      });
    }
  };

  return (
    <Select
      placeholder={`Начните вводить ${name}`}
      className="select"
      showArrow={false}
      showSearch={true}
      bordered={false}
      onChange={(value: string) => {
        addAddressToState(value);
      }}
      value={initValue}
    >
      {options.map((item, index) => (
        <Option value={item.value} label={item.value} key={index}>
          {item.value}
        </Option>
      ))}
    </Select>
  );
};
