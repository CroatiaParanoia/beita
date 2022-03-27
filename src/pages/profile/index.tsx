import { Avatar } from '../../components/Avatar';
import { Header } from '../../components/Header';
import { PageContainer } from '../../components/PageContainer';
import { List } from 'antd-mobile';

export const ProfilePage = () => {
  return (
    <PageContainer className="page">
      <Header>个人资料</Header>

      <div className="h-165px bg-white mt-12px flex justify-center items-center">
        <Avatar className="w-100px h-100px rounded-50px" />
      </div>

      <List className="mt-12px">
        <List.Item onClick={() => {}} extra="小卢">
          昵称
        </List.Item>
        <List.Item onClick={() => {}} extra="保密">
          性别
        </List.Item>
        <List.Item onClick={() => {}} extra="2022-03-27">
          出生年月
        </List.Item>
        <List.Item onClick={() => {}} extra="讲点什么吧">
          简介
        </List.Item>
      </List>
    </PageContainer>
  );
};
