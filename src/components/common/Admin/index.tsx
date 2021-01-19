import React from 'react';
import { Input, Layout } from 'antd';

import { DataItem } from '../../../interfaces';
import { updateLetterCase } from '../../../helper';
import { translate } from '../../../constants/admin';

import './style.scss';

type TypeInput = {
  value: string;
  name: string;
  setEssence: (essence: DataItem) => void;
  essence: DataItem;
};

export const InputFolder: React.FunctionComponent<TypeInput> = ({
  value,
  name,
  setEssence,
  essence,
}) => {
  return (
    <Layout className="admin-input">
      <label className="label" htmlFor={updateLetterCase(translate[name])}>
        {updateLetterCase(translate[name])}
      </label>
      <Input
        defaultValue={value}
        className="input"
        id={name}
        onChange={(e) => setEssence({ ...essence, [name]: e.target.value })}
      />
    </Layout>
  );
};
