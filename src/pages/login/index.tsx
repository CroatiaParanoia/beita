import { Button, Divider, Form, Input, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';

import './style.scss';
import { useMemo } from 'react';
import { useAppNavigate } from '../../router';
import { PageContainer } from '../../components/PageContainer';
import api from '../../api';
import { userInfoAtom } from '@store/user';
import { useRecoilState } from 'recoil';
import { useTitle } from 'ahooks';

export const LoginPage = () => {
  const [{ PathType }, { getPath, appNavigate }] = useAppNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const [form] = Form.useForm();

  const registryPath = useMemo(() => {
    return getPath(PathType.Registry);
  }, []);

  const handleLogin = async (value: any) => {
    const {
      code,
      data: curUserInfo,
      message: errMsg,
    } = await api.user.userControllerLogin({
      username: value.username,
      password: value.password,
    });

    if (code || !curUserInfo) {
      Toast.show(errMsg);
      return;
    }

    setUserInfo(curUserInfo);
    appNavigate(PathType.Home, { replace: true });

    // const userInfo = res.data;
    //
    // setUserInfo(userInfo);
  };

  useTitle('登录');

  return (
    <PageContainer className="login-page page  h-full flex flex-col justify-center">
      <div className="login-container h-full px-24px flex flex-col items-center">
        <div className="w-120px h-120px bg-blue-300 flex justify-center items-center mt-64px mb-44px rounded-24px">
          这是LOGO
        </div>
        <Form form={form} className="w-full" requiredMarkStyle="text-required" onFinish={handleLogin}>
          <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
            <Input placeholder="请输入用户名" clearable />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true }]}>
            <Input placeholder="请输入密码" clearable type="password" />
          </Form.Item>
        </Form>
        <Button color="primary" className="w-full mt-64px" onClick={form.submit}>
          登录
        </Button>

        <Divider>
          没有账号？去 <Link to={registryPath}>注册</Link>
        </Divider>
      </div>
    </PageContainer>
  );
};
