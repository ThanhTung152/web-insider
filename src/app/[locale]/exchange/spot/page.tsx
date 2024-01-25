import { Page } from '@/components/page';
import { Flex } from 'antd';
import dynamic from 'next/dynamic';

const ExchangeTabs = dynamic(() => import('./tabs'), { ssr: false });
const ExchangeTable = dynamic(() => import('./table'), { ssr: false });

export default function Exchange() {
  const breadcrumbs = [
    {
      title: 'Home',
    },
    {
      title: 'Exchanges',
    },
  ];

  return (
    <Page breadcrumbs={breadcrumbs}>
      <Flex className='rounded-lg shadow p-6' vertical gap={16}>
        <ExchangeTabs />
        <ExchangeTable />
      </Flex>
    </Page>
  );
}
