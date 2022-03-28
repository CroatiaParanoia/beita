import { useTitle } from 'ahooks';
import { PersonalAvatar } from '@components';
import { List } from 'antd-mobile';
import './style.scss';
import { ContentOutline, SetOutline } from 'antd-mobile-icons';
import { useAppNavigate } from '../../router';
import { useRecoilValue } from 'recoil';
import { isLoginAtom, userInfoAtom } from '@store/user';
import { useMemo } from 'react';

const user = {
  name: '小卢',
  avatar: '',
  description: 'xxx',
};

export const MePage = () => {
  const [{ PathType }, { appNavigate }] = useAppNavigate();

  const { username, email, nickname } = useRecoilValue(userInfoAtom);
  const isLogin = useRecoilValue(isLoginAtom);

  const userCardInfo = useMemo(() => {
    if (isLogin) {
      return {
        nickname,
        introduce: email,
      };
    }

    return {
      nickname: '未登录',
      introduce: '快去登录吧～',
    };
  }, [nickname, email]);

  useTitle('我的');
  return (
    <div className="page">
      <div className="me-card bg-white flex flex-col justify-end">
        <List>
          <List.Item
            className="pb-12px pt-16px"
            key={userCardInfo.nickname}
            prefix={<PersonalAvatar className="w-48px h-48px" />}
            description={userCardInfo.introduce}
            onClick={() => appNavigate(PathType.Profile)}
          >
            {userCardInfo.nickname}
          </List.Item>
        </List>
      </div>

      <List className="mt-12px">
        <List.Item
          prefix={<ContentOutline className="text-22px mt-2px" />}
          onClick={() => appNavigate(PathType.Dreams)}
        >
          造过的梦
        </List.Item>
      </List>

      <List className="mt-12px">
        <List.Item prefix={<SetOutline className="text-22px mt-2px" />} onClick={() => appNavigate(PathType.Setting)}>
          设置
        </List.Item>
      </List>
    </div>
  );
};
