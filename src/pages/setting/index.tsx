import { Header } from '@components/Header';
import { PageContainer } from '@components/PageContainer';
import { Button, List } from 'antd-mobile';
import { useAppNavigate } from '../../router';
import { userEvent } from '../../common/common-event';

export const SettingPage = () => {
  const [{ PathType }, { appNavigate }] = useAppNavigate();

  const handleLogout = () => {
    userEvent.emit('logout');
    appNavigate(PathType.Login, { replace: true });
  };

  return (
    <PageContainer className="flex flex-col">
      <Header onBack={() => history.back()} className="bg-white">
        设置
      </Header>

      <div className="flex-1 overflow-y-auto">
        <List className="mt-12px">
          <List.Item onClick={() => appNavigate(PathType.Profile)}>账号资料</List.Item>
          <List.Item onClick={() => {}}>安全隐私</List.Item>
          <List.Item onClick={() => {}}>收货地址</List.Item>
        </List>

        <List className="mt-12px">
          <List.Item onClick={() => {}}>消息设置</List.Item>
          <List.Item onClick={() => {}}>推送设置</List.Item>
          <List.Item onClick={() => {}}>其他设置</List.Item>
        </List>

        <List className="mt-12px">
          <List.Item onClick={() => {}}>反馈与建议</List.Item>
          <List.Item onClick={() => {}}>关于XXX</List.Item>
        </List>
        <List className="mt-12px">
          <List.Item onClick={() => {}}>用户协议</List.Item>
          <List.Item onClick={() => {}}>隐私政策</List.Item>
          <List.Item onClick={() => {}}>隐私权限设置</List.Item>
        </List>

        <div className="p-12px">
          <Button block fill="none" color="danger" onClick={handleLogout}>
            退出登录
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
