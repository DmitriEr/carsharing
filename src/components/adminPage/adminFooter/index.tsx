import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export const AdminFooter: React.FunctionComponent = () => {
  return (
    <div className="admin-footer">
      <div>
        <Link to="/carsharing/main/">Главная страница</Link>
        <Link to="/carsharing/main/">Ссылка</Link>
      </div>
      <span>Copyright © 2020 Simbirsoft</span>
    </div>
  );
};
