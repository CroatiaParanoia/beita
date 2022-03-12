import { FC, useMemo } from 'react';
import { PageContainerProps } from './types';
import { useTitle } from 'ahooks';
import clsx from 'clsx';

export const PageContainer: FC<PageContainerProps> = ({ children, title, className }) => {
  const realTitle = useMemo(() => {
    if (import.meta.env.VITE_API_ENV === 'alpha') {
      return `【测试环境】${title}`;
    }

    return title;
  }, [title]);

  useTitle(realTitle);

  return <div className={clsx('page', className)}>{children}</div>;
};
