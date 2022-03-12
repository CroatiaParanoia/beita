import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@store/user';
import { FC, useMemo } from 'react';
import clsx from 'clsx';
import { AvatarProps } from './types';
import { getHexColorByNumber } from '@utils/color-generator';

import './style.scss';

export const Avatar: FC<AvatarProps> = ({ className, style }) => {
  const { username, id } = useRecoilValue(userInfoAtom);

  const firstChar = useMemo(() => {
    return (username[0] || '').toLocaleUpperCase();
  }, [username]);

  return (
    <div className={clsx('avatar', className)} style={{ ...style, backgroundColor: getHexColorByNumber(id) }}>
      {firstChar}
    </div>
  );
};
