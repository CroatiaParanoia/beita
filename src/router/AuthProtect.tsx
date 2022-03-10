import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@store/user';
import { FC, ReactElement } from 'react';

export const AuthProtect: FC = ({ children }) => {
  let location = useLocation();

  const isLogin = useRecoilValue(isLoginAtom);

  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children as ReactElement;
};
