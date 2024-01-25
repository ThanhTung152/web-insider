import './index.scss';
import { Page } from '@/components/page';
import dynamic from 'next/dynamic';

const MainData = dynamic(() => import('../main-data/MainData'), { ssr: false })

export default async function Detail(props: any) {
  const { params } = props;

  const breadcrumbs = [
    {
      title: 'Home',
    },
    {
      title: 'Coins',
    },
  ];

  return (
    <Page breadcrumbs={breadcrumbs}>
      <MainData slug={params.slug} />
    </Page>
  );
}
