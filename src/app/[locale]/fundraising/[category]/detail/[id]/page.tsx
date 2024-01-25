import { Page } from '@/components/page';
import { FundraisingCategory, FundraisingCategoryLabel } from '../../config';
import Link from 'next/link';
import './index.scss';
import dynamic from 'next/dynamic';

const Main = dynamic(() => import('./main'), { ssr: false })

type PageProps = {
  params: {
    locale: 'vi' | 'en';
    id: string;
    category: string;
  };
  searchParams: any;
};

export default async function FundraisingDetail({
  params,
  searchParams,
}: PageProps) {
  const { category, locale } = params;
  const breadcrumbs = [
    {
      title: 'BlockUltra',
    },
    {
      title: 'Fundraising',
    },
    {
      title: (
        <Link href={`/${locale}/fundraising/${category}`}>
          {
            FundraisingCategoryLabel[
              category ?? FundraisingCategory.FundingRounds
            ]
          }
        </Link>
      ),
    },
    {
      title: searchParams?.name,
    },
  ];

  return (
    <Page breadcrumbs={breadcrumbs} contentClassnames=''>
      <Main params={params} />
    </Page>
  );
}
