'use client';

import {
  IconBell,
  IconCaretDown,
  IconCopy,
  IconSave,
  IconStar,
} from '@/assets/icons';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import InformationUnlock from '../information-unlock';
import { Popover, Select } from 'antd';
import './style.scss';
import IntroduceCoin from './popup/introduce-coin/IntroduceCoin';
import IconFdv from '@/assets/icons/IconFdv';
import Fdv from './popup/fdv/Fdv';
import Backers from './popup/backers/Backers';
import IconETH from '@/assets/icons/IconETH';
import WalletAddress from './popup/wallet/WalletAddress';
import WalletBrand from './popup/wallet/WalletBrand';
import Categories from './popup/categories/Categories';
import { currencyFormat, nFormatter, percentFormat } from '@/helpers';
import { IDetail } from '@/models/IDetail';
import Links from './popup/links/Links';

export default function CoinInformation({ data }: any) {
  let newData = data as IDetail;
  return (
    <div>
      <div className='bg-white py-6 px-2 md:px-6 coin-detail'>
        <div className='flex flex-col md:flex-row justify-between pb-6 border-b border-grey-300'>
          <div className='flex items-center gap-4 mb-4 md:mb-0'>
            <Popover content={<IntroduceCoin data={newData} />}>
              <img
                src={newData?.image?.x150}
                alt=''
                width={76}
                height={76}
                className='rounded-full min-w-[76px] max-w-[76px]'
              />
            </Popover>
            <div>
              <div className='flex items-center flex-wrap mb-3'>
                <h1 className='flex items-center text-grey-700 text-2xl font-bold'>
                  <Popover content={<IntroduceCoin data={newData} />}>
                    <span className='font-jb text-2xl'>{newData?.name}</span>
                  </Popover>
                  <span className='flex items-center px-2 rounded text-xs text-grey-500 bg-grey-200 font-medium ml-2'>
                    {newData?.symbol}
                  </span>
                  <span className='w-0.5 h-6 bg-grey-500 mx-4'></span>
                </h1>
                <div className='flex items-center gap-2'>
                  <IconStar />
                  <IconStar />
                  <IconStar />
                  <IconStar />
                  <IconStar />
                  <span className='text-primary-500 text-sm md:text-base'>
                    5.0
                  </span>
                </div>
                {/* <span className='w-2 h-2 bg-grey-500 mx-4 rounded-full'></span>
                <span className='text-primary-500 text-sm md:text-base'>
                  1.2K Ratings
                </span> */}
              </div>
              <div className='hidden md:flex gap-2 item-center'>
                <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200'>
                  #{newData?.rank}
                </span>
                <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200'>
                  #{newData?.wallet} in Wallet
                </span>
                <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200'>
                  <img
                    src='/coin-info/accumulating.png'
                    alt=''
                    width={12}
                    height={12}
                    className='mr-2'
                  />
                  Accumulating
                </span>
              </div>
            </div>
          </div>
          <div className='flex item-center gap-3 md:hidden'>
            <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap'>
              #{newData?.rank}
            </span>
            <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap'>
              #{newData?.wallet} in Wallet
            </span>
            <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap'>
              <img
                src='/coin-info/accumulating.png'
                alt=''
                width={12}
                height={12}
                className='mr-2'
              />
              Accumulating
            </span>
          </div>
          <div className='block mt-4 md:mt-0'>
            <div className='flex justify-start md:justify-end flex-wrap gap-4 coin__actions mb-3'>
              <button className='action p-2 rounded border border-grey-300 hover:bg-grey-200'>
                <IconSave />
              </button>
              <button className='action p-2 rounded border border-grey-300 hover:bg-grey-200'>
                <PencilSquareIcon className='w-5 h-5' />
              </button>
              <button className='action p-2 rounded border border-grey-300 hover:bg-grey-200'>
                <IconBell />
              </button>
            </div>
            <div className='flex justify-start md:justify-end flex-wrap gap-2'>
              <span className='text-sm text-grey-500'>Categories</span>
              <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'>
                {data?.category}
              </span>
              {/* <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'>
                Wallet
              </span>
              <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'>
                BNB
              </span>
              <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'>
                Defi
              </span> */}
              <Popover
                placement='bottomRight'
                content={<Categories data={newData} />}
              >
                <span className='flex items-center px-2 rounded text-xs text-primary-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'>
                  See All
                </span>
              </Popover>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-6 xl:grid-cols-12'>
          <div className='col-span-6 md:col-span-3 xl:col-span-8 2xl:col-span-10'>
            <div className='gap-4 md:gap-[35px] xl:gap-[70px] mt-6 flex flex-wrap'>
              <div>
                <div className='flex flex-wrap gap-2 md:gap-4 items-center'>
                  <span className='text-xl md:text-3xl font-bold'>
                    {newData?.price?.USD
                      ? nFormatter(newData?.price?.USD, 5, '$')
                      : ''}
                  </span>
                  <span className='text-sp-green-500 text-xs text-base'>
                    {percentFormat(newData?.price_change_in_24h * 100)}
                  </span>
                </div>
                <div className='flex items-center flex-wrap coin-detail__range text-grey-700'>
                  <span>
                    {' '}
                    {currencyFormat(newData?.atlPrice?.USD || 0, '$')}
                  </span>
                  <div className='price__range'>
                    <div className='price__range--active'></div>
                  </div>
                  <span className='mr-2'>
                    {currencyFormat(newData?.athPrice?.USD || 0, '$')}
                  </span>
                  <Select
                    defaultValue='24'
                    className='select-time w-[60px]'
                    options={[
                      { value: '24h', label: '24h' },
                      { value: '7d', label: '7D' },
                      { value: '30d', label: '30D' },
                      { value: '1y', label: '1Y' },
                      { value: 'all', label: 'All' },
                    ]}
                  />
                </div>
                <div className='flex items-center mb-1'>
                  <span className='text-grey-500 text-sm'>IDO Price:</span>
                  <span className='text-grey-700 text-sm mr-1 font-jsb font-semibold'>
                    {currencyFormat(newData?.idoPrice, '$')}
                  </span>
                  <span className='text-xs text-sp-green-500'>
                    (
                    {newData?.price?.USD
                      ? currencyFormat(
                          newData?.price.USD / newData?.idoPrice,
                          ''
                        )
                      : 0}{' '}
                    x)
                  </span>
                </div>
                <div className='flex items-center mb-1'>
                  <span className='text-grey-500 text-sm'>Private Price:</span>
                  <span className='text-grey-700 text-sm mr-1 font-jsb font-semibold'>
                    {currencyFormat(newData?.atlPrice?.USD || 0, '$')}
                  </span>
                  <span className='text-xs text-sp-green-500'>
                    (
                    {newData?.price?.USD
                      ? currencyFormat(
                          newData?.price.USD / (newData?.atlPrice?.USD || 0),
                          ''
                        )
                      : 0}
                    x)
                  </span>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 md:gap-y-9 gap-x-[60px]'>
                <div className='category'>
                  <div className='text-grey-500 text-sm'>Market Cap</div>
                  <div className='text-grey-700 flex flex-wrap items-center gap-1 font-jsb font-semibold'>
                    {nFormatter(Number(newData?.marketCap), 3, '$')}
                    <span className='text-xs text-sp-green-500'>+2.83%</span>
                  </div>
                </div>
                <div className='category'>
                  <div className='text-grey-500 text-sm'>Volume 24h</div>
                  <div className='text-grey-700 flex flex-wrap items-center gap-1 font-jsb font-semibold'>
                    {nFormatter(Number(newData?.volume24h), 2, '')}
                    <span className='text-xs text-sp-green-500'>+2.83%</span>
                  </div>
                </div>
                <div className='category'>
                  <div className='text-grey-500 text-sm'>Vol/MCap 24h</div>
                  <div className='text-grey-700 font-jsb font-semibold'>
                    {currencyFormat(newData?.volMCap24h, '$', { numberRound: 5 })}
                  </div>
                </div>
                <div className='category'>
                  <div className='text-grey-500 text-sm flex gap-1 items-center'>
                    FDV
                    <Popover content={<Fdv />}>
                      <IconFdv />
                    </Popover>
                  </div>
                  <div className='text-grey-700 font-jsb font-semibold'>
                    {nFormatter(Number(newData?.fdv), 3, '$')}
                  </div>
                </div>
                <div className='category'>
                  <div className='text-grey-500 text-sm'>Circ.Supply</div>
                  <div className='text-grey-700 flex flex-wrap items-center gap-1 font-jsb font-semibold'>
                    {nFormatter(newData?.circ, 3, '$')}
                    <span className='text-grey-500 text-xs'>
                      {percentFormat(Number(newData?.percentOfCircSupply))}
                    </span>
                  </div>
                </div>
                <div className='category'>
                  <div className='text-grey-500 text-sm'>Total Supply</div>
                  <div className='text-grey-700 flex flex-wrap items-center font-jsb font-semibold'>
                    {nFormatter(Number(newData?.totalSupply), 2, '')}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-4 xl:gap-8 2xl:gap-[110px] flex-wrap'>
              {newData?.tokens && (
                <div className='mt-3 xl:mt-7'>
                  <span className='text-grey-500 text-sm mb-1'>Contracts</span>
                  <Contracts tokens={newData?.tokens} />
                </div>
              )}

              <div className='flex flex-wrap gap-4 md:gap-8 xl:gap-[110px] xl:mt-7'>
                {/* <div>
                  <p className='text-grey-500 text-sm'>Links</p>
                  <div className='flex gap-4 xl:gap-5 py-[6px]'>
                    <svg
                      width='28'
                      height='28'
                      viewBox='0 0 28 28'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g clipPath='url(#clip0_168_80208)'>
                        <path
                          d='M19.0259 8.09506C18.0412 3.52155 15.9411 0.628113 13.9988 0.628113C12.0565 0.628113 9.95638 3.52155 8.97168 8.09506H19.0259Z'
                          fill='#26C8B2'
                        />
                        <path
                          d='M8.39893 13.6953C8.3987 14.9439 8.48195 16.1912 8.64814 17.4287H19.3501C19.5163 16.1912 19.5996 14.9439 19.5993 13.6953C19.5996 12.4466 19.5163 11.1993 19.3501 9.96179H8.64814C8.48195 11.1993 8.3987 12.4466 8.39893 13.6953Z'
                          fill='#26C8B2'
                        />
                        <path
                          d='M8.97168 19.2955C9.95638 23.869 12.0565 26.7625 13.9988 26.7625C15.9411 26.7625 18.0412 23.869 19.0259 19.2955H8.97168Z'
                          fill='#26C8B2'
                        />
                        <path
                          d='M20.9404 8.09518H26.8206C25.9371 6.08448 24.5947 4.30883 22.901 2.91063C21.2073 1.51244 19.2095 0.530627 17.0679 0.0439453C18.8385 1.60174 20.2273 4.48211 20.9404 8.09518Z'
                          fill='#26C8B2'
                        />
                        <path
                          d='M27.4918 9.96179H21.2382C21.3922 11.2003 21.4692 12.4472 21.4688 13.6953C21.4689 14.9433 21.3916 16.1902 21.2373 17.4287H27.4909C28.1715 14.9863 28.1725 12.4042 27.4918 9.96179Z'
                          fill='#26C8B2'
                        />
                        <path
                          d='M17.0679 27.3468C19.2099 26.8603 21.208 25.8787 22.902 24.4804C24.5961 23.0822 25.9388 21.3064 26.8225 19.2955H20.9423C20.2273 22.9086 18.8385 25.789 17.0679 27.3468Z'
                          fill='#26C8B2'
                        />
                        <path
                          d='M7.05747 19.2955H1.17725C2.06095 21.3064 3.40368 23.0822 5.0977 24.4804C6.79173 25.8787 8.78989 26.8603 10.9319 27.3468C9.15941 25.789 7.77056 22.9086 7.05747 19.2955Z'
                          fill='#26C8B2'
                        />
                        <path
                          d='M10.9319 0.0439453C8.78989 0.530363 6.79173 1.51206 5.0977 2.91026C3.40368 4.30847 2.06095 6.08427 1.17725 8.09518H7.05747C7.77243 4.48211 9.16128 1.60174 10.9319 0.0439453Z'
                          fill='#26C8B2'
                        />
                        <path
                          d='M6.5326 13.6953C6.53248 12.4472 6.60978 11.2003 6.76407 9.96179H0.510507C-0.170169 12.4042 -0.170169 14.9863 0.510507 17.4287H6.76407C6.60978 16.1902 6.53248 14.9433 6.5326 13.6953Z'
                          fill='#26C8B2'
                        />
                      </g>
                      <defs>
                        <clipPath id='clip0_168_80208'>
                          <rect width='28' height='28' fill='white' />
                        </clipPath>
                      </defs>
                    </svg>
                    <svg
                      width='28'
                      height='28'
                      viewBox='0 0 28 28'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8.78825 24.5C5.55325 24.5 2.53769 23.5932 -0.000488281 22.0285C2.1545 22.1629 5.95758 21.8411 8.32309 19.6665C4.76459 19.5091 3.15977 16.8788 2.95045 15.7547C3.25281 15.8671 4.69481 16.002 5.50885 15.6873C1.41541 14.6981 0.787439 11.2359 0.926988 10.1793C1.69451 10.6964 2.99697 10.8762 3.50865 10.8313C-0.305695 8.20096 1.06654 4.24423 1.74102 3.38994C4.47834 7.04485 8.58071 9.09759 13.6559 9.21177C13.5602 8.80729 13.5097 8.38618 13.5097 7.95366C13.5097 4.84963 16.1129 2.33331 19.3242 2.33331C21.0021 2.33331 22.5139 3.02024 23.5752 4.11902C24.6964 3.86581 26.3838 3.27305 27.2087 2.76046C26.7929 4.19927 25.4984 5.39953 24.7154 5.84439C24.709 5.82919 24.7219 5.85953 24.7154 5.84439C25.4032 5.74412 27.2643 5.39941 27.9995 4.91867C27.6359 5.72698 26.2635 7.07094 25.1372 7.82334C25.3468 16.7301 18.276 24.5 8.78825 24.5Z'
                        fill='#1DA1F2'
                      />
                    </svg>
                    <svg
                      width='28'
                      height='28'
                      viewBox='0 0 28 28'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx='14' cy='14' r='14' fill='#03A8E2' />
                      <path
                        d='M20.9866 8.20879C21.1112 7.40332 20.3454 6.76755 19.6292 7.082L5.36482 13.3448C4.85123 13.5703 4.8888 14.3483 5.42147 14.5179L8.36315 15.4547C8.92458 15.6335 9.53253 15.541 10.0228 15.2023L16.655 10.6203C16.855 10.4821 17.073 10.7665 16.9021 10.9426L12.1281 15.8646C11.665 16.3421 11.7569 17.1512 12.314 17.5005L17.659 20.8523C18.2585 21.2282 19.0297 20.8506 19.1418 20.1261L20.9866 8.20879Z'
                        fill='#F5F7FA'
                      />
                    </svg>
                    <Popover content={<Links />}>
                      <span className='flex items-center justify-center w-7 h-7 rounded-full bg-grey-300 text-xs font-semibold text-grey-700 text-center cursor-pointer'>
                        +3
                      </span>
                    </Popover>
                  </div>
                </div> */}

                <Links links={newData?.links}></Links>
                <Backers backers={newData?.backers} />
                {/* <div>
                  <p className='text-grey-500 text-sm'>Backers</p>
                  <div className='flex gap-4 xl:gap-5 py-[6px]'>
                    <Image
                      src='/coin-info/backers-1.png'
                      width={28}
                      height={28}
                      alt='backers-1'
                    />
                    <Image
                      src='/coin-info/backers-2.png'
                      width={28}
                      height={28}
                      alt='backers-1'
                    />
                    <Image
                      src='/coin-info/backers-3.png'
                      width={28}
                      height={28}
                      alt='backers-1'
                    />
                    <Popover content={<Backers />}>
                      <span className='flex items-center justify-center w-7 h-7 rounded-full bg-grey-300 text-xs font-semibold text-grey-700 text-center cursor-pointer'>
                        +3
                      </span>
                    </Popover>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className='col-span-6 md:col-span-3 xl:col-span-4 2xl:col-span-2'>
            {<InformationUnlock data={newData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Contracts(props: any) {
  const tokens = props.tokens || [];
  if (tokens.length <= 0) return;
  return (
    <div className='flex items-center gap-4 px-3 py-2 bg-grey-200 rounded'>
      <IconETH />
      <span className='text-sm'>{tokens[0]?.platformName}</span>
      <Popover content={<WalletAddress tokens={props.tokens} />}>
        <div>
          <IconCaretDown />
        </div>
      </Popover>
      <span className='text-primary-500 max-w-[62px] lg:max-w-[124px] truncate'>
        {tokens[0]?.address}
      </span>
      <Popover
        content={<span className='text-grey-700 text-xs'>Copy address</span>}
      >
        <IconCopy />
      </Popover>
      <Popover
        content={<span className='text-grey-700 text-xs'>Add to Metamask</span>}
      >
        <Image src='/coin-info/fox.png' width={24} height={24} alt='fox' />
      </Popover>
      <Popover content={<WalletBrand />}>
        <IconCaretDown />
      </Popover>
    </div>
  );
}
// export default CoinInformation;
