import { FC } from 'react';
import { ClearEmpty } from '../typing';

export enum PathType {
  Home = 'HomePage',
  Login = 'LoginPage',
  Registry = 'RegistryPage',
}

export type PagePathMapping = Record<PathType, string[]>;

type PathParamsType<T extends string> = {
  [x in T]?: string;
};

export interface PathParamsMapping {
  [PathType.Home]: PathParamsType<'home' | 'home2'>;
  [PathType.Login]: PathParamsType<'login' | 'login2'>;
  [PathType.Registry]: PathParamsType<'registry' | 'registry2'>;
}

type A = PathParamsMapping[PathType.Home];

type B = ClearEmpty<A>;

type K = keyof B;

export interface RouteLocalItem {
  pathType: PathType;
  component: FC;
  auth?: boolean;
}

export interface RouteMixItem extends RouteLocalItem {
  path: string;
}
