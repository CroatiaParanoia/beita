import { Gender, UserInfo } from '@api/shuke/Api';

export const defaultUserInfo: UserInfo = {
  token: '',
  id: 0,
  username: '',
  createAt: '',
  updateAt: '',
  email: '',
  nickname: '',
  gender: Gender.Male,
};

export const GenderTextMapping = {
  [Gender.Male]: '男',
  [Gender.Female]: '女',
  [Gender.Unknown]: '保密',
};

export const GenderSelectList = Object.keys(GenderTextMapping).map((key: any) => {
  return {
    type: key as Gender,
    value: GenderTextMapping[key as Gender],
  };
});
