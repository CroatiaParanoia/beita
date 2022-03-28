import { PathParamsMapping, PathType } from './types';
import { useSearchParams } from 'react-router-dom';
import { useMemoizedFn } from 'ahooks';

export const useAppSearchParams = <T extends PathType>() => {
  type Mapping = PathParamsMapping[T];

  const [searchParams, setSearchParams] = useSearchParams();

  const get = useMemoizedFn(<Key extends keyof Mapping>(key: Key): Mapping[Key] => {
    return searchParams.get(key as string) as unknown as Mapping[Key];
  });

  const getAll = useMemoizedFn((): Mapping => {
    return Object.fromEntries(searchParams) as unknown as Mapping;
  });

  const set = useMemoizedFn(<Key extends keyof Mapping, Value extends Mapping[Key]>(key: Key, value: Value): void => {
    searchParams.set(key as string, value as unknown as string);

    setSearchParams(searchParams);
  });

  return { get, getAll, set };
};
