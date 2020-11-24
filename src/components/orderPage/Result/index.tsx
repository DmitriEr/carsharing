import React from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { list } from '../../../redux/selectors';
import { statuses } from '../../../constants/orderPage';
import { NumberForms } from '../../../interfaces';
import './style.scss';

interface ResultInterface {
  numberStatus: NumberForms;
  switchForm: () => void;
}

export const Result: React.FunctionComponent<ResultInterface> = ({
  numberStatus,
  switchForm,
}) => {
  const orderList = useSelector(list);

  const checkStatus = () => {
    if (
      numberStatus.active <= 1 &&
      orderList[numberStatus.active].value.length
    ) {
      return true;
    }
  };

  return (
    <div className="result">
      <h2>Ваш заказ</h2>
      {orderList.map(({ name, value, orderNumber }) => {
        if (orderNumber <= numberStatus.current) {
          return (
            <div className="list" key={name}>
              <div className="dots link">
                <span className="field">{name}</span>
              </div>
              <span className="address">{value}</span>
            </div>
          );
        }
      })}
      <div className="price">
        <span>Цена:</span> от 8 000 до 12 000 ₽
      </div>
      <Button
        disabled={checkStatus() ? false : true}
        onClick={() => switchForm()}
        className={
          checkStatus()
            ? classnames('btn', 'btn-active')
            : classnames('btn', 'btn-disable')
        }
      >
        {statuses[numberStatus.active + 1]}
      </Button>
    </div>
  );
};
