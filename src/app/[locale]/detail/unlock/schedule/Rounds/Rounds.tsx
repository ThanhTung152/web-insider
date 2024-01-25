import IconCheckedCompleted from '@/assets/icons/IconCheckedCompleted';
import IconCircle from '@/assets/icons/IconCircle';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import { currencyFormat, nFormatter } from '@/helpers';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const Rounds = ({ data, tokenInfo }: any) => {
  // const dataProps = props.data;
  // console.log('====================================');
  // console.log('dataProps', dataProps);
  // console.log('====================================');
  if (!data) return;
  const unlocksData = data.unlocks || [];

  // const totalTokens: number =
  //   (dataProps.unlockedTokens * 100) / dataProps.unlockedTokensPercent;

  const columns: ColumnsType<IUnlock> = [
    {
      key: 'rounds',
      title: 'Rounds',
      align: 'left',
      width: 250,
      render: (_, value) => {
        console.log(value);

        return (
          <div>
            <div className='text-grey-700 text-sm mb-2 font-bold font-jb flex gap-2'>
              {value.name} <IconCheckedCompleted />
            </div>
            <div className='flex gap-2 items-center text-xs font-medium'>
              <span className='text-grey-700'>
                {nFormatter(value.allocation, 2, '')}
              </span>
              <span className='text-grey-500'>
                {nFormatter(value.allocationPercent, 2, '')}%
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'unlock',
      title: () => {
        return (
          <div className='flex items-center justify-between'>
            <div className='text-sm text-grey-700 font-bold font-jb'>
              Unlocked
            </div>
          </div>
        );
      },
      width: 400,
      align: 'center',
      render: (_, value) => {
        // const unlock = value.nextUnlockToken/ value.nextUnlockPercent;
        // const nextlock = 1 - unlock;
        const countDownTime = new Date(value.startDate);
        const startDate = new Date(value.startDate || Date.now());
        const endDate = new Date(value.endDate || Date.now());

        return (
          <div className='w-full max-w-[380px]'>
            <div className='flex items-center justify-between'>
              <span className='text-grey-700 text-xs md:text-sm font-semibold font-jsb'>
                {nFormatter(value.unlockedPercent, 2, '%', true)}
              </span>
              <span className='text-grey-700 text-xs md:text-sm font-semibold font-jsb'>
                {nFormatter(value.lockedPercent, 2, '%', true)}
              </span>
            </div>
            <div className='py-2 relative'>
              <div
                className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-20'
                style={{ width: value.unlockedPercent + '%' }}
              ></div>
              <div
                className='next-lock absolute top-1/2 left-0 -translate-y-1/2 bg-orange-500 h-1.5 rounded-xl z-10'
                style={{ width: value.lockedPercent + '%' }}
              ></div>
              <div className='locked bg-grey-300 w-full h-1.5 rounded-xl'></div>
            </div>
            <div className='flex items-center justify-between flex-wrap'>
              <span className='text-grey-500 text-xs font-medium font-jm'>
                Start: {startDate.toDateString()}
              </span>
              <span className='text-grey-500 text-xs font-medium font-jm'>
                End: {endDate.toDateString()}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'tgeUnlock',
      title: 'TGE Unlock',
      width: 300,
      align: 'center',
      render: (_, value) => {
        return (
          <div className='text-center'>
            <div className='text-grey-700 text-sm mb-2 font-bold font-jb'>
              {nFormatter(value.tgeUnlockToken, 2, '')}
            </div>
            <div className='text-xs font-medium text-grey-500'>
              {value.tgeUnlockPercent}%
            </div>
          </div>
        );
      },
    },
    {
      key: 'nextUnlock',
      title: 'Next Unlock',
      width: 500,
      align: 'center',
      render: (_, value) => {
        const countDownTime = new Date(value.timer);
        const isUnlock = true;
        return (
          <div>
            {isUnlock ? (
              <div className='md:flex items-center justify-between gap-9'>
                <div className='w-full mb-4'>
                  <div className='flex items-center justify-center gap-3'>
                    <span className='text-grey-700 text-xs md:text-base font-bold font-jb'>
                      {currencyFormat(value.nextUnlockPercent, '')}%
                    </span>
                  </div>
                  <div className='text-grey-500 text-sm'>
                    {nFormatter(value?.nextUnlockToken, 2, '')}~
                    {nFormatter(value?.nextUnlockValue, 2, '$')} (
                    {nFormatter(
                      (value?.nextUnlockValue * 100) / tokenInfo.marketCap,
                      2,
                      ''
                    )}
                    % of M.Cap)
                  </div>
                  <CountdownTimer targetDate={countDownTime} />
                </div>
              </div>
            ) : (
              <div className='flex items-center justify-center w-full gap-2'>
                <IconCheckedCompleted />
                <span className='font-bold font-jb text-sm text-sp-green-500'>
                  Fully Unlocked
                </span>
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className='overflow-x-auto hide-scroll'>
        <Table
          columns={columns}
          dataSource={unlocksData}
          pagination={{ position: ['none'] }}
        />
      </div>
    </div>
  );
};

export default Rounds;
