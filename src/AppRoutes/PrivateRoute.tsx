import { FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { invariant } from 'shared/invariant';
import { GlobalStateContext } from '../shared/GlobalStateContext';

type PrivateRouteType = {
  children: ReactNode;
};

export const PrivateRoute: FC<PrivateRouteType> = ({ children }) => {
  const contextValue = useContext(GlobalStateContext);

  invariant(contextValue != null, 'Не подключен провайдер!');

  const [{ isLogin }] = contextValue;

  return isLogin ? children : <Navigate to="/" />;
};
