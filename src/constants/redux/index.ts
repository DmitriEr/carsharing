import { OrderType } from '../../interfaces';

export const initState: OrderType[] = [
  {
    name: 'Пункт выдачи',
    value: '',
    orderNumber: 0,
  },
  {
    name: 'Модель',
    value: '',
    orderNumber: 1,
  },
  {
    name: 'Цвет',
    value: '',
    orderNumber: 2,
  },
  {
    name: 'Длительность аренды',
    value: '',
    orderNumber: 2,
    count: 0,
  },
  {
    name: 'Тариф',
    value: '',
    orderNumber: 2,
    count: 0,
  },
  {
    name: 'Полный бак',
    value: '',
    orderNumber: 2,
  },
];
