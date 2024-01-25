'use client'

import { IDetail } from '@/models/IDetail';
import { FetchCoinDetail } from '@/usecases/coin-info';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const CoinInformation = dynamic(() => import('../information'), { ssr: false })
const CoinTabInfo = dynamic(() => import('../coinTabInfo/Index'), { ssr: false })

const MainData = ({slug} : any) => {
  const [data, setData] = useState<IDetail | null>(null)
  const getData = async () => {
    try {
      const res: any = await FetchCoinDetail({
        coin_key: slug,
      });
      setData(res);
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <CoinInformation data={data} slug={slug} />
      <CoinTabInfo data={data} slug={slug} />
    </div>
  )
}

export default MainData