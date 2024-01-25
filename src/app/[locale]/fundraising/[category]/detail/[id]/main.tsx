'use client'

import { useEffect, useState } from 'react'
import { IBankerData } from '../../types';
import { FetchDetailBanker } from '@/usecases/fundraising';
import dynamic from 'next/dynamic';

const FundraisingDetailOverview = dynamic(() => import('./components/fundraising-detail-overview'), { ssr: false })
const FundraisingDetailTable = dynamic(() => import('./components/fundraising-detail-table'), { ssr: false })

const Main = ({ params } : any) => {
  const [data, setData] = useState<IBankerData | any>(null)
  const fetchDetail = async () => {
    try {
      const res: any = await FetchDetailBanker({
        backer_id: params.id,
      });
      setData(res);
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    fetchDetail()
  }, [params.id])
  

  const _renderInfo = () => {
    if (!data) return null;
    return <FundraisingDetailOverview data={data} />;
  };

  return (
    <div>
      {
        data ? (
        <><div className='bg-white-imp container-shadow '>{_renderInfo()}</div><div className='bg-white-imp container-shadow '>
            <FundraisingDetailTable slug={data?.slug || ''} />
          </div></>
        ) : ''
      }
    </div>
  )
}

export default Main