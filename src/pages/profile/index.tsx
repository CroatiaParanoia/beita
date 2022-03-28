import { Header, PageContainer, PersonalAvatar } from '@components';
import { ActionSheet, List } from 'antd-mobile';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@store/user';
import { getGenderText } from '@utils/common';
import { useAppNavigate } from '../../router';
import { useBoolean, useMemoizedFn } from 'ahooks';
import { useMemo } from 'react';
import { GenderSelectList } from '../../constant/user.constant';
import { Gender } from '@api/shuke/Api';

export const ProfilePage = () => {
  const { nickname, gender } = useRecoilValue(userInfoAtom);
  const [{ PathType }, { appNavigate }] = useAppNavigate();
  const [isGenderSelectorShow, genderSelectorManager] = useBoolean(false);

  const handleChangeGender = useMemoizedFn((gender: Gender) => {
    genderSelectorManager.setFalse();
  });

  const genderActions = useMemo(() => {
    return GenderSelectList.map((item) => {
      return {
        key: item.type,
        text: item.value,
        onClick: () => handleChangeGender(item.type),
      };
    });
  }, []);

  return (
    <PageContainer className="page">
      <Header>个人资料</Header>

      <div className="h-165px bg-white mt-12px flex justify-center items-center">
        <PersonalAvatar className="w-100px h-100px rounded-50px" />
      </div>

      <List className="mt-12px">
        <List.Item onClick={() => {}} extra={nickname}>
          昵称
        </List.Item>
        <List.Item onClick={genderSelectorManager.setTrue} extra={getGenderText(gender)}>
          性别
        </List.Item>
        <List.Item onClick={() => {}} extra="2022-03-27">
          出生年月
        </List.Item>
        <List.Item onClick={() => {}} extra="讲点什么吧">
          简介
        </List.Item>
      </List>

      <ActionSheet
        cancelText="取消"
        visible={isGenderSelectorShow}
        actions={genderActions}
        onClose={genderSelectorManager.setFalse}
      />
    </PageContainer>
  );
};
