import { useTitle } from 'ahooks';
import { Avatar } from '../../components/Avatar';
import { List } from 'antd-mobile';
import './style.scss';
import { ContentOutline, SetOutline } from 'antd-mobile-icons';
import { useAppNavigate } from '../../router';

const user = {
  name: '小卢',
  avatar: '',
  description: 'xxx',
};

export const MePage = () => {
  const [{ PathType }, { appNavigate }] = useAppNavigate();

  useTitle('我的');
  return (
    <div className="page">
      <div className="me-card h-120px bg-white flex flex-col justify-end">
        <List>
          <List.Item
            key={user.name}
            prefix={<Avatar className="w-48px h-48px" />}
            description={user.description}
            onClick={() => appNavigate(PathType.Profile)}
          >
            {user.name}
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
