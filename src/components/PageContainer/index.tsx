import { FC } from 'react';
import { PageContainerProps } from './types';
import clsx from 'clsx';

export const PageContainer: FC<PageContainerProps> = ({ children, className }) => {
  return <div className={clsx('page', className)}>{children}</div>;
};
