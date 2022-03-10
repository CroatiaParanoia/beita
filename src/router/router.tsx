import * as React from 'react';
import { createElement, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../App.css';
import { getRouterMixList, pagePathMapping, routerConfig } from './config';
import { AuthProtect } from './AuthProtect';
import { useAppNavigate } from './useAppNavigate';
import { NotFoundPage } from '@pages/not-found';

export function AppRouter() {
  const [{ PathType }, { getPath }] = useAppNavigate();
  const routerList = useMemo(() => {
    return getRouterMixList(routerConfig, pagePathMapping);
  }, []);

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
