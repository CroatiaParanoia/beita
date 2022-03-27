import * as React from 'react';
import { createElement, useEffect, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { getRouterMixList, pagePathMapping, routerConfig } from './config';
import { AuthProtect } from './AuthProtect';
import { useAppNavigate } from './useAppNavigate';
import { NotFoundPage } from '@pages/not-found';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userInfoAtom } from '@store/user';
import { userEvent } from '../common/common-event';
import { useMount } from 'ahooks';
import { commonStorage } from '../common/common-storage';
import { HomeTabs } from '../components/HomeTabs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './router.scss';

export function AppRouter() {
  const [{ PathType }, { getPath }] = useAppNavigate();
  const location = useLocation();
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
    <>
      <TransitionGroup>
        {/*
            This is no different than other usage of
            <CSSTransition>, just make sure to pass
            `location` to `Switch` so it can match
            the old location as it animates out.
          */}
        <CSSTransition classNames="fade" appear={true} key={location.pathname} timeout={300} unmountOnExit={true}>
          <Routes location={location}>
            {routerList.map((item) => {
              const el = createElement(item.component);

              const element = item.auth ? <AuthProtect>{el}</AuthProtect> : el;

              return <Route key={item.path} path={item.path} element={element} />;
            })}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <HomeTabs />
    </>
  );
}
