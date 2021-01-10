import React from 'react';
import { Input, Layout } from 'antd';

import './style.scss';

type TypeInput = {
  value: string;
  name: string;
  setNameEssence: (x: string) => void;
};

export const InputFolder: React.FunctionComponent<TypeInput> = ({
  value,
  name,
  setNameEssence,
}) => {
  return (
    <Layout className="admin-input">
      <label className="label" htmlFor={name}>
        {name}
      </label>
      <Input
        defaultValue={value}
        className="input"
        id={name}
        onChange={(e) => setNameEssence(e.target.value)}
      />
    </Layout>
  );
};
