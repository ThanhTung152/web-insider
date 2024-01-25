'use client';
import './index.scss';
import { Page } from '@/components/page';
import { IeoIdoTable } from './components/ieo-ido-table';
import { getIeoIdoBreadcrumbs } from './config';

type PageProps = {
  params: {
    category: string;
    locale: 'vi' | 'en';
  };
};

export default function IeoIdoPage({ params }: PageProps) {
  const breadcrumbs = getIeoIdoBreadcrumbs(params.category);

  return (
    <Page breadcrumbs={breadcrumbs}>
      <IeoIdoTable />
    </Page>
  );
}
