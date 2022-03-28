import {Header, PageContainer} from '@components';
import {DreamCard} from '@components/DreamCard';
import {useRequest} from "ahooks";
import api from "@api";
import {useMemo} from "react";
import {DreamDto} from "@api/shuke/Api";
import clsx from "clsx";

export const DreamsPage = () => {
    const {data: response, loading} = useRequest(api.user.userControllerGetUserDreams)

    const dreamList = useMemo<DreamDto[]>(() => {
        if (!response || loading) return []
        return response.data
    }, [response, loading])

    return (
        <PageContainer className="flex flex-col">
            <Header>造过的梦</Header>

            <div className="flex-1 overflow-y-auto px-15px">
                {
                    dreamList.map((item, index) => {
                        return <DreamCard personal className={clsx('mb-12px', {'mt-12px': !index})} key={item.id}
                                          dream={item}/>
                    })
                }
            </div>
        </PageContainer>
    );
};
