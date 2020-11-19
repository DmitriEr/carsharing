import React from 'react';
import { Spin } from 'antd';

interface SpinInterface {
  condition: boolean;
}

export const Loader: React.FunctionComponent<SpinInterface> = ({
  condition,
}) => {
  if (condition) {
    return <Spin />;
  }
  return null;
};
