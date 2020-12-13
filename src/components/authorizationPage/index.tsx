import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authorization } from '../../redux/selectors';
import { AuthWindow } from './AuthWindow';

export const AuthorizationPage: React.FunctionComponent = () => {
  const auth = useSelector(authorization);
  const { isAdmin, isAuth } = auth;

  if (isAuth) {
    return isAdmin ? <Redirect to="/admin/" /> : <Redirect to="/carsharing/" />;
  } else {
    return <AuthWindow />;
  }
};
