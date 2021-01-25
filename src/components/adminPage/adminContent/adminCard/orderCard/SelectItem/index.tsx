import React, { useState, useEffect, memo } from 'react';
import { Select, Layout, Typography } from 'antd';

import { DataItem } from '../../../../../../interfaces';
import { getData } from '../../../../../../server/data';
import { error } from '../../../../../../constants/admin';

import './style.scss';

type TypeSelect = {
  func: (essence: DataItem) => void;
  essence: DataItem;
  property: string;
  trans: string;
  setPage: (page: string) => void;
};

const { Option } = Select;
const { Text } = Typography;
const { Content } = Layout;

const SelectItem: React.FunctionComponent<TypeSelect> = ({
  func,
  essence,
  property,
  trans,
  setPage,
}) => {
  const [array, setArray] = useState<{ [name: string]: string }[]>([{}]);
  const [name, setName] = useState(essence[property].name);

  useEffect(() => {
    if (property !== 'point' && property !== 'color') {
      getData(property)
        .then((value) => {
          const values = value.data.map(({ name, id }) => {
            return { name, id };
          });
          setArray(values);
        })
        .catch(() => setPage(error));
    }
  }, []);

  useEffect(() => {
    if (property === 'color') {
      getData('car')
        .then((value) => {
          value.data.forEach(({ name, colors, id }) => {
            if (name === essence.car.name) {
              const color = colors.map((name) => ({ name, id }));
              setArray(color);
            }
          });
        })
        .catch(() => setPage(error));
    }

    if (property === 'point') {
      getData(property)
        .then((value) => {
          const values = value.data.reduce((prev, { address, id, cityId }) => {
            if (cityId.name === essence.city.name) {
              prev.push({ name: address, id });
            }
            return prev;
          }, []);
          setArray(values);
        })
        .catch(() => setPage(error));
    }
  }, [essence]);

  useEffect(() => {
    const num = array.findIndex(({ name }) => name === essence[property].name);
    const anyName = array.length === 0 ? '' : array[0].name;
    num >= 0 ? setName(essence[property].name) : setName(anyName);
  }, [array, setName]);

  return (
    <Content className="settings-item__select">
      <Text className="name">{trans}</Text>
      <Select
        defaultValue={essence[property].name}
        className="select"
        value={name}
        onChange={(value) => {
          setName(value);
          const current = array.filter(({ name }) => name === value);
          func({ ...essence, [property]: current[0] });
        }}
      >
        {array.map(({ name }, i) => (
          <Option key={i} value={name}>
            {name}
          </Option>
        ))}
      </Select>
    </Content>
  );
};

export default memo(SelectItem);
