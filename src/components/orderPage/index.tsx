import React, { useState } from 'react';
import { Layout } from 'antd';
import { Location } from './Location';
import { Cars } from './Cars';
import { SideBar } from '../../components/common/SideBar';
import { Head } from '../common/Head';
import { Result } from './Result';
import { Tabs } from './Tabs';
import { Option } from './Option';
import { Confirm } from './Confirm';
import { StatusType } from '../../interfaces';
import { ModalWindow } from '../common/ModalWindow';
import './style.scss';

const { Content } = Layout;

export const OrderPage: React.FunctionComponent = () => {
  const [numberStatus, setNumberStatus] = useState<StatusType>({
    active: 0,
    current: 0,
  });
  const [colorsOpt, setColorsOpt] = useState<string[]>([]);

  // const test = {
  //   carId: {
  //     id: '5ea166b8099b810b946c62b6',
  //   },
  //   cityId: {
  //     id: '5e26a128099b810b946c5d87',
  //   },
  //   pointId: {
  //     id: '5e26a148099b810b946c5d88',
  //   },
  //   rateId: {
  //     id: '5e26a0d2099b810b946c5d85',
  //   },
  //   orderStatusId: {
  //     id: '5e26a191099b810b946c5d89',
  //   },
  //   color: 'синий',
  //   dateFrom: 200,
  //   dateTo: 2202,
  //   price: 10,
  //   isFullTank: true,
  //   isNeedChildChair: true,
  //   isRightWheel: true,
  // };

  // useEffect(() => {
  //   createOrder(test).then((data) => console.log(data));
  // }, []);
  //

  const switchForm = () => {
    const nextStatus = numberStatus.active + 1;
    if (nextStatus > numberStatus.current) {
      setNumberStatus({
        current: nextStatus,
        active: nextStatus,
      });
    } else {
      setNumberStatus({ ...numberStatus, active: nextStatus });
    }
  };

  const showCurrentStatus = () => {
    switch (numberStatus.active) {
      case 0:
        return <Location />;
      // return <ModalWindow setNumberStatus={setNumberStatus} />;
      case 1:
        return <Cars setColorsOpt={setColorsOpt} />;
      case 2:
        return <Option colorsOpt={colorsOpt} />;
      case 3:
        return <Confirm />;
      default:
        return <ModalWindow setNumberStatus={setNumberStatus} />;
      // createOrder({
      //   orderStatusId: {},
      //   cityId: {},
      //   pointId: {},
      //   carId: {},
      //   color: 'string',
      //   dateFrom: 0,
      //   dateTo: 0,
      //   rateId: {},
      //   price: 0,
      //   isFullTank: true,
      //   isNeedChildChair: true,
      //   isRightWheel: true,
      // }).then((data) => console.log(data));
    }
  };

  return (
    <Layout
      className="order-page"
      style={{ overflow: 'hidden', background: '#fff' }}
    >
      <SideBar />
      <Content className="wrapper">
        <Layout>
          <Head />
          <Content className="tabs">
            <Tabs
              numberStatus={numberStatus}
              setNumberStatus={setNumberStatus}
            />
          </Content>
          <Content className="content">
            <div className="forms">{showCurrentStatus()}</div>
            <Result numberStatus={numberStatus} switchForm={switchForm} />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};
