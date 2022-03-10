import { LoginPage } from '@pages/login';
import { RegistryPage } from '@pages/registry';
import { HomePage } from '@pages/home';
import { PagePathMapping, PathType, RouteLocalItem, RouteMixItem } from './types';

export const pagePathMapping: PagePathMapping = {
  [PathType.Home]: ['/', '/home'],
  [PathType.Login]: ['/login', '/login2'],
  [PathType.Registry]: ['/registry', '/registry6'],
};

export const routerConfig: RouteLocalItem[] = [
  {
    pathType: PathType.Home,
    component: HomePage,
    auth: true,
  },
  {
    pathType: PathType.Login,
    component: LoginPage,
  },
  {
    pathType: PathType.Registry,
    component: RegistryPage,
  },
];

export const getRouterMixList = (routerConfig: RouteLocalItem[], pagePathMapping: PagePathMapping): RouteMixItem[] => {
  return routerConfig
    .map((v) => {
      const { pathType } = v;
      const paths = pagePathMapping[pathType];

      return paths.map((path) => ({ ...v, path }));
    })
    .flat();
};
