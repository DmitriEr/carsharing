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

export const getCurrentName = (state: string, val1, val2) => {
  switch (state) {
    case 'rate':
      return val1.rateTypeId.name;
    case 'order':
      return val2;
    default:
      return val1.name;
  }
};

export const getCurrentOption = (state: string, value) => {
  switch (state) {
    case 'car':
      return value.description;
    case 'point':
      return value.address;
    case 'order':
      return `${value.price} рублей`;
    case 'rate' || 'rateTypeId':
      return value.rateTypeId.unit;
    default:
      return '';
  }
};

export const getCurrentNumber = (ind: number, count: number) =>
  ind + 1 + count * 10;
