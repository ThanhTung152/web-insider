'use client';
import { FetchUnlockToken } from '@/usecases/coin-info';
import Progress from './progress/Progress';
import Schedule from './schedule/Schedule';
import { useState, useEffect } from 'react';

const Unlock = ({tokenInfo}:any) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchUnlock();
  }, []);

  async function fetchUnlock() {
    let data = await FetchUnlockToken({
      coin_key: 'avalanche',
      status: 'round',
    });
    //status: ended, upcoming, round
    setData(data);
  }

  return (
    <div>
      <Progress data={data} tokenInfo={tokenInfo} />
      <Schedule data={data} tokenInfo={tokenInfo} />
    </div>
  );
};

export default Unlock;
