'use client';

import Image from 'next/image';
import './index.scss';
import React, { useState, useEffect} from 'react';
import {Flex, Popover } from 'antd';
import Link from 'next/link';
import { nFormatter, percentFormat } from '@/helpers';
import { FetchInfomationCoin } from '@/usecases/exchange';
import { round } from 'lodash';
import { COLOR_CHART } from '@/helpers/constants';
import IconWeb from '@/assets/icons/IconWeb';
import { IconTwitter,
         IconFile, 
         IconTelegram, 
         IconMedium,
         IconDiscord,
         IconGithub,
} from '@/assets/icons';
import IconFacebook from '../icons/IConFacebook';
import { useParams } from 'next/navigation';
import { ICoinInfo, CoinAllocation, ILink } from '../../props';
import ModalChart from './modalAllocation';

const linkRef = ['twitter', 'web', 'telegram', 'discord', 'facebook', 'medium', 'github', 'file'];

export function _renderIconLinks(type: string) {
  switch (type) {
    case 'twitter':
      return <IconTwitter />;
    case 'web':
      return <IconWeb />;
    case 'telegram':
      return <IconTelegram />;
    case 'discord':
      return <IconDiscord />;
    case 'facebook':
      return <IconFacebook />; 
    case 'medium':
      return <IconMedium />;
    case 'github':
      return <IconGithub />;
    case 'file':
      return <IconFile />;
    default: return 
  }
}


