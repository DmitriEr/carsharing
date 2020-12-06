import React, { useEffect } from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { list, resultMoney } from '../../../redux/selectors';
import { resultBtnsText } from '../../../constants/orderPage';
import { NumberForms } from '../../../interfaces';
import { calculatPrice } from '../../../redux/actions';
import './style.scss';

interface ResultInterface {
  numberStatus: NumberForms;
  switchForm: () => void;
}

export const Result: React.FunctionComponent<ResultInterface> = ({
  numberStatus,
  switchForm,
}) => {
  const dispatch = useDispatch();

  const orderList = useSelector(list);
  const results = useSelector(resultMoney);
  const [, car, color, date, price, petrol, seat, steer] = orderList;

  const checkOption = (bool, value) => (bool ? value : 0);

  useEffect(() => {
    let result;
    if (price.count === 7) {
      result =
        date.count * price.count +
        checkOption(petrol.visible, petrol.count) +
        checkOption(seat.visible, seat.count) +
        checkOption(steer.visible, steer.count);
    } else {
      result =
        (date.count / 1440) * price.count +
        checkOption(petrol.visible, petrol.count) +
        checkOption(seat.visible, seat.count) +
        checkOption(steer.visible, steer.count);
    }

    dispatch(calculatPrice(parseInt(result, 10)));
  }, [price, date, petrol, seat, steer]);

  const checkStatus = () => {
    if (
      numberStatus.active <= 1 &&
      orderList[numberStatus.active].value.length
    ) {
      return true;
    } else if (
      color.value &&
      date.value &&
      price.value &&
      results >= orderList[1].min &&
      results <= orderList[1].max
    ) {
      return true;
    }
  };

  const showMoney = () => {
    switch (numberStatus.active) {
      case 1:
        return `${car.min}-${car.max}`;
      case 2:
        return results;
      default:
        return '';
    }
  };

  const showTitle = () => {
    if (numberStatus.active === 2) {
      if (results < orderList[1].min) {
        return `Минимальная сумма заказа ${orderList[1].min}`;
      } else if (results > orderList[1].max) {
        return `Максимальная сумма заказа ${orderList[1].max}`;
      }
    }
  };

  return (
    <div className="result">
      <h2>Ваш заказ</h2>
      {orderList.map(({ name, value, orderNumber, visible }) => {
        if (orderNumber <= numberStatus.current && visible) {
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
        <span>{'Цена: '}</span>
        <span>{showMoney()}</span>
      </div>
      <Button
        disabled={checkStatus() ? false : true}
        onClick={switchForm}
        className={
          checkStatus()
            ? classnames('btn', 'btn-active')
            : classnames('btn', 'btn-disable')
        }
        title={showTitle()}
      >
        {resultBtnsText[numberStatus.active]}
      </Button>
    </div>
  );
};
