import { LoginPage } from '@pages/login';
import { RegistryPage } from '@pages/registry';
import { HomePage } from '@pages/home';
import { PagePathMapping, PathType, RouteLocalItem, RouteMixItem } from './types';
import { MePage } from '@pages/me';
import { SettingPage } from '@pages/setting';
import { ProfilePage } from '@pages/profile';
import { DreamsPage } from '@pages/dreams';
import { DreamCreatePage } from '@pages/dream-create';

export const pagePathMapping: PagePathMapping = {
  [PathType.Home]: ['/', '/home'],
  [PathType.Login]: ['/login', '/login2'],
  [PathType.Registry]: ['/registry', '/registry6'],
  [PathType.Me]: ['/me'],
  [PathType.Setting]: ['/setting'],
  [PathType.Profile]: ['/profile'],
  [PathType.Dreams]: ['/dreams'],
  [PathType.DreamCreate]: ['/dream-create'],
};

export const routerConfig: RouteLocalItem[] = [
  {
    pathType: PathType.Home,
    component: HomePage,
    auth: false,
  },
  {
    pathType: PathType.Login,
    component: LoginPage,
  },
  {
    pathType: PathType.Registry,
    component: RegistryPage,
  },
  {
    pathType: PathType.Me,
    component: MePage,
  },
  {
    pathType: PathType.Setting,
    component: SettingPage,
    auth: true,
  },
  {
    pathType: PathType.Profile,
    component: ProfilePage,
    auth: true,
  },
  {
    pathType: PathType.Dreams,
    component: DreamsPage,
    auth: true,
  },
  {
    pathType: PathType.DreamCreate,
    component: DreamCreatePage,
    auth: true,
  },
];

export const getRouterMixList = (routerConfig: RouteLocalItem[], pagePathMapping: PagePathMapping): RouteMixItem[] => {
  return routerConfig
    .map((v) => {
      const { pathType } = v;
      const paths = pagePathMapping[pathType];

      return paths?.map((path) => ({ ...v, path })) ?? [];
    })
    .flat();
};
