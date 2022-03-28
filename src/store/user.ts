import { atom, selector } from 'recoil';
import { Gender, UserInfo } from '@api/shuke/Api';
import { commonStorage } from '../common/common-storage';

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

export const userInfoAtom = atom<UserInfo>({
  key: 'userInfo',
  default: defaultUserInfo,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue, isReset) => {
        if (isReset) {
          commonStorage.remove('userInfo');
          commonStorage.remove('token');
          return;
        }
        commonStorage.set('userInfo', newValue);
        commonStorage.set('token', newValue.token);
      });
    },
  ],
});

export const isLoginAtom = selector({
  key: 'isLogin',
  get({ get }) {
    const userInfo = get(userInfoAtom);
    return Boolean(userInfo.username);
  },
});
