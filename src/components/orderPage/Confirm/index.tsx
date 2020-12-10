import React from 'react';
import { useSelector } from 'react-redux';
import { list } from '../../../redux/selectors';
import { herokuapp } from '../../../constants/server';
import './style.scss';

export const Confirm: React.FunctionComponent = () => {
  const information = useSelector(list);
  const { value, number, time, pathImg } = information[1];

  return (
    <div className="confirm">
      <div className="data-car">
        <p className="model-car">{value}</p>
        <p className="number-car">
          <span>{number}</span>
        </p>
        <p className="fuels-car">
          <span className="title">Топливо </span>
          <span className="percent">100%</span>
        </p>
        <p className="date">
          <span className="title">Доступна с </span>
          <span className="time">{time}</span>
        </p>
      </div>
      <div className="picture-car">
        <img
          src={`${herokuapp}${pathImg}`}
          crossOrigin="anonymous"
          referrerPolicy="origin"
        />
      </div>
    </div>
  );
};
