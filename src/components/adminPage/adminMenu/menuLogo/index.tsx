import React from 'react';

type TypeMenuLogo = {
  svg: string;
  color: string;
  width: string;
  height: string;
};

export const MenuLogo: React.FunctionComponent<TypeMenuLogo> = ({
  svg,
  color,
  width,
  height,
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="avatar"
  >
    <path
      id="Logo Icon"
      fillRule="evenodd"
      clipRule="evenodd"
      d={svg}
      fill={color}
    />
  </svg>
);
