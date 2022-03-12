import * as React from 'react';
import { createElement, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../App.css';
import { getRouterMixList, pagePathMapping, routerConfig } from './config';
import { AuthProtect } from './AuthProtect';
import { useAppNavigate } from './useAppNavigate';
import { NotFoundPage } from '@pages/not-found';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userInfoAtom } from '@store/user';
import { userEvent } from '../common/common-event';
import { useMount } from 'ahooks';
import { commonStorage } from '../common/common-storage';

export function AppRouter() {
  const [{ PathType }, { getPath }] = useAppNavigate();
  const routerList = useMemo(() => {
    return getRouterMixList(routerConfig, pagePathMapping);
  }, []);

  const resetUserInfo = useResetRecoilState(userInfoAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);

  useMount(() => {
    const storageUserInfo = commonStorage.get('userInfo');
    storageUserInfo && setUserInfo(storageUserInfo);
  });

  useEffect(() => {
    const listener = () => {
      resetUserInfo();
    };
    userEvent.on('logout', listener);

    return () => {
      userEvent.remove('logout', listener);
    };
  }, [resetUserInfo]);

  return (
    <Routes>
      {routerList.map((item) => {
        const el = createElement(item.component);

        const element = item.auth ? <AuthProtect>{el}</AuthProtect> : el;

        return <Route key={item.path} path={item.path} element={element} />;
      })}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
