import { atom, selector } from 'recoil';
import { UserInfo } from '@api/shuke/Api';
import { commonStorage } from '../common/common-storage';

const defaultUserInfo: UserInfo = {
  token: '',
  id: 0,
  username: '',
  createAt: '',
  updateAt: '',
  deleteAt: '',
  email: '',
  nickname: '',
  gender: 'male',
};

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfo',
  default: commonStorage.get('userInfo') || defaultUserInfo,
});

export const isLoginAtom = selector({
  key: 'isLogin',
  get({ get }) {
    const userInfo = get(userInfoAtom);
    return Boolean(userInfo.username);
  },
});
