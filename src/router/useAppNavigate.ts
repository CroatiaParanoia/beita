import { NavigateOptions, useNavigate } from 'react-router-dom';
import { useMemoizedFn } from 'ahooks';
import { PathParamsMapping, PathType } from './types';
import { pagePathMapping } from './config';

export const useAppNavigate = () => {
  const navigate = useNavigate();

  const getPath = useMemoizedFn(<T extends PathType>(pathType: PathType, params?: PathParamsMapping[T]) => {
    let path = pagePathMapping[pathType][0];

    if (!path) {
      throw new Error(`【路由跳转错误】无法读取到${pathType}对应的path`);
    }

    const qs = params ? new URLSearchParams(params).toString() : '';
    path += qs ? `?${qs}` : '';

    return path;
  });

  const awesomeNavigate = useMemoizedFn(
    <T extends PathType>(pathType: T, options?: NavigateOptions & { params?: PathParamsMapping[T] }) => {
      const { params, ...otherOptions } = options || {};
      const path = getPath(pathType, params);

      navigate(path, otherOptions);
    },
  );

  return [{ PathType }, { awesomeNavigate, getPath }] as const;
};
