import { Header, PageContainer } from '@components';
import { Button, List, Switch, TextArea } from 'antd-mobile';
import { useSafeState } from 'ahooks';

export const DreamCreatePage = () => {
  const [dreamContent, setDreamContent] = useSafeState('');

  const [isPublicDream, setDreamStatus] = useSafeState(true);

  const handleSubmit = () => {
    console.log({
      dreamContent,
      isPublicDream,
    });
  };

  return (
    <PageContainer>
      <Header>造个梦吧</Header>

      <div className="h-42px flex items-center text-13px text-hex-5C5C5C pl-12px">当代梦想家：小卢</div>
      <TextArea
        className="bg-white px-15px py-10px"
        value={dreamContent}
        onChange={(e) => setDreamContent(e)}
        placeholder="梦想总是要有的，万一哪天实现了呢🤷‍"
        showCount
        autoSize={{ maxRows: 8, minRows: 5 }}
        maxLength={300}
      />

      <List className="mt-12px">
        <List.Item extra={<Switch checked={isPublicDream} onChange={(e) => setDreamStatus(e)} />}>公开梦想</List.Item>
      </List>

      <div className="p-15px pt-52px">
        <Button block color="primary" disabled={!dreamContent.trim()} onClick={handleSubmit}>
          开始做梦
        </Button>
      </div>
    </PageContainer>
  );
};
