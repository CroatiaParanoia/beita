import { Header, PageContainer } from '@components';
import { DreamCard } from '@components/DreamCard';

export const DreamsPage = () => {
  return (
    <PageContainer>
      <Header>造过的梦</Header>

      <div className="p-15px">
        <DreamCard personal />
        <DreamCard className="mt-12px" />
        <DreamCard className="mt-12px" personal />
      </div>
    </PageContainer>
  );
};
