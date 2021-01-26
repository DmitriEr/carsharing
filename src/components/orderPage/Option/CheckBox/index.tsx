import React from 'react';
import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';

import { changeOption } from '../../../../redux/actions';
import { list } from '../../../../redux/selectors';

type CheckBoxType = {
  index: number;
};

export const CheckBox: React.FunctionComponent<CheckBoxType> = ({ index }) => {
  const dispacth = useDispatch();

  const currentValue = useSelector(list);

  const onChange = (e: CheckboxChangeEvent) => {
    dispacth(changeOption({ ind: index, visible: e.target.checked }));
  };

  return (
    <Checkbox
      defaultChecked={currentValue[index].visible}
      onChange={onChange}
      className="checkbox"
    >
      {`${currentValue[index].name}, ${currentValue[index].count}₽`}
    </Checkbox>
  );
};
