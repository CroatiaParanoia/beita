import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { defaultUserInfo, userInfoAtom } from '@store/user';
import { Avatar } from '../../components/Avatar';
import { useMemoizedFn } from 'ahooks';
import { Button, Toast } from 'antd-mobile';
import api from '@api';
import to from 'await-to-js';

export const HomePage = () => {
  const navigate = useNavigate();
  const [{ username, email, gender, id }, setUserInfo] = useRecoilState(userInfoAtom);

  const login = () => {
    navigate('/login');
  };

  const updateUserInfo = useMemoizedFn(async () => {
    const [err, res] = await to(api.user.userControllerGetUserInfo());

    if (err || !res) {
      return;
    }

    const { code, data, message } = res;
    if (!code) {
      setUserInfo(data);
      return;
    }

    Toast.show(message);
  });

  const logout = useMemoizedFn(() => {
    setUserInfo(defaultUserInfo);
  });

  return (
    <div>
      <div className="ml-24px text-100px">首页</div>
      {username}, {email}, {gender}
      <Button color="primary" onClick={updateUserInfo}>
        更新用户信息
      </Button>
      <Button color="primary" onClick={logout}>
        登出
      </Button>
      <Avatar />
    </div>
  );
};
