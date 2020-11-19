import React from 'react';
import classnames from 'classnames';
import { NumberForms } from '../../../interfaces';
import { statuses } from '../../../constants/orderPage';
import './style.scss';

interface TabsInterface {
  numberStatus: NumberForms;
  setNumberStatus: (NumberForms) => void;
}

export const Tabs: React.FunctionComponent<TabsInterface> = ({
  numberStatus,
  setNumberStatus,
}) => {
  const checkCurrentStatus = (ind: number) => {
    return numberStatus.current === ind ? 'status-active' : '';
  };

  const checkPrevStatus = (ind: number) => {
    const prevStatus = statuses.findIndex(
      (_, index) => index === numberStatus.current
    );
    return ind < prevStatus ? 'status-prev' : '';
  };

  const hiddenMobile = (ind: number) => {
    const current = numberStatus.active;
    return ind >= current - 1 && ind <= current + 1 ? '' : 'status-mobile';
  };

  return (
    <div className="statuses">
      {statuses.map((status: string, index: number) => (
        <span
          key={status}
          onClick={() =>
            index <= numberStatus.current
              ? setNumberStatus({ ...numberStatus, active: index })
              : null
          }
          className={classnames(
            'status',
            checkCurrentStatus(index),
            checkPrevStatus(index),
            hiddenMobile(index)
          )}
        >
          {status}
        </span>
      ))}
    </div>
  );
};
