'use client';

import { IconDiamond, IconSearch } from '@/assets/icons';
import IconClose from '@/assets/icons/IconClose';
import { IconMenu } from '@/assets/icons/IconMenu';
import Marquee from '@/components/Marquee/Marquee';
import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import './index.scss';
import SwitcherLanguage from '@/components/SwitcherLanguage/SwitcherLanguage';
import SwitcherCurrency from '@/components/SwitcherCurrency/SwitcherCurrency';
import Button from '@/components/Button/Button';
import { IconPortfolio } from '@/assets/icons/IconPortfolio';
import { IconWatch } from '@/assets/icons/IconWatch';

const HeaderMobile = () => {
  const [activeMenuMobile, setActiveMenuMobile] = useState(false);

  const openMobileHandler = () => {
    setActiveMenuMobile(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileHandler = () => {
    setActiveMenuMobile(false);
    document.body.style.overflow = 'auto';
  };
  return (
    <div className='block xl:hidden'>
      <div className='w-full px-8 py-3'>
        <Marquee />
      </div>
      <div className='w-full px-8 py-3 flex items-center justify-between'>
        <div className='flex items-center logo'>
          <Link href={'/'}>
            <Image src={'/logo.png'} width={131} height={31} alt='Logo' />
          </Link>
        </div>
        <div className='actions'>
          <div className='flex items-center gap-5'>
            <div>
              <IconSearch />
            </div>
            <div onClick={() => openMobileHandler()}>
              <IconMenu />
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          'drawer-wrapper fixed top-0 bg-white h-screen overflow-y-auto w-[320px] z-50 transition-all ' +
          (activeMenuMobile ? 'right-0' : '-right-[320px]')
        }
      >
        <div className='flex items-center justify-between p-4 border-b border-grey-300'>
          <Link href={'/'}>
            <Image src={'/logo.png'} width={131} height={31} alt='Logo' />
          </Link>
          <div onClick={() => closeMobileHandler()}>
            <IconClose />
          </div>
        </div>
        <div className='border-b border-grey-300'>
          <Navbar />
        </div>
        <div className='p-4'>
          <div className='flex items-center gap-2 mb-4'>
            <IconWatch />
            <Link className='text-sm' href={'/'}>
              watchlist
            </Link>
          </div>
          <div className='flex items-center gap-2'>
            <IconPortfolio />
            <Link className='text-sm' href={'/'}>
              portfolio
            </Link>
          </div>
        </div>
        <div className='p-4'>
          <Button classProps='w-full mb-4'>Sign In</Button>
          <Button classProps='w-full mb-4' type='primary'>
            Sign Up
          </Button>
        </div>
        <div className='flex items-center gap-5 p-4'>
          <SwitcherLanguage />
          <SwitcherCurrency />
          <button>
            <IconDiamond />
          </button>
        </div>
      </div>
      <div
        className={
          'overlay transition-all ' + (activeMenuMobile ? '' : 'hidden')
        }
        onClick={() => closeMobileHandler()}
      ></div>
    </div>
  );
};

export default HeaderMobile;
