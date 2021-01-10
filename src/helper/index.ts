import { updateById } from '../server/updateById';

export const getTimeToString = (start, end) => {
  const minutes = (end - start) / (60 * 1000);

  const dayCount = Math.floor(minutes / 1440);
  const hourCount = Math.floor((minutes % 1440) / 60);
  const minuteCount = Math.floor(minutes % 60);

  const day = dayCount > 0 ? `${dayCount}д` : '';
  const hour = hourCount > 0 ? `${hourCount}ч` : '';
  const minute = minuteCount > 0 ? `${minuteCount}м` : '';

  if (minutes < 60) {
    return `${minute}`;
  } else if (minutes >= 60 && minutes < 1440) {
    return `${hour} ${minute}`;
  } else if (minutes >= 1440 && minutes < 365 * 1440) {
    return `${day} ${hour} ${minute}`;
  }
};

export const random = () => Math.random().toString(36).substr(2, 7);

export const getCurrentName = (state: string, value) => {
  switch (state) {
    case 'rate':
      return value.rateTypeId.name;
    default:
      return value.name;
  }
};

export const getCurrentOption = (state: string, value) => {
  switch (state) {
    case 'car':
      return value.description;
    case 'point':
      return value.address;
    case 'rateType':
      return value.unit;
    case 'rate':
      return value.price;
    default:
      return '';
  }
};

export const getCurrentNumber = (ind: number, count: number) =>
  ind + 1 + count * 10;

export const calculateProgress: (...args: string[]) => number = (...args) => {
  const count = args.reduce((prev, current) => {
    const num = current.length ? 1 : 0;
    prev += num;
    return prev;
  }, 0);
  return (count / args.length) * 100;
};

export const currentBody = (link, obj, id, ...args) => {
  const {
    priceMax,
    priceMin,
    thumbnail,
    categoryId,
    colors,
    cityId,
    rateTypeId,
  } = obj;
  switch (link) {
    case 'category':
      updateById(id, { name: args[0], description: args[1] }, link);
      break;
    case 'rateType':
      updateById(id, { name: args[0], unit: args[1] }, link);
      break;
    case 'point':
      updateById(id, { cityId, name: args[0], address: args[1] }, link);
      break;
    case 'rate':
      updateById(id, { rateTypeId, price: args[0] }, link);
      break;
    case 'car':
      updateById(
        id,
        {
          priceMax,
          priceMin,
          thumbnail,
          categoryId,
          colors,
          name: args[0],
          description: args[1],
        },
        link
      );
      break;
    case 'order':
      updateById(
        id,
        {
          orderStatusId: {},
          cityId: {},
          pointId: {},
          carId: {},
          color: 'string',
          dateFrom: 0,
          dateTo: 0,
          rateId: {},
          price: 0,
          isFullTank: true,
          isNeedChildChair: true,
          isRightWheel: true,
        },
        link
      );
      break;
    default:
      updateById(id, { name: args[0] }, link);
  }
};
