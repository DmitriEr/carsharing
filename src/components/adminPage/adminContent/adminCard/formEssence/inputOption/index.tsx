import React, { useEffect, useState } from 'react';
import { Input, Layout } from 'antd';

import { DataItem } from '../../../../../../interfaces';

import './style.scss';

type TypeInput = {
  essence: DataItem;
  setEssence: (essence: DataItem) => void;
};

export const InputOption: React.FunctionComponent<TypeInput> = ({
  essence,
  setEssence,
}) => {
  const [array, setArray] = useState<string[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    setEssence({ ...essence, ['colors']: array });
  }, [array]);

  const onHandlerInput = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.target['value']);
  };

  const onEnterInput = () => {
    setArray([...array, text]);
    setText('');
  };

  const onHandlerColor = (value: string, num: number) => {
    const newArray = array.filter((item, ind) => {
      if (item !== value && ind !== num) {
        return true;
      }
    });
    setArray(newArray);
  };

  return (
    <Layout className="input-option">
      <span className="title-option">Цвета</span>
      <Input
        value={text}
        onChange={onHandlerInput}
        onPressEnter={onEnterInput}
        className="input"
      />
      <Layout className="color-wrapper">
        {array.map((string, i) => (
          <span
            key={string}
            style={{ background: array[i] }}
            className="color"
            onClick={() => onHandlerColor(string, i)}
          >
            {string}
          </span>
        ))}
      </Layout>
    </Layout>
  );
};
