import React from 'react';
import { DatePicker, Typography, Layout } from 'antd';
import moment from 'moment';

import { DataItem } from '../../../../../interfaces';

import './style.scss';

const { Text } = Typography;
const { Content } = Layout;

type TypeDate = {
  func: (essence: DataItem) => void;
  essence: DataItem;
  property: number;
};

export const DateItem: React.FunctionComponent<TypeDate> = ({
  func,
  essence,
  property,
}) => {
  const title = property === 0 ? 'C' : 'До';

  const path = property === 0 ? 'dateFrom' : 'dateTo';

  const handleOk = (value) => func({ ...essence, [path]: value._d.getTime() });

  return (
    <Content className="settings-item__data">
      <Text>{title}</Text>
      <DatePicker
        showTime={{ format: 'HH:mm' }}
        format="DD-MM-YYYY HH:mm"
        defaultValue={moment(essence[path])}
        onOk={handleOk}
        className="date"
      />
    </Content>
  );
};
