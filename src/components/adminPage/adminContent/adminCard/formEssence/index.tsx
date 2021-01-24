import React from 'react';
import { Layout, Button } from 'antd';

import { SelectOption } from './selectOption';
import { InputOption } from './inputOption';

import { deleteById } from '../../../../../server/deleteById';
import { updateById } from '../../../../../server/updateById';
import { InputFolder } from '../../../../common/Admin';
import { create } from '../../../../../server/create';
import { translate, columns, extraKeys } from '../../../../../constants/admin';

import { DataItem } from '../../../../../interfaces';

const { Footer, Content, Header } = Layout;

type FormType = {
  essence: DataItem;
  setPage: (page: string) => void;
  setEssence: (essence: DataItem) => void;
};

export const FormEssence: React.FunctionComponent<FormType> = ({
  essence,
  setEssence,
  setPage,
}) => {
  const { id, page } = essence;

  const updateEssence = () => {
    const newEssence = { ...essence };
    extraKeys.forEach((key) => delete newEssence[key]);

    id !== 'new' ? updateById(id, newEssence, page) : create(newEssence, page);
    setPage(page);
  };

  const showCarOption = () => {
    if (page === 'car' && id === 'new') {
      return <InputOption essence={essence} setEssence={setEssence} />;
    }
  };

  const showCarPointSelect = () => {
    if (
      (page === 'car' && id === 'new') ||
      (page === 'point' && id === 'new')
    ) {
      return <SelectOption essence={essence} setEssence={setEssence} />;
    }
  };

  return (
    <>
      <Header className="header">{`Настройка ${translate[page]}`}</Header>
      <Content className="content">
        {columns[page].map((item) => {
          return (
            <InputFolder
              key={item}
              essence={essence}
              setEssence={setEssence}
              value={essence[item]}
              name={item}
            />
          );
        })}
        {showCarPointSelect()}
        {showCarOption()}
      </Content>
      <Footer className="footer">
        <>
          <Button className="save" onClick={updateEssence}>
            Сохранить
          </Button>
          <Button onClick={() => setPage(page)} className="cancel">
            Отменить
          </Button>
        </>
        <Button onClick={() => deleteById(id, page)} className="delete">
          Удалить
        </Button>
      </Footer>
    </>
  );
};
