import { colors } from './color';

export const getHexColorByNumber = (num: number) => {
  const value = num % colors.length;
  return colors[value];
};
