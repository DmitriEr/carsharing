import React, { useState, useEffect } from 'react';
import { Layout, Progress, Button } from 'antd';

import { OrderCard } from './orderCard';

import { getById } from '../../../server/getById';
import { deleteById } from '../../../server/deleteById';
import { currentBody } from '../../../helper';
import { InputFolder } from '../../common/Admin';
import { calculateProgress } from '../../../helper';
import { titleTranslate } from '../../../constants/admin';
import { TypeTableAdmin } from '../../../interfaces';

import './style.scss';

const { Header, Content, Footer } = Layout;

type TypeCard = {
  essence: TypeTableAdmin;
  setPage: (x: string) => void;
};

export const AdminCard: React.FunctionComponent<TypeCard> = ({
  essence,
  setPage,
}) => {
  const { page, id, name, description, car, city, point } = essence;

  const [nameEssence, setNameEssence] = useState(name);
  const [descriptionEssence, setDescriptionEssence] = useState(description);
  const [carModel, setCarModel] = useState(car);
  const [cityName, setCityName] = useState(city);
  const [pointName, setPointName] = useState(point);
  const [dataEssence, setDataEssence] = useState<any>();

  useEffect(() => {
    getById(page, id).then((item) => setDataEssence(item.data));
  }, []);

  const updateEssence = () => {
    currentBody(page, dataEssence, id, nameEssence, descriptionEssence, car);
  };

  const showOrderCard = () => {
    if (page === 'order') {
      return (
        <OrderCard
          carModel={carModel}
          setCarModel={setCarModel}
          cityName={cityName}
          setCityName={setCityName}
          pointName={pointName}
          setPointName={setPointName}
        />
      );
    }
  };

  return (
    <div className="card-wrapper">
      <Layout className="card">
        <Layout className="name-wrapper">
          <Content>{name}</Content>
        </Layout>
        <Layout className="percent-wrapper">
          <Content>
            <div className="percent">
              <span>Заполнено:</span>
              <span>{`${calculateProgress(name, description)}%`}</span>
            </div>
            <Progress
              percent={calculateProgress(name, description)}
              status="active"
              showInfo={false}
            />
          </Content>
        </Layout>
        <Layout className="description-wrapper">
          Описание:
          <Content className="description">{description}</Content>
        </Layout>
      </Layout>
      <Layout className="form">
        <Header className="header">{`Настройка ${
          titleTranslate[essence.page]
        }`}</Header>
        <Content className="content">
          <InputFolder
            value={nameEssence}
            name={'Наименование'}
            setNameEssence={setNameEssence}
          />
          <InputFolder
            value={descriptionEssence}
            name={'Описание'}
            setNameEssence={setDescriptionEssence}
          />
          {showOrderCard()}
        </Content>
        <Footer className="footer">
          <div>
            <Button className="save" onClick={() => updateEssence()}>
              Сохранить
            </Button>
            <Button onClick={() => setPage(page)} className="cancel">
              Отменить
            </Button>
          </div>
          <Button onClick={() => deleteById(id, page)} className="delete">
            Удалить
          </Button>
        </Footer>
      </Layout>
    </div>
  );
};
