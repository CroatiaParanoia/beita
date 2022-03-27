import { Link } from 'react-router-dom';
import { Button, Divider, Form, Input, Toast } from 'antd-mobile';
import { useAppNavigate } from '../../router';
import { useMemo } from 'react';
import { PageContainer } from '../../components/PageContainer';
import { useMemoizedFn, useTitle } from 'ahooks';
import api from '@api';
import { UserRegistryReqDto } from '@api/shuke/Api';
import to from 'await-to-js';
import { sleep } from '@utils/common';
import { useSetRecoilState } from 'recoil';
import { userInfoAtom } from '@store/user';

export const RegistryPage = () => {
  const [{ PathType }, { getPath, appNavigate }] = useAppNavigate();
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const [form] = Form.useForm();

  const loginPath = useMemo(() => {
    return getPath(PathType.Login);
  }, []);

  const registry = useMemoizedFn(async (info: UserRegistryReqDto) => {
    const [err, res] = await to(api.user.userControllerRegistry(info));

    if (err || !res) {
      return;
    }
    const { code, data: userInfo, message } = res;

    if (!code) {
      Toast.show('注册成功，即将前往首页');
      setUserInfo(userInfo);

      await sleep(1000);

      appNavigate(PathType.Home);
      return;
    }

    Toast.show(message);
  });

  const handleFinish = useMemoizedFn((value) => {
    registry(value);
  });
  useTitle('注册');
  return (
    <PageContainer className="registry-page h-full flex flex-col ">
      <div className="h-full px-24px  flex flex-col relative items-center">
        <div className="w-120px h-120px bg-blue-300 flex justify-center items-center mt-44px mb-24px rounded-24px">
          这是LOGO
        </div>
        <Form
          form={form}
          className="w-full"
          requiredMarkStyle="text-required"
          onFinish={handleFinish}
          validateTrigger={['onBlur']}
        >
          <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
            <Input placeholder="请输入用户名" clearable />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true }, { type: 'email', message: '你这邮箱不对呀' }]}
          >
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
          已有账号？去 <Link to={loginPath}>登录</Link>
        </Divider>
      </div>
    </PageContainer>
  );
};
