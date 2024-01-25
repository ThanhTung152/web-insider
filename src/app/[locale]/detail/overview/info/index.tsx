'use client';

import React, { useEffect, useState } from 'react';
import './index.scss';
import dynamic from 'next/dynamic';
import { currencyFormat, nFormatter, percentFormat } from '@/helpers';
import moment from 'moment';
// import { FetchHeaderBar } from '@/usecases/common';
const AdvancedRealTimeChart = dynamic(
  () =>
    import('react-ts-tradingview-widgets').then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  }
);

export default async function InfoCharts(props: any) {
  const [data, setData] = useState(props.data)
  const launchDate = new Date(data?.listingDate);

  useEffect(() => {
    setData(props?.data)
  }, [props])
  

  return (
    <div className='info-charts'>
      <div className='info-charts__wrapper grid grid-cols-1 xl:grid-cols-3 gap-4'>
        <div className='chart xl:col-span-2'>
          {data?.symbol ? (
            <AdvancedRealTimeChart
              symbol={data?.symbol + 'USD'}
              interval={'60'}
              autosize
            ></AdvancedRealTimeChart>
          ) : (
            ''
          )}
        </div>
        <div className='info p-6'>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              Max Supply
            </div>
            <div className='value font-medium text-base font-jm'>
              <span className='price font-semibold mr-1'>
                {nFormatter(data?.totalSupply, 3, '$')}
              </span>
              <span className='tag'>{data?.symbol}</span>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <span className='mr-2'>Price Change</span>
              <span className='time-tag text-xs'>24h</span>
            </div>
            <div className='value font-medium text-base font-jm'>
              <div className='price font-semibold'>
                {currencyFormat(
                  data?.price?.USD * (1-data?.price_change_in_24h),
                  '$'
                )}
              </div>
              <div className='percent-increment text-sm text-right'>
                {percentFormat(props?.data?.price_change_in_24h * 100)}
              </div>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <div>All Time High</div>
              <div className='time text-xs'>{data?.athPrice?.date}</div>
            </div>
            <div className='value font-medium text-base font-jm'>
              <div className='price font-semibold'>
                {currencyFormat(data?.athPrice?.USD, '$')}
              </div>
              <div className='percent-increment text-sm text-right'>
                {percentFormat(
                  ((data?.price.USD - data?.athPrice?.USD) * 100) /
                    data?.athPrice?.USD
                )}
              </div>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <div>All Time Low</div>
              <div className='time text-xs'>{data?.atlPrice?.dateUSD}</div>
            </div>
            <div className='value font-medium text-base font-jm'>
              <div className='price font-semibold'>
                {currencyFormat(data?.atlPrice?.USD, '$')}
              </div>
              <div className='percent-increment text-sm text-right'>
                {percentFormat(
                  (data?.price?.USD - data?.atlPrice?.USD) / data?.atlPrice?.USD
                )}
              </div>
            </div>
          </div>
          <div className='info__item pb-5 mb-5 flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              Market Dominance
            </div>
            <div className='value font-medium text-base font-jm'>
              {currencyFormat(
                (data?.marketCap * 100) / props?.data?.header.totalMarketCap,
                ''
              )}
              %
            </div>
          </div>
          <div className='info__item flex item-center justify-between'>
            <div className='label font-medium text-base font-jm'>
              <div>Trade Launch Date</div>
            </div>
            <div className='value font-medium text-base font-jm'>
              <div className='price font-semibold'>
                {moment(launchDate).format('DD/MM/YYYY')}
              </div>
              <div className='time text-xs'>
                {moment(launchDate)?.fromNow()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
