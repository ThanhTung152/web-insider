import DetailTabs from './components/exchange-detail-table/tabs';
import CoinInformation from './components/exchange-detail-overview';
import { Flex } from 'antd';
import CoinTableInfo from './components/exchange-detail-table';
import { Page } from '@/components/page';
type PageProps = {
  params: {
    locale: 'vi' | 'en';
    slug: string;
  };
};

export default function Detail({ params }: PageProps) {
  const breadcrumbs = [
    {
      title: 'BlockUltra',
    },
    {
      title: 'Exchanges',
    },
    {
      title: 'Spot',
    },
    {
      title: `${params.slug}`,
    },
  ];
  return (
    <Page  breadcrumbs={breadcrumbs}>
      <Flex vertical gap={16}>
        <CoinInformation />
        <Flex className='shadow rounded-lg p-6' vertical gap={16}>
          <DetailTabs />
          <CoinTableInfo />
        </Flex>
      </Flex>
    </Page>
  );
}
