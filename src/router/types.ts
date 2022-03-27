import { FC } from 'react';

export enum PathType {
  Home = 'HomePage',
  Login = 'LoginPage',
  Registry = 'RegistryPage',
  Me = 'Me',
  Setting = 'Setting',
  Profile = 'Profile',
  Dreams = 'Dreams',
  DreamCreate = 'DreamCreate',
}

export type PagePathMapping = Record<PathType, string[]>;

type PathParamsType<T extends string> = {
  [x in T]?: string;
};

type BasePathParamsMapping = {
  [x in PathType]: any;
};

export interface PathParamsMapping extends BasePathParamsMapping {
  [PathType.Home]: PathParamsType<'home' | 'home2'>;
  [PathType.Login]: PathParamsType<'login' | 'login2'>;
  [PathType.Registry]: PathParamsType<'registry' | 'registry2'>;
}

export interface RouteLocalItem {
  pathType: PathType;
  component: FC;
  auth?: boolean;
}

export interface RouteMixItem extends RouteLocalItem {
  path: string;
}
