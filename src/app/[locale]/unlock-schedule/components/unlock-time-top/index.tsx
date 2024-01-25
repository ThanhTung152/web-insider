'use client';

import React, { useEffect, useState } from 'react';
import { UnlockTime } from '../unlock-time';
import { TUnlockTime } from '../../types';
import { FetchUnlockHeader } from '@/usecases/token-unlock';

export default function UnlockTimeTop() {
  const [data, setData] = useState<TUnlockTime[]>([]);

  const _getData = async () => {
    const response: any = await FetchUnlockHeader();
    if (!response) return;

    const {
      nextUnlockThisWeek,
      nextUnlockNextWeek,
      top4NextUnlockNextWeek,
      top4NextUnlockThisWeek,
    } = response;
    const thisWeek = {
      title: 'Unlocks This Week',
      money: nextUnlockThisWeek,
      coins: top4NextUnlockNextWeek,
    };

    const nextWeek = {
      title: 'Unlocks Next Week',
      money: nextUnlockNextWeek,
      coins: top4NextUnlockThisWeek,
    };

    setData([thisWeek, nextWeek]);
  };

  useEffect(() => {
    _getData();
  }, []);

  const _renderUnlockTime = () => {
    return data.map((item) => (
      <UnlockTime
        key={item.title}
        title={item.title}
        money={item.money}
        coins={item.coins}
      />
    ));
  };
  return <div className={'us-time py-3'}>{_renderUnlockTime()}</div>;
};
