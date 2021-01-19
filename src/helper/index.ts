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

export const getCurrentNumber = (ind: number, count: number) =>
  ind + 1 + count * 10;

export const updateLetterCase = (string: string) => {
  return string.split('').reduce((prev, item, i) => {
    const letter = i === 0 ? item.toUpperCase() : item.toLowerCase();
    prev += letter;
    return prev;
  }, '');
};
