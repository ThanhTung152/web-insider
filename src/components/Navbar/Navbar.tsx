'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import './style.scss';
import IconTopcoin from '@/assets/icons/IconTopcoin';
import IconTrendingCoin from '@/assets/icons/IconTrendingCoin';
import IconNewCoins from '@/assets/icons/IconNewCoins';
import IconCategory from '@/assets/icons/IconCategory';
import IconGainerAndLosers from '@/assets/icons/IconGainer&Losers';
import IconTopNFTs from '@/assets/icons/IconTopNFTs';
import IconTrendingNFTs from '@/assets/icons/IconTrendingNFTs';
import IconNewestNFTs from '@/assets/icons/IconNewestNFTs';
import IconTopBacker from '@/assets/icons/IconTopBacker';
import IconFundingRounds from '@/assets/icons/IconFundingRounds';
import IconOverview from '@/assets/icons/IconOverview';
import IconUpcoming from '@/assets/icons/IconUpcoming';
import IconOngoing from '@/assets/icons/IconOngoing';
import IconEnded from '@/assets/icons/IconEnded';
import IconIDOLaunchpads from '@/assets/icons/IconIDOLaunchpads';
import IconIEOLaunchpads from '@/assets/icons/IconIEOLaunchpads';
import IconSpot from '@/assets/icons/IconSpot';
import IconDerivatives from '@/assets/icons/IconDerivatives';
import IconDex from '@/assets/icons/IconDex';
import IconLending from '@/assets/icons/IconLending';
import IconCEXTansparency from '@/assets/icons/IconCEXTansparency';
import IconAirdrops from '@/assets/icons/IconAirdrops';
import IconResearch from '@/assets/icons/IconResearch';
import IconTopKOLs from '@/assets/icons/IconTopKOLs';
import IconTopActiveUsers from '@/assets/icons/IconTopActiveUsers';
import IconTopPosts from '@/assets/icons/IconTopPosts';
import { IconArrowDown } from '@/assets/icons/IconArrowDown';
import { useParams, useRouter } from 'next/navigation';

