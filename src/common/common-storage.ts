import { Storage } from '@utils/storage';
import { UserInfo } from '@api/shuke/Api';

interface CommonStorageType {
  userInfo: UserInfo;
  token: string;
}

export const commonStorage = new Storage<CommonStorageType>('localStorage');
