import React, { FC, useMemo } from 'react';
import { TabBar } from 'antd-mobile';
import { useLocation } from 'react-router-dom';
import { AppOutline, UserOutline } from 'antd-mobile-icons';
import { useAppNavigate } from '../../router';
import { PathType } from '../../router/types';

export const HomeTabs: FC = () => {
  const location = useLocation();
  const [_, { appNavigate, getPath, getPathTypeOrThrow }] = useAppNavigate();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    const pathType = getPathTypeOrThrow(value);
    appNavigate(pathType);
  };

  const tabs = useMemo(() => {
    return [
      {
        key: getPath(PathType.Home),
        title: '首页',
        icon: <AppOutline />,
      },
      {
        key: getPath(PathType.Me),
        title: '个人中心',
        icon: <UserOutline />,
      },
    ];
  }, []);

  const isActiveTabs = useMemo(() => {
    const activeItem = tabs.find((v) => v.key === pathname);

    return Boolean(activeItem);
  }, [pathname]);

  if (!isActiveTabs) return null;

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};
