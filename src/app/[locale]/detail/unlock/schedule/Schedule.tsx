'use client';

import { Segmented } from 'antd';
import { useState } from 'react';
import TokenAllocation from '../../tokenomics/token';
import Rounds from './Rounds/Rounds';
import Upcomming from './Upcomming/Upcomming';
import Chart from './Chart/index';

const Schedule = ({data, tokenInfo}: any) => {
  const [unlock, setUnlock] = useState('Rounds');

  const handler = (e: any) => {
    setUnlock(e);
  };

  const renderUnlock = () => {
    switch (unlock) {
      case 'Rounds':
        return <Rounds data={data} tokenInfo={tokenInfo} />;
      case 'Upcomming':
      case 'Past':
        return <Upcomming tokenInfo={tokenInfo} />;
      case 'Chart':
        return <Chart data={data} />;
      default:
        break;
    }
  };

  return (
    <div className='box-shadow-common p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-xl text-grey-700 font-bold font-jb'>
          Unlock Schedule
        </div>
        <div>
          <Segmented
            options={['Rounds', 'Upcomming', 'Past', 'Chart']}
            value={unlock}
            onChange={(e) => handler(e)}
          />
        </div>
      </div>
      <div className='mb-6'>{renderUnlock()}</div>
    </div>
  );
};

export default Schedule;
