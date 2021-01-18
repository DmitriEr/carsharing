import React from 'react';
import { Switch, Typography, Layout } from 'antd';

import { DataItem } from '../../../../../interfaces';

import './style.scss';

const { Text } = Typography;
const { Content } = Layout;

type TypeSwitch = {
  func: (essence: DataItem) => void;
  essence: DataItem;
  property: string;
  trans: string;
};

export const SwitchItem: React.FunctionComponent<TypeSwitch> = ({
  func,
  essence,
  property,
  trans,
}) => {
  return (
    <Content className="settings-item__switch">
      <Text className="name">{trans}</Text>
      <Switch
        onChange={(value) => func({ ...essence, [property]: value })}
        defaultChecked={essence[property]}
        className="switch"
      />
    </Content>
  );
};
