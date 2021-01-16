import React from 'react';
import { Switch, Typography, Layout } from 'antd';

import { TypeTableAdmin } from '../../../../../interfaces';

import './style.scss';

const { Text } = Typography;
const { Content } = Layout;

type TypeSwitch = {
  func: (essence: TypeTableAdmin) => void;
  essence: TypeTableAdmin;
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
      <Text>{trans}</Text>
      <Switch
        onChange={(value) => func({ ...essence, [property]: value })}
        defaultChecked={essence[property]}
        className="switch"
      />
    </Content>
  );
};
