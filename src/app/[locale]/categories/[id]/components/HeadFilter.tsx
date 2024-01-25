'use client';
import { Button } from 'antd';
import { useState } from 'react';

import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import { CategoryCoinsFilterType } from '../types';
import SearchSelect from './search-select';

export default function HeadFilter({
  onFilter,
}: {
  onFilter: (filter: CategoryCoinsFilterType) => void;
}) {
  const [keys, setSearchKeys] = useState<string[]>([]);

  return (
    <div className='filter flex justify-between mb-4'>
      <div className='flex'>
        <SearchSelect
          onFilterChange={(keys) => {
            if (keys.length) {
              setSearchKeys(keys);
            } else {
              onFilter({});
            }
          }}
        />
        <div className='hidden xl:block md:block'>
          <Button
            disabled={keys.length === 0}
            className='ml-1 !h-full hover:!border-primary-500 hover:!text-primary-500 !font-jm'
            onClick={() => onFilter({ search_key: keys })}
          >
            <div className='flex'>
              <IconFilterCoinTab />
              <span className='ml-1'>Filters</span>
            </div>
          </Button>
        </div>
      </div>
      <div className='hidden xl:block md:block'>
        <Button
          disabled
          className='ml-1 !h-full hover:!border-primary-500 hover:!text-primary-500 !font-jm'
        >
          <div className='flex'>
            <IconFilterCoinTab />
            <span className='ml-1'>Customize</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
