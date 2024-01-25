import { currencyFormat, fancyTimeFormat, nFormatter } from '@/helpers';
import { INextUnlock } from '../../types';
import { memo, useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import moment from 'moment';

const PriceUnlock = memo((props: INextUnlock) => {
  const { nextTokenPrice, nextTokenPricePercent } = props;
  return (
    <div className='justify-center mr-11'>
      <p className='text-sm text-center'>
        {nFormatter(nextTokenPrice || 0, 2, '$')}
      </p>
      <p className='text-xs text-grey-400 text-center mt-1'>
        {currencyFormat(nextTokenPricePercent || 0, '', { isAutoZero: true })}%
        of M.Cap
      </p>
    </div>
  );
});

const NextTimeUnlock = (props: INextUnlock) => {
  const { nextUnlockDate } = props;
  const [date, setDate] = useState({
    hrs: 0,
    mins: 0,
    secs: 0,
  });

  const [checkClearInterval, setCheckClearInterval] = useState(false);
  const [intervalInfo, setIntervalInfo] = useState<any>();

  useEffect(() => {
    if (!nextUnlockDate) return;
    const interval = setInterval(() => {
      const diff = moment(nextUnlockDate).diff(moment(), 's');
      if (diff < 0) {
        setCheckClearInterval(true);
        return;
      }
      const { hrs, mins, secs } = fancyTimeFormat(diff);
      setDate({
        hrs,
        mins,
        secs,
      });
    }, 1000);

    setIntervalInfo(interval);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [props.nextUnlockDate]);

  useEffect(() => {
    if (intervalInfo) clearInterval(intervalInfo);
  }, [checkClearInterval]);

  const _renderNextUnlock = () => {
    return (
      <div className='w-40 flex justify-between'>
        <div className='w-11 justify-center'>
          <div className='w-11 h-8 rounded leading-8 bg-grey-200'>
            {date.hrs}
          </div>
          <div className='text-grey-500'>H</div>
        </div>
        <div className='w-11 justify-center'>
          <div className='w-11 h-8 rounded leading-8 bg-grey-200'>
            {date.mins}
          </div>
          <div className='text-grey-500'>M</div>
        </div>
        <div className='w-11 justify-center'>
          <div className='w-11 h-8 rounded leading-8 bg-grey-200'>
            {date.secs}
          </div>
          <div className='text-grey-500'>S</div>
        </div>
      </div>
    );
  };
  return _renderNextUnlock();
};

const NextUnlock = (props: INextUnlock) => {
  const { nextTokenPrice, nextTokenPricePercent, nextUnlockDate } = props;
  return (
    <div className='flex justify-between items-center'>
      <PriceUnlock
        nextTokenPrice={nextTokenPrice}
        nextTokenPricePercent={nextTokenPricePercent}
      />
      <NextTimeUnlock nextUnlockDate={nextUnlockDate} />
    </div>
  );
};
export default memo(NextUnlock);
