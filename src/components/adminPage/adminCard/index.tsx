import React, { useState, useEffect } from 'react';
import { Layout, Progress, Button } from 'antd';

import OrderCard from './orderCard';
import { getById } from '../../../server/getById';
import { deleteById } from '../../../server/deleteById';
import { currentBody } from '../../../helper';
import { InputFolder } from '../../common/Admin';
import { calculateProgress } from '../../../helper';
import { titleTranslate } from '../../../constants/admin';
import { TypeTableAdmin, TypePromiseData } from '../../../interfaces';

import './style.scss';

const { Header, Content, Footer } = Layout;

type TypeCard = {
  essence: TypeTableAdmin;
  setPage: (page: string) => void;
  setEssence: (essence: TypeTableAdmin) => void;
};

export const AdminCard: React.FunctionComponent<TypeCard> = ({
  essence,
  setPage,
  setEssence,
}) => {
  const { page, id, name, description, car } = essence;

  const [nameEssence, setNameEssence] = useState(name);
  const [descriptionEssence, setDescriptionEssence] = useState(description);
  const [dataEssence, setDataEssence] = useState<TypePromiseData>({});

  useEffect(() => {
    getById(page, id).then((item) => setDataEssence(item.data));
  }, []);

  const updateEssence = () => {
    currentBody(page, dataEssence, id, nameEssence, descriptionEssence, car);
  };

  if (page === 'order') {
    return (
      <OrderCard essence={essence} setEssence={setEssence} setPage={setPage} />
    );
  }

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
        </Content>
        <Footer className="footer">
          <div>
            <Button className="save" onClick={updateEssence}>
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
