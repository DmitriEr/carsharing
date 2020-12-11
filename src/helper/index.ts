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
