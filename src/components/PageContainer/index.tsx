import { FC } from 'react';
import { PageContainerProps } from './types';
import { useTitle } from 'ahooks';
import clsx from 'clsx';

export const PageContainer: FC<PageContainerProps> = ({ children, title, className }) => {
  useTitle(title);

  return <div className={clsx('page', className)}>{children}</div>;
};
