import { Gender } from '@api/shuke/Api';

export const sleep = (timeout = 300) => {
  return new Promise((r) => {
    setTimeout(r, timeout);
  });
};

export const getGenderText = (gender: Gender) => {
  const mapping = {
    [Gender.Male]: '男',
    [Gender.Female]: '女',
    [Gender.Unknown]: '未知',
  };

  return mapping[gender];
};
