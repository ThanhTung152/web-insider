import './index.scss';
import { useUnlockTime } from './logic/useUnlockTime';
import { Page } from '@/components/page';
import dynamic from 'next/dynamic';

const UnlockTimeTop = dynamic(() => import('./components/unlock-time-top'), { ssr: false })
const UsTable = dynamic(() => import('./components/us-table'), { ssr: false })

const breadcrumbConfig = [
  {
    title: 'Trustbyt',
  },
  {
    title: <a href='#'>Unlock</a>,
  },
];

export default function UnlockSchedule() {
  // const { unlockTimeData } = useUnlockTime();
  return (
    <Page breadcrumbs={breadcrumbConfig} classnames='unlock-schedule'>
      <UnlockTimeTop />
      <UsTable />
    </Page>
  );
}
