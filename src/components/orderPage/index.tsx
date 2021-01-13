import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import { list, info } from '../../redux/selectors';
import './style.scss';

const { Content } = Layout;

export const OrderPage: React.FunctionComponent = () => {
  const [numberStatus, setNumberStatus] = useState<StatusType>({
    active: 0,
    current: 0,
  });
  const [colorsOpt, setColorsOpt] = useState<string[]>([]);

  const cityData = useSelector(info);
  const pointValue = useSelector(list);

  const checkPoint = pointValue[0].value;

  const { userCity } = cityData;

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
        return <Location userCity={userCity} checkPoint={checkPoint} />;
      case 1:
        return <Cars setColorsOpt={setColorsOpt} />;
      case 2:
        return <Option colorsOpt={colorsOpt} />;
      case 3:
        return <Confirm />;
      default:
        return <ModalWindow setNumberStatus={setNumberStatus} />;
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