const CoinInformation = () => {
  const params = useParams<{ locale: string; slug: string }>();
  const [coinsData, setCoinsData] = useState<ICoinInfo>();
  const [totalVolume, setTotalVolume] = useState<number>(9999);
  const [listTopCoin, setListTopCoin] = useState<CoinAllocation[]>([]);

  const getData = async () => {
    const responses: any = await FetchInfomationCoin({ key: params.slug });
    if (!responses) return;
    console.log(responses)
    setCoinsData(responses);
    setTotalVolume(await responses.totalUsdVolume);
    setListTopCoin(await responses.tokenAllocation);
  };

  useEffect(() => {
    getData();
  }, [params.slug]);

  const colorChart = [
    COLOR_CHART.BITTER_LEMON,
    COLOR_CHART.MALACHITE,
    COLOR_CHART.PAOLO_VERONESE_GREEN,
    COLOR_CHART.TURQUOISE_SURF,
    COLOR_CHART.CERULEAN_FROST,
    COLOR_CHART.PLUMP_PURPLE,
    COLOR_CHART.PURPUREUS,
    COLOR_CHART.JAZZBERRY_JAM,
    COLOR_CHART.CERISE,
    COLOR_CHART.SUNSET_ORANGE,
  ];

  const _renderFlag = () => {
    return (
      coinsData?.country? (
        <div>
          <img height={23} width={33} src= {`/Flag/Country=${coinsData?.country}, Style=Flag, Radius=Off.svg`}/>
        </div>
      )
      : ('')
    )
  }

  const _renderLinks = () => {
    const links: ILink[] = (coinsData?.links ?? []).filter(link => linkRef.includes(link.type));
    const elements: JSX.Element[] = links.slice(0, 3).map((link: ILink) => {
      return (
        <Link href={link.value} key={link.value}>
          {_renderIconLinks(link.type)}
        </Link>
      );
    });

    const remainingElements: JSX.Element[] = links.slice(3).map((link: ILink) => (
      <Link href={link.value} key={link.value}>
        {_renderIconLinks(link.type)}
      </Link>
    ));

    return (
      links.length > 3? 
      (
        <Flex vertical gap={8}>
          <div className='text-gray-400 text-xs font-jm leading-tight'>
            Links
          </div>
          <Flex gap={20}>
            {elements}
            <Popover
              trigger='click'
              placement='bottom'
              content={
                <Flex gap={20}>
                  {remainingElements}
                </Flex>
              }
            >
              <div className='w-7 h-7 bg-slate-200 rounded-3xl flex-col justify-center items-center inline-flex'>
                <div className='text-zinc-700 text-xs font-jsb leading-tight hover:cursor-pointer'>
                  +{remainingElements.length}
                </div>
              </div>
            </Popover>
          </Flex>
        </Flex>
      ):(
        links.length !== 0?
        (        
        <Flex vertical gap={8}>
          <div className='text-gray-400 text-xs font-jm leading-tight'>
            Links
          </div>
          <Flex gap={20}>
            {elements}
          </Flex>
        </Flex>
        )  : (
          ''
        )
      )
    );
  };

  const _caculateCoin = (i: number) => {
    let rate = round((listTopCoin[i]?.usdVolume / totalVolume) * 100, 2);
    let name = listTopCoin[i]?.coinName;
    let volumes = listTopCoin.slice(0, 9).map((item) => item?.usdVolume);
    let otherSum =
      totalVolume - volumes.reduce((total, volume) => total + volume, 0);
    let otherRate = round((otherSum / totalVolume) * 100, 2);
    if (i < 9) {
      return (
        <div className='flex index__detail'>
          <span className='mr-1'>{name + ': '}</span>
          <span>{rate + '%'}</span>
        </div>
      );
    } else {
      return (
        <div className='flex index__detail'>
          <span className='mr-1'>Other:</span>
          <span>{otherRate + '%'}</span>
        </div>
      );
    }
  };

  const _renderLinePopup = (i: number) => {
    let _color = colorChart[i];
    return (
      <div className='popup__contents-index hover:cursor-pointer flex'>
        <div>
          <svg
            className='w-4.5 h-5 hover:w-5.5 hover:h-6'
            viewBox='0 0 18 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
              fill={_color}
            />
          </svg>
        </div>
        {_caculateCoin(i)}
      </div>
    );
  };

  return (
    <div className='w-full bg-white mx-auto'>
      <div className='coins bg-white px-6 pt-6 pb-4 gap-1.5 rounded-lg shadow'>
        <div className='coins__header flex border-b pb-6 justify-between'>
          <div className='flex gap-4 items-center justify-center'>
            <img src={coinsData?.icon} />

            <div className='flex-col gap-3 justify-start inline-flex'>
              <div className='coins__name text-zinc-700 text-2xl font-jb leading-loose'>
                {coinsData?.name}
              </div>
              <div className='justify-start items-center inline-flex'>
                <div className='px-2 bg-slate-100 rounded items-center'>
                  <div className='text-gray-400 text-xs font-jm leading-tight'>
                    Tier 
                    <span className='ml-1'>
                      {coinsData?.tier? coinsData?.tier : '1'}
                    </span>
                  </div>
                </div>

                <div className='line__tag border border-grey-400 mx-3' />

                <div className='flex items-center '>
                  <span className='text-gray-400 text-xs font-jm leading-tight'>
                    Year of Foundation:
                  </span>
                  <span className='text-zinc-700 text-xs font-jb leading-tight'>
                    {coinsData?.yearOfFoundation?
                      coinsData?.yearOfFoundation : '-'
                    }
                  </span>
                </div>

                <div className='w-1.5 h-1.5 mx-2 bg-gray-300 rounded-full' />

                <span className='coins__tag items-center'>
                  <Popover
                    content={
                      <div className='text-right text-zinc-700 text-xs font-medium leading-tight'>
                        {coinsData?.country}
                      </div>
                    }
                    trigger='hover'
                  >
                    {/* {showFlag(coinsData?.country)} */}
                    <Link href='../spot'>
                      {_renderFlag()}
                    </Link>
                  </Popover>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='coins__info grid grid-cols-5 mt-1.5'>
          <div className='col-span-5 md:col-span-3'>
            <div className='coins__body grid grid-cols-2'>
              <div className='col-span-2 xl:col-span-1'>
                <div className='coins__value flex-col justify-start gap-2 inline-flex'>
                  <div className='flex items-center'>
                    <div className='text-xs text-gray-400 font-jm leading-tight'>
                      Spot Trading Volume
                    </div>
                  </div>

                  <div className='items-center gap-4 inline-flex'>
                    <span className='price text-[40px] font-jeb leading-[48px]'>
                      {nFormatter(Number(coinsData?.spotTradingVolume.usd), 2, '$')}
                    </span>
                    <span className='price--increase text-base font-jsb'>
                      {percentFormat(Number(coinsData?.spotTradingVolume.percent))}
                    </span>
                  </div>

                  <div className='text-zinc-700 text-sm font-jm leading-tight'>
                    {nFormatter(Number(coinsData?.spotTradingVolume.btc), 3, 'BTC')}
                  </div>
                </div>

                <div className='coins__socials mt-8'>
                  <div className='coins__links flex-col justify-start items-start gap-2 inline-flex'>
                    {_renderLinks()}
                  </div>
                </div>
              </div>

              <div className='col-span-2 xl:col-span-1'>
                <div className='coins__category xl:w-4/5 flex-wrap flex gap-y-6'>
                  <div className='category'>
                    <div className='coins__title'>Market Share</div>
                    <div className='category__number'>
                      {coinsData?.marketShare
                        ? coinsData?.marketShare + '%'
                        : '-'}
                    </div>
                  </div>

                  <div className='category'>
                    <div className='coins__title'>Financial Reserves</div>
                    <div className='category__number'>
                      {nFormatter(Number(coinsData?.financialReserves), 2, '$')}
                    </div>
                  </div>

                  <div className='category'>
                    <div className='coins__title'>Coin</div>
                    <div className='category__number'>
                      {coinsData?.coinsCount?
                        coinsData?.coinsCount
                        : '-'}
                    </div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Trading Pairs</div>
                    <div className='category__number'>
                      {coinsData?.pairsCount ? coinsData?.pairsCount : '-'}
                    </div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Native Token</div>
                    <div className='category__link flex'>
                      <Image
                        src={coinsData?.nativeCoin.logo? coinsData?.nativeCoin.logo : ''}
                        alt=''
                        width={20}
                        height={20}
                      />
                      <div className='ml-2 text-zinc-700 text-base font-jsb leading-normal'>
                        {coinsData?.nativeCoin.name? coinsData?.nativeCoin.name : ''}
                      </div>
                    </div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Fees</div>
                    <div className='category__link flex'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M13 11L21.2 2.80005'
                          stroke='#5766FF'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M22 6.8V2H17.2'
                          stroke='#5766FF'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13'
                          stroke='#5766FF'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </svg>
                      <Link href=''>
                        {/* <Link href={coinsData?.links}> */}
                        <div className='items-center ml-2 text-zinc-700 text-base font-jsb underline'>
                          Source
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-5 pt-5 md:pt-0 md:col-span-2 border-t md:border-t-0 md:border-l border-gray-200'>
            <div className='md:ml-6 '>
              {/* <Allocation list={listTopCoin} total={totalVolume} /> */}
              <ModalChart data = {listTopCoin} totalVolume={totalVolume}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInformation;
