import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { changePoint } from '../../../../redux/actions';
import { RootReducer } from '../../../../interfaces';

const { Option } = Select;

interface AddressType {
  options: string[];
  name: string;
  changeOption: (item: string) => { type: string; payload: string };
  initValue?: string;
}

export const SelectAddress: React.FunctionComponent<AddressType> = ({
  options,
  name,
  changeOption,
  initValue,
}) => {
  const dispatch = useDispatch();

  const info = (state: RootReducer) => state.information;

  const cityData = useSelector(info);

  const { userCity } = cityData;

  useEffect(() => {
    dispatch(changePoint(''));
  }, [userCity]);

  const addAddressToState = (item: string) => {
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
