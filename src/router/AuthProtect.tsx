import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '@store/user';
import { FC, ReactElement, useMemo } from 'react';
import { useAppNavigate } from './useAppNavigate';

export const AuthProtect: FC = ({ children }) => {
  const [{ PathType }, { getPath }] = useAppNavigate();

  const loginPath = useMemo(() => {
    return getPath(PathType.Login, { redirectUrl: window.location.href });
  }, []);

  const isLogin = useRecoilValue(isLoginAtom);

  if (!isLogin) {
    return <Navigate to={loginPath} replace />;
  }

  return children as ReactElement;
};
