'use client';

import React, { useState, useEffect } from 'react';
import { ICountdownTimerProps, TimeLeft } from './CountDownTimer.type';
import TimeItem from './TimeItem/TimeItem';

const CountdownTimer: React.FC<ICountdownTimerProps> = ({
  targetDate,
  countDownName,
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();
    let timeLeft = {
      d: 0,
      h: 0,
      m: 0,
      s: 0,
    };

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [remainingTime, setRemainingTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemainingTime(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { d, h, m, s } = remainingTime;

  return (
    <div className='mx-auto max-w-[210px]'>
      {countDownName ? (
        <h4 className='font-jsb text-grey-700 text-center mb-1'>
          {countDownName}
        </h4>
      ) : (
        ''
      )}
      <div className='flex items-start justify-center gap-1'>
        {d && d > 0 ? (
          <>
            <TimeItem time={d} name={'D'} />
            <div className='flex justify-center items-center h-8'>:</div>
          </>
        ) : (
          ''
        )}
        <TimeItem time={h} name={'H'} />
        <div className='flex justify-center items-center h-8'>:</div>
        <TimeItem time={m} name={'M'} />
        {!(d && d > 0) ? (
          <>
            <div className='flex justify-center items-center h-8'>:</div>
            <TimeItem time={s} name={'S'} />
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
