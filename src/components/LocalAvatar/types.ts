import { CSSProperties } from 'react';

export interface LocalAvatarProps {
  className?: string;

  style?: CSSProperties;

  nickname: string;
  userId: number;
}
