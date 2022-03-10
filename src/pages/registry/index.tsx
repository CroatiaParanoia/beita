import { Link } from 'react-router-dom';
import { Button, Divider, Form, Input } from 'antd-mobile';
import { useAppNavigate } from '../../router';
import { useMemo } from 'react';
import { PageContainer } from '../../components/PageContainer';
import { useMemoizedFn } from 'ahooks';

export const RegistryPage = () => {
  const [{ PathType }, { getPath }] = useAppNavigate();

  const [form] = Form.useForm();

  const loginPath = useMemo(() => {
    return getPath(PathType.Login);
  }, []);

  const handleFinish = useMemoizedFn((value) => {
    console.log(value, 'valueeee');
  });

  return (
    <PageContainer title="注册" className="registry-page h-full flex flex-col ">
      <div className="h-full px-24px  flex flex-col relative items-center">
        <div className="w-120px h-120px bg-blue-300 flex justify-center items-center mt-64px mb-44px rounded-24px">
          这是LOGO
        </div>
        <Form form={form} className="w-full" requiredMarkStyle="text-required" onFinish={handleFinish}>
          <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
            <Input placeholder="请输入用户名" clearable />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true }]}>
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
