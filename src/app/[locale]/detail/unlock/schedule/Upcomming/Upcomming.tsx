import { IconArrowDown } from '@/assets/icons/IconArrowDown';
import IconCheckedCompleted from '@/assets/icons/IconCheckedCompleted';
import IconCircle from '@/assets/icons/IconCircle';
import Calendar from '@/components/Calendar/Calendar';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import { nFormatter } from '@/helpers';
import { FetchUnlockToken } from '@/usecases/coin-info';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';


const Upcomming = async({tokenInfo}:any) => {
const columns: ColumnsType<IUpcomming> = [
  {
    key: 'date',
    title: 'Date',
    align: 'left',
    width: 270,
    render: (_, value) => {
      return (
        <div className='flex items-center gap-4'>
          <Calendar date={value.remainingTime} />
          <IconCircle color='#F89152' />
          <span className='text-orange-400 text-sm font-medium font-jm'>
            {moment(
              new Date(value.unlockDate || Date.now()).toISOString()
            ).fromNow()}
          </span>
        </div>
      );
    },
  },
  {
    key: 'token',
    title: 'Tokens',
    width: 400,
    align: 'center',
    render: (_, value) => {
      return (
        <div className='text-center'>
          <div className='text-grey-700 text-sm mb-2 font-bold font-jb'>
            {nFormatter(value.token, 2, tokenInfo.symbol)}
          </div>
          <div className='text-xs font-medium text-grey-500'>
            {nFormatter(value.tokensPercent, 2, '%', true)}
          </div>
        </div>
      );
    },
  },
  {
    key: 'value',
    title: 'Value',
    width: 300,
    align: 'center',
    render: (_, value) => {
      return (
        <div className='text-center'>
          <div className='text-grey-700 text-sm mb-2 font-bold font-jb'>
            {nFormatter(value.value, 2, '$')}
          </div>
          <div className='text-xs font-medium text-grey-500'>
            {nFormatter(value.percentOfMarketCap, 2, '%', true)} of M. Cap
          </div>
        </div>
      );
    },
  },
  {
    key: 'rounds',
    title: 'Rounds',
    align: 'center',
    render: (_, value) => {
      return (
        <div className='flex items-center gap-10'>
          <div className={false ? 'max-h-[40px] overflow-hidden' : ''}>
            <RoundInfo item={value} symbol={tokenInfo.symbol} />
            {...Array.from(Array(value.numberOfRounds-1).keys()).map((item) => {
              return <RoundInfo item={value} symbol={tokenInfo.symbol} />;
            })}

           
          </div>
          <div className='flex gap-2'>
            {value.numberOfRounds} Rounds
            <IconArrowDown />
          </div>
        </div>
      );
    },
  },
];
  
  function RoundInfo({ item , symbol}: any) {
    return (
      <div className='flex gap-2 items-center text-grey-500 text-xs font-medium font-jm mb-2'>
        <span>{item?.roundName}</span>
        <span className='text-grey-500'>{nFormatter(item?.allocation,2,symbol)}</span>
      </div>
    );
  }


  async function fetchUpcoming() {
    const res = await FetchUnlockToken({
      coin_key: 'avalanche',
      status: 'upcoming',
    });
    return res
  }
  const data: any = await fetchUpcoming();
  console.log('====================================');
  console.log("upcoming", data);
  console.log('====================================');
  // const data = [
  //   {
  //     date: 1,
  //     tokens: 1,
  //     value: 1,
  //     rounds: 1,
  //   },
  //   {
  //     date: 1,
  //     tokens: 1,
  //     value: 1,
  //     rounds: 1,
  //   },
  // ];
  return (
    <div>
      <div className='overflow-x-auto hide-scroll'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'] }}
        />
      </div>
    </div>
  );
};

export default Upcomming;
