import { FundraisingType, getBreadcrumbConfig } from './config';
import './index.scss';
import { Page } from '@/components/page';
import dynamic from 'next/dynamic';

const FunDTable = dynamic(() => import('./components/fundraising-table'), { ssr: false })

type PageProps = {
  params: {
    category: FundraisingType;
    locale: 'vi' | 'en';
  };
};

export default function Fundraising({ params }: PageProps) {
  return (
    <Page
      breadcrumbs={getBreadcrumbConfig(params.category)}
      classnames='fundraising'
    >
      <FunDTable />
    </Page>
  );
}
