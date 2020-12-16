import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authorization } from '../../redux/selectors';

export const AdminPage: React.FunctionComponent = () => {
  const auth = useSelector(authorization);
  const { isAdmin, isAuth } = auth;

  if (isAuth && isAdmin) {
    return <div>Admin</div>;
  } else {
    return <Redirect to="/carsharing/main/" />;
  }
};
