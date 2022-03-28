import { FC, useMemo } from 'react';
import clsx from 'clsx';
import { getHexColorByNumber } from '@utils/color-generator';

import './style.scss';
import { LocalAvatarProps } from './types';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@store/user';

export const LocalAvatar: FC<LocalAvatarProps> = ({ className, style, nickname, userId }) => {
  const firstChar = useMemo(() => {
    return (nickname[0] || '').toLocaleUpperCase();
  }, [nickname]);

  return (
    <div className={clsx('avatar', className)} style={{ ...style, backgroundColor: getHexColorByNumber(userId) }}>
      {firstChar}
    </div>
  );
};

export const PersonalAvatar: FC<{ className?: string }> = ({ className }) => {
  const { nickname, id } = useRecoilValue(userInfoAtom);

  return <LocalAvatar className={className} userId={id} nickname={nickname} />;
};