const Navbar = () => {
  const navbarData = [
    {
      id: 1,
      categoryName: 'Cryptos',
      isMultiLevel: true,
      subCateLevel1: [
        {
          id: 1,
          name: 'Coins',
          subCateLevel2: [
            {
              id: 1,
              name: 'Top Coins',
              icons: <IconTopcoin />,
              link: '/',
            },
            {
              id: 2,
              name: 'Trending Coins',
              icons: <IconTrendingCoin />,
              link: '/',
            },
            {
              id: 3,
              name: 'New Coins',
              icons: <IconNewCoins />,
            },
            {
              id: 4,
              name: 'Categories',
              icons: <IconCategory />,
            },
            {
              id: 5,
              name: 'Gainer & Losers',
              icons: <IconGainerAndLosers />,
            },
          ],
        },
        {
          id: 2,
          name: 'NFTs',
          subCateLevel2: [
            {
              id: 1,
              name: 'Top NFTs',
              icons: <IconTopNFTs />,
            },
            {
              id: 2,
              name: 'Trending NFTs',
              icons: <IconTrendingNFTs />,
            },
            {
              id: 3,
              name: 'New NFTs',
              icons: <IconNewestNFTs />,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      categoryName: 'Fundraising',
      isMultiLevel: false,
      subCateLevel1: [
        {
          id: 1,
          name: 'Top Backers',
          icons: <IconTopBacker />,
          href: '/fundraising/top-backers',
        },
        {
          id: 2,
          name: 'Funding Rounds',
          icons: <IconFundingRounds />,
          href: '/fundraising/funding-rounds',
        },
        {
          id: 3,
          name: 'Overview',
          icons: <IconOverview />,
          href: '/fundraising/overview',
        },
      ],
    },
    {
      id: 3,
      categoryName: 'IDO/IEO',
      isMultiLevel: false,
      subCateLevel1: [
        {
          id: 1,
          name: 'Upcoming',
          icons: <IconUpcoming />,
          href: '/ieo-ido/upcoming',
        },
        {
          id: 2,
          name: 'Ongoing',
          icons: <IconOngoing />,
          href: '#',
        },
        {
          id: 3,
          name: 'Ended',
          icons: <IconEnded />,
          href: '/ieo-ido/ended',
        },
        {
          id: 4,
          name: 'IDO Launchpads',
          icons: <IconIDOLaunchpads />,
          href: '/ieo-ido/ido-launchpads',
        },
        {
          id: 5,
          name: 'IEO Launchpads',
          icons: <IconIEOLaunchpads />,
          href: '#',
        },
        {
          id: 6,
          name: 'Overview',
          icons: <IconOverview />,
          href: '#',
        },
      ],
    },
    {
      id: 4,
      categoryName: 'Exchanges',
      isMultiLevel: false,
      subCateLevel1: [
        {
          id: 1,
          name: 'Spot',
          icons: <IconSpot />,
          // href: '/exchange',
          href: '/exchange/spot',
        },
        {
          id: 2,
          name: 'Derivatives',
          icons: <IconDerivatives />,
          href: '/exchange/spot',
          // href: '/exchange/derivatives',
        },
        {
          id: 3,
          name: 'Dex',
          icons: <IconDex />,
          href: '/exchange/spot',
          // href: '/exchange/dex',
        },
        {
          id: 4,
          name: 'Lending',
          icons: <IconLending />,
          href: '/exchange/spot',
          // href: '/exchange/lending',
        },
        {
          id: 5,
          name: 'CEX Transparency',
          icons: <IconCEXTansparency />,
          href: '/exchange/spot',
          // href: '/exchange/cex-transparency',
        },
      ],
    },
    {
      id: 5,
      categoryName: 'Community',
      isMultiLevel: false,
      subCateLevel1: [
        {
          id: 1,
          name: 'Airdrops',
          icons: <IconAirdrops />,
          href: '/community',
          // href: '/community/airdrops',
        },
        {
          id: 2,
          name: 'Research',
          icons: <IconResearch />,
          href: '/community',
          // href: '/community/research',
        },
        {
          id: 3,
          name: 'Top KOLs',
          icons: <IconTopKOLs />,
          href: '/community',
          // href: '/community/top-kols',
        },
        {
          id: 4,
          name: 'Top Active Users',
          icons: <IconTopActiveUsers />,
          href: '/community',
          // href: '/community/top-active-users',
        },
        {
          id: 5,
          name: 'Top Posts',
          icons: <IconTopPosts />,
          href: '/community',
          // href: '/community/top-posts',
        },
      ],
    },
    {
      id: 6,
      categoryName: 'Unlock',
      link: 'unlock-schedule',
      isNotSubMenu: true,
      isMultiLevel: false,
      href: '/unlock-schedule',
    },
  ];
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const [activeMenuMobile, setActiveMenuMobile] = useState<number>(0);
  const activeMobileHandler = (id: number, href?: string) => {
    if (href) {
      return router.push(`/${params.locale}${href}`);
    }

    if (id === activeMenuMobile) {
      return setActiveMenuMobile(0);
    }
    setActiveMenuMobile(id);
  };

  return (
    <div className='nav-bar flex text-gray-600 border-gray-900 border-solid gap-12 items-center'>
      <div className='nav-bar-desktop hidden xl:flex text-gray-600 border-gray-900 border-solid gap-12 items-center'>
        <div className='flex items-center logo'>
          <Link href={'/'} prefetch={false}>
            <Image src={'/logo.png'} width={131} height={31} alt='Logo' />
          </Link>
        </div>
        <div className='flex justify-center lg:justify-start'>
          <div className='flex gap-8'>
            {navbarData?.map((navItem) => (
              <div className='menu cursor-pointer relative' key={navItem?.id}>
                {navItem?.href ? (
                  <Link
                    prefetch={false}
                    href={`/${params.locale}${navItem.href}`}
                    className='menu text-base font-semibold font-jb hover:text-primary-500 text-grey-700'
                  >
                    {navItem.categoryName}
                  </Link>
                ) : (
                  <span className='menu text-base font-semibold font-jb hover:text-primary-500 text-grey-700'>
                    {navItem.categoryName}
                  </span>
                )}
                <div className='sub-menu absolute top-full left-1/2 -translate-x-2/4'>
                  <div className='caret'></div>
                  {navItem.isMultiLevel ? (
                    <div className='sub-menu-wrapper fade-top rounded-lg bg-grey-100 p-3 min-w-[440px]'>
                      {navItem?.subCateLevel1 &&
                      navItem?.subCateLevel1.length > 0 ? (
                        <div className='grid grid-cols-2 gap-8'>
                          {navItem?.subCateLevel1.map((sub: any) => (
                            <div className='ingredient' key={sub.id}>
                              <Link
                                prefetch={false}
                                href={`/${params.locale}${sub.href}`}
                              >
                                <div className='ingredient__title text-base font-bold text-grey-700 mb-3'>
                                  {sub.name}
                                </div>
                              </Link>

                              {sub?.subCateLevel2 &&
                              sub?.subCateLevel2.length > 0 ? (
                                <div>
                                  {sub?.subCateLevel2.map((sublv2: any) => (
                                    <div
                                      className='flex gap-2 p-3 sub-menu-item rounded'
                                      key={sublv2.id}
                                    >
                                      {sublv2?.icons}
                                      <span>{sublv2.name}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                  {!navItem.isMultiLevel &&
                  navItem?.subCateLevel1 &&
                  navItem?.subCateLevel1.length > 0 ? (
                    <div className='sub-menu-wrapper fade-top rounded-lg bg-grey-100 p-2 min-w-[220px]'>
                      {navItem?.subCateLevel1.map((sub: any) => (
                        <Link
                          className='flex gap-2 p-3 sub-menu-item'
                          key={sub.id}
                          prefetch={false}
                          href={`/${params.locale}${sub.href}`}
                        >
                          {sub?.icons}
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='nav-bar-mobile xl:hidden w-full'>
        <div className='menu-mobile p-4'>
          {navbarData?.map((navItem) => (
            <div
              className='menu cursor-pointer relative py-3'
              key={navItem?.id}
            >
              <div
                className='menu text-base font-semibold font-jb hover:text-primary-500 text-grey-700 flex justify-between items-center'
                onClick={() => activeMobileHandler(navItem.id, navItem.href)}
              >
                <span
                  className={
                    activeMenuMobile === navItem?.id ? 'text-primary-400' : ''
                  }
                >
                  {navItem.categoryName}
                </span>
                {navItem?.subCateLevel1 && navItem?.subCateLevel1.length > 0 ? (
                  <div
                    className={
                      'transition-all ' +
                      (activeMenuMobile === navItem?.id ? 'rotate-180' : '')
                    }
                  >
                    <IconArrowDown />
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div
                className={
                  'sub-menu-mobile ' +
                  (activeMenuMobile === navItem?.id ? '' : 'hidden')
                }
              >
                {navItem.isMultiLevel ? (
                  <div className='fade-right rounded-lg p-3'>
                    {navItem?.subCateLevel1 &&
                    navItem?.subCateLevel1.length > 0 ? (
                      <div className='grid grid-cols-1 gap-8'>
                        {navItem?.subCateLevel1.map((sub: any) => (
                          <div className='ingredient' key={sub.id}>
                            {sub.href ? (
                              <Link
                                prefetch={false}
                                href={`/${params.locale}${sub.href}`}
                                className='ingredient__title text-base font-semibold font-jb text-grey-700 mb-3'
                              >
                                {sub.name}
                              </Link>
                            ) : (
                              <div className='ingredient__title text-base font-semibold font-jb text-grey-700 mb-3'>
                                {sub.name}
                              </div>
                            )}

                            {sub?.subCateLevel2 &&
                            sub?.subCateLevel2.length > 0 ? (
                              <div>
                                {sub?.subCateLevel2.map((sublv2: any) =>
                                  sublv2?.href ? (
                                    <Link
                                      prefetch={false}
                                      href={`/${params.locale}${sublv2.href}`}
                                      className='flex gap-2 p-3 sub-menu-item rounded'
                                      key={sublv2.id}
                                    >
                                      {sublv2?.icons}
                                      <span>{sublv2.name}</span>
                                    </Link>
                                  ) : (
                                    <div
                                      className='flex gap-2 p-3 sub-menu-item rounded'
                                      key={sublv2.id}
                                    >
                                      {sublv2?.icons}
                                      <span>{sublv2.name}</span>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  ''
                )}
                {!navItem.isMultiLevel &&
                navItem?.subCateLevel1 &&
                navItem?.subCateLevel1.length > 0 ? (
                  <div className='fade-right rounded-lg p-2'>
                    {navItem?.subCateLevel1.map((sub: any) =>
                      sub?.href ? (
                        <Link
                          href={`/${params.locale}${sub.href}`}
                          className='flex gap-2 p-3 sub-menu-item'
                          key={sub.id}
                          prefetch={false}
                        >
                          {sub?.icons}
                          <span>{sub.name}</span>
                        </Link>
                      ) : (
                        <div
                          className='flex gap-2 p-3 sub-menu-item'
                          key={sub.id}
                        >
                          {sub?.icons}
                          <span>{sub.name}</span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
