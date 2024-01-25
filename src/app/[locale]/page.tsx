import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../config';
import dynamic from 'next/dynamic';

const Banner = dynamic(() => import('../home/banner'), { ssr: true })
const RenderTabs = dynamic(() => import('../home/RenderTabs/RenderTabs'), { ssr: false })
const Introduce = dynamic(() => import('../home/introduce'), { ssr: true })

type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <main className='py-8'>
      <Banner />
      <RenderTabs />
      <Introduce />
    </main>
  );
}
