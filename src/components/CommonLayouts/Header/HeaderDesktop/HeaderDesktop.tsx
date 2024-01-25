import { IconDiamond } from '@/assets/icons';
import { IconPortfolio } from '@/assets/icons/IconPortfolio';
import { IconWatch } from '@/assets/icons/IconWatch';
import Button from '@/components/Button/Button';
import Marquee from '@/components/Marquee/Marquee';
import Navbar from '@/components/Navbar/Navbar';
import SearchInput from '@/components/SearchInput/SearchInput';
import SwitcherCurrency from '@/components/SwitcherCurrency/SwitcherCurrency';
import SwitcherLanguage from '@/components/SwitcherLanguage/SwitcherLanguage';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const HeaderDesktop = () => {
  const t = useTranslations('Header');

  return (
    <div className='hidden xl:block'>
      <div className='z-[999] border-b border-solid border-grey-300'>
        <div className='flex items-center px-4 justify-between gap-8 py-3'>
          <div className='flex-grow'>
            <Marquee />
          </div>
          <div className='flex items-center gap-3 justify-end'>
            <div className='flex items-center gap-5'>
              <SwitcherLanguage />
              <SwitcherCurrency />
            </div>
            <button>
              <IconDiamond />
            </button>
            <div className='flex items-center gap-5'>
              <div className='flex items-center gap-2'>
                <Button>Sign In</Button>
                <Button type='primary'>Sign Up</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center px-4 py-3 justify-between'>
        <Navbar />
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <IconWatch />
              <Link className='text-sm' href={'/'}>
                {t('watchlist')}
              </Link>
            </div>
            <div className='flex items-center gap-2'>
              <IconPortfolio />
              <Link className='text-sm' href={'/'}>
                {t('portfolio')}
              </Link>
            </div>
          </div>
          <div className=''>
            <SearchInput component='header' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktop;
