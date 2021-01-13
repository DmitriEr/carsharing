import React from 'react';
import { Input, Image, Select } from 'antd';
import notifications from '../../../assets/admin/Notifications.svg';
import shape from '../../../assets/admin/Shape.svg';
import './style.scss';

export const AdminHeader: React.FunctionComponent = () => (
  <>
    <Input
      className="input"
      placeholder="Поиск"
      bordered={false}
      prefix={<Image src={shape} alt="shape" />}
    />
    <div className="notifications">
      <Image src={notifications} alt="notifications" preview={false} />
    </div>
    <Select className="admins" defaultValue="Admin" bordered={false}>
      <Select.Option value="Admin">Admin</Select.Option>
    </Select>
  </>
);
