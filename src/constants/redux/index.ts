import { OrderType } from '../../interfaces';

export const initState: OrderType[] = [
  {
    name: 'Пункт выдачи',
    value: '',
    orderNumber: 0,
    visible: true,
  },
  {
    name: 'Модель',
    value: '',
    orderNumber: 1,
    visible: true,
    min: 0,
    max: 0,
    number: '',
    pathImg: '',
    time: '',
  },
  {
    name: 'Цвет',
    value: '',
    orderNumber: 2,
    visible: true,
  },
  {
    name: 'Длительность аренды',
    value: '',
    orderNumber: 2,
    count: 0,
    visible: true,
  },
  {
    name: 'Тариф',
    value: '',
    orderNumber: 2,
    count: 0,
    visible: true,
  },
  {
    name: 'Полный бак',
    value: 'Да',
    orderNumber: 2,
    count: 500,
    visible: false,
  },
  {
    name: 'Детское кресло',
    value: 'Да',
    orderNumber: 2,
    count: 200,
    visible: false,
  },
  {
    name: 'Правый руль',
    value: 'Да',
    orderNumber: 2,
    count: 1600,
    visible: false,
  },
];
