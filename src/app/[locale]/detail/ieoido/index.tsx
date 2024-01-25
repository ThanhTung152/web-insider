import React from 'react';
import Overview from './overview/Overview';
import Detail from './detail/Detail';
import { FetchCoinIDOIEO } from '@/usecases/coin-info';

const IEOIDODetail = async (props:any) => {
  const data: any = await FetchCoinIDOIEO({ coin_key: 'avalanche', limit: 10 });
  return (
    <div className='fade-top py-3'>
      <Overview tokenInfo={props.data} overView={data?.overview} />
      <Detail tokenInfo={props.data} ieoidos={data?.ieoidos}/>
    </div>
  );
};

export default IEOIDODetail;
