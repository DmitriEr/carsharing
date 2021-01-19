import React, { useEffect, useState } from 'react';
import { Select, Typography, Layout } from 'antd';

import { getData } from '../../../../../server/data';

import { DataItem } from '../../../../../interfaces';
import { translate } from '../../../../../constants/admin';

import './style.scss';

const { Option } = Select;
const { Text } = Typography;

type TypeOption = {
  essence: DataItem;
  setEssence: (essence: DataItem) => void;
};

export const SelectOption: React.FunctionComponent<TypeOption> = ({
  essence,
  setEssence,
}) => {
  const [array, setArray] = useState<{ id: string; name: string }[]>([]);
  const [item, setItem] = useState('');

  const { page } = essence;
  const source = page === 'car' ? 'category' : 'city';

  useEffect(() => {
    getData(source).then((item) => {
      const result = item.data.map(({ id, name }) => ({ id, name }));
      setArray(result);
    });
  }, []);

  const onHadleValue = (value) => {
    setItem(value);
    const objWithId = array.filter(({ name }) => name === value);
    if (page === 'car') {
      setEssence({ ...essence, ['categoryId']: objWithId[0] });
    } else {
      setEssence({ ...essence, ['cityId']: objWithId[0] });
    }
  };

  if (page === 'car' || page === 'point') {
    return (
      <Layout className="select-option">
        <Text className="title-option">{translate[source]}</Text>
        <Select
          style={{ width: '100%' }}
          defaultValue={item}
          value={item}
          placeholder={`Выберите ${translate[source]}`}
          onChange={onHadleValue}
        >
          {array.map(({ name }, i) => (
            <Option key={i} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </Layout>
    );
  }
};
