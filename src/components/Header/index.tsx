import { NavBar } from 'antd-mobile';
import { NavBarProps } from 'antd-mobile/es/components/nav-bar';
import { FC, useMemo } from 'react';
import { useTitle } from 'ahooks';
import clsx from 'clsx';

export interface HeaderProps extends NavBarProps {
  title?: string;
}

export const Header: FC<HeaderProps> = ({
  title,
  className,
  onBack = () => history.back(),
  children,
  ...otherProps
}) => {
  const innerTitle = title || children?.toString() || '';

  const realTitle = useMemo(() => {
    if (import.meta.env.VITE_API_ENV === 'alpha') {
      return `【测试环境】${innerTitle}`;
    }

    return innerTitle;
  }, [innerTitle]);

  useTitle(realTitle);

  return (
    <NavBar className={clsx('bg-white', className)} onBack={onBack} {...otherProps}>
      {children}
    </NavBar>
  );
};
