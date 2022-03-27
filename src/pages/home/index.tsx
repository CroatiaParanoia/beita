import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { defaultUserInfo, userInfoAtom } from '@store/user';
import { useMemoizedFn } from 'ahooks';
import { Toast } from 'antd-mobile';
import api from '@api';
import to from 'await-to-js';
import { Header, PageContainer } from '@components';
import { AddCircleOutline } from 'antd-mobile-icons';
import { useAppNavigate } from '../../router';

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
  const [{ PathType }, { appNavigate }] = useAppNavigate();

  const toCreateDream = () => {
    appNavigate(PathType.DreamCreate);
  };

  return (
    <PageContainer>
      <Header backArrow={false} right={<AddCircleOutline className="text-22px" onClick={toCreateDream} />}>
        梦之广场
      </Header>
    </PageContainer>
  );
};
