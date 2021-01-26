import React from 'react';
import { Radio, Layout, Typography } from 'antd';
import classnames from 'classnames';

import './style.scss';

const { Text } = Typography;
const { Content } = Layout;

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
    <Content className="select-wrapper">
      <Text className="title">{title}</Text>
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
    </Content>
  );
};
