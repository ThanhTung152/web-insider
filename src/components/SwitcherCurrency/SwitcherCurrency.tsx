'use client';

import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { IconCaretDown } from '@/assets/icons';

const SwitcherCurrency = () => {
  // const currency = localStorage.getItem('currency')
  const [cur] = useState('usd');

  const items: MenuProps['items'] = [
    {
      key: 'usd',
      label: 'USD',
    },
    {
      key: 'vnd',
      label: 'VND',
    },
  ];

  // const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  //   localStorage.setItem('currency', key)
  // };

  return (
    <Dropdown menu={{ items }} placement='bottomLeft' arrow>
      <div
        className='flex gap-1 items-center cursor-pointer'
        onClick={(e) => e.preventDefault()}
      >
        {cur.toUpperCase()} <IconCaretDown />
      </div>
    </Dropdown>
  );
};

export default SwitcherCurrency;
