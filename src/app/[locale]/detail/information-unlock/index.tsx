'use client';

import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import './style.scss';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import { IconUnLock } from '@/assets/icons';
import { FetchUnlockToken } from '@/usecases/coin-info';
import { useEffect, useState } from 'react';
import { currencyFormat } from '@/helpers';
import { IUnlock } from '../../unlock-schedule/types';
import IconCheckedCompleted from '@/assets/icons/IconCheckedCompleted';

// export interface IUnlock {
//   date: Date;
//   lockedTokensPercent: number;
//   unlockedTokensPercent: number;
//   lockedTokens: number;
//   unlockedTokens: number;
//   nextUnlockPercent: number;
// }

export default function InformationUnlock({data} : any) {
  // const [data, setData] = useState<ITotalUnlockProgress>({
  //   totalRemainingTime: new Date(),
  //   totalUnlockedPercent: 0,
  //   totalUnlockedToken: 0,
  //   totalUnlockedValue: 0,
  //   totalLockedPercent: 0,
  //   totalLockedToken: 0,
  //   totalLockedValue: 0,
  //   totalNextUnlockPercent: 0,
  //   totalNextUnlockToken: 0,
  //   totalNextUnlockValue: 0,
  //   remainingTime: new Date(),
  //   percentOfMarketCap: 0,
  // });

  async function fetchUnlock() {
    // let data: any = await FetchUnlockToken({ coin_key: 'avalanche' });
    //   const tokenUnlock: any = fetchUnlock() || {};
    //   const lockedTokens = tokenUnlock.lockedTokens;
    //   const lockedTokensPercent = tokenUnlock.lockedTokensPercent;
    //   const unlockedTokens = tokenUnlock.unlockedTokens;
    //   const nextUnlockPercent = tokenUnlock.nextUnlockPercent;
    //   const dateNextUnlock = tokenUnlock.date;
    //  const totalToken = (lockedTokens * 100) / lockedTokensPercent;
    // setData(data);
  }

  // useEffect(() => {
  //   fetchUnlock();
  // }, []);

  const countDownTime = data?.nextUnlock ? new Date(data?.nextUnlock[data?.nextUnlock?.length -1]?.date) : new Date();

  const option = {
    color: [
      new graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0.5,
          color: 'rgb(84, 122, 255)',
        },
        {
          offset: 1,
          color: 'rgb(69, 81, 222)',
        },
      ]),
      'rgb(247, 147, 26)',
      '#ECEEFE',
    ],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 3,
          margin: 10,
        },
        silent: true,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          focus: false,
          scale: false,
        },
        data: data?.chart ? [
          { value: data?.chart?.unlockedTokensPercent, name: 'Unlock' },
          { value: data?.chart?.nextUnlockPercent, name: 'Next unlock' },
          { value:data?.chart?.lockedTokensPercent, name: 'Block' },
        ] : [{ value: 100, name: 'Unlock'}],
      },
    ],
  };

  return (
    <div className='chart'>
      <div className='relative'>
        <div className='chart__unlock'>
          <IconUnLock />
          <div className='percent'>
            {data?.chart ? currencyFormat(data?.chart?.unlockedTokensPercent, '') : 100}%
          </div>
        </div>
        <ReactECharts option={option} />
      </div>

      {
        data?.chart ? (
          <CountdownTimer
            countDownName={'Next Unlock'}
            targetDate={countDownTime}
          />
        ) : (
          <div className='flex items-center justify-center gap-2'>
            Fully Vested <IconCheckedCompleted />
          </div>
        )
      }
      
    </div>
  );
}
