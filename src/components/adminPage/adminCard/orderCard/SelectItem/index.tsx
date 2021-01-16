import React, { useState, useEffect, memo } from 'react';
import { Select, Layout, Typography } from 'antd';
import { TypeTableAdmin } from '../../../../../interfaces';
import { getData } from '../../../../../server/data';
import './style.scss';

type TypeSelect = {
  func: (essence: TypeTableAdmin) => void;
  essence: TypeTableAdmin;
  property: string;
  trans: string;
};

const { Option } = Select;
const { Text } = Typography;
const { Content } = Layout;

const SelectItem: React.FunctionComponent<TypeSelect> = ({
  func,
  essence,
  property,
  trans,
}) => {
  const [array, setArray] = useState<string[]>([]);
  const [name, setName] = useState<string>(essence[property]);

  useEffect(() => {
    if (property !== 'point' && property !== 'color') {
      getData(property).then((value) => {
        const values = value.data.map((item) => {
          return item.name;
        });
        setArray(values);
      });
    }
  }, []);

  useEffect(() => {
    if (property === 'point') {
      getData(property).then((value) => {
        const values = value.data.reduce((prev, item) => {
          if (item.cityId.name === essence.city) {
            prev.push(item.address);
          }
          return prev;
        }, []);
        setArray(values);
      });
    }
  }, [essence.city]);

  useEffect(() => {
    if (property === 'color') {
      getData('car').then((value) => {
        value.data.forEach((item) => {
          if (item.name === essence.car) {
            setArray(item.colors);
          }
        });
      });
    }
  }, [essence.car]);

  useEffect(() => {
    const num = array.findIndex((item) => item === essence[property]);
    num >= 0 ? setName(essence[property]) : setName(array[0]);
  }, [array]);

  return (
    <Content className="settings-item__select">
      <Text>{trans}</Text>
      <Select
        defaultValue={essence[property]}
        className="select"
        value={name}
        onFocus={(event) => event.preventDefault()}
        onChange={(value) => {
          setName(value);
          func({ ...essence, [property]: value });
        }}
      >
        {array.map((item, i) => (
          <Option key={i} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </Content>
  );
};

export default memo(SelectItem);
