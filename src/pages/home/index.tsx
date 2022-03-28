import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {defaultUserInfo, userInfoAtom} from '@store/user';
import {useMemoizedFn, useRequest} from 'ahooks';
import {Toast} from 'antd-mobile';
import api from '@api';
import to from 'await-to-js';
import {Header, PageContainer} from '@components';
import {AddCircleOutline} from 'antd-mobile-icons';
import {useAppNavigate} from '../../router';
import {useMemo} from "react";
import {DreamCard} from "@components/DreamCard";
import {DreamDto} from "@api/shuke/Api";
import clsx from "clsx";

export const HomePage = () => {
  const navigate = useNavigate();
  const [{username, email, gender, id}, setUserInfo] = useRecoilState(userInfoAtom);

  const {data: response, loading} = useRequest(api.dream.dreamControllerGetPublicDreamList)

  const publicDreamList = useMemo<DreamDto[]>(() => {
    if (!response || loading) return []
    return response.data
  }, [response, loading])

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
      <PageContainer className="flex flex-col">
        <Header backArrow={false} right={<AddCircleOutline className="text-22px" onClick={toCreateDream}/>}>
          梦之广场
        </Header>

        <div className="flex-1 px-15px overflow-y-auto">
          {
            publicDreamList.map((item, index) => {
              return <DreamCard className={clsx('mb-12px', {'mt-12px': !index})} key={item.id} dream={item}/>
            })
          }
        </div>
      </PageContainer>
  );
};
