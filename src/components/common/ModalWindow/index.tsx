import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { getData } from '../../../server/data';
import { createOrder } from '../../../server/createOrder';
import { StatusType } from '../../../interfaces';
import { list, resultMoney } from '../../../redux/selectors';
import './style.scss';

type ModalType = {
  setNumberStatus: (item: StatusType) => void;
};

export const ModalWindow: React.FunctionComponent<ModalType> = ({
  setNumberStatus,
}) => {
  const [statusId, setStatusId] = useState('');

  const orderValue = useSelector(list);
  const orderMoney = useSelector(resultMoney);

  const order = {
    carId: {
      id: orderValue[1].carId,
    },
    cityId: {
      id: orderValue[0].cityId,
    },
    pointId: {
      id: orderValue[0].pointId,
    },
    rateId: {
      id: orderValue[4].rateId,
    },
    orderStatusId: {
      id: statusId,
    },
    color: orderValue[2].value,
    dateFrom: orderValue[3].start,
    dateTo: orderValue[3].end,
    price: orderMoney,
    isFullTank: orderValue[5].visible,
    isNeedChildChair: orderValue[6].visible,
    isRightWheel: orderValue[7].visible,
  };

  useEffect(() => {
    getData('orderStatus').then(({ data }) => setStatusId(data[0].id));
  }, []);

  useEffect(() => {
    if (statusId.length) {
      createOrder(order).then((value) =>
        localStorage.setItem('id', value.data.id)
      );
    }
  }, [statusId]);

  return (
    <Modal
      title="Подтвердить заказ"
      maskStyle={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        WebkitBoxShadow: 'none',
      }}
      visible={true}
      closable={false}
      centered={true}
      footer={null}
    >
      <Link to={`/carsharing/order/${localStorage.getItem('id')}`}>
        <Button>Подтвердить</Button>
      </Link>
      <Button
        onClick={() => setNumberStatus({ current: 3, active: 3 })}
        className="btn-primary"
      >
        Вернуться
      </Button>
    </Modal>
  );
};
