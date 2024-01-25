'use client';

import React, { use, useState } from 'react';
import CoinTableInfo from '..';
import { Flex, Button } from 'antd';
import './index.scss';
import clsx from 'clsx';

const DetailTabs = () => {
  const tags = [
    {
      value: 'spot',
      disabled: false,
      label: 'Spot',
      component: <CoinTableInfo />,
    },
    {
      value: 'future',
      disabled: true,
      label: 'Future',
      component: '',
    },
  ];

  const trans = {
      value: 'transparency',
      disabled: true,
      label: 'Transparency',
      component: '',
    };

  return (
    <Flex wrap='wrap' gap={16} className='header-filter__options'>
      {tags.map((tag) => (
        <Button
          key={tag.value}
          disabled={tag.disabled}
          className={clsx(/*params.category*/'spot' === tag.value && 'active')}
          // onClick={() =>
          //   router.push(`/${params.locale}/exchanges/`)
          // }
        >
          {tag.label}
        </Button>
      ))}
      <div className='flex items-center'>
        <div className='h-10 w-[0px] border border-gray-400'></div>
      </div>
      <Button
          key={trans.value}
          disabled={trans.disabled}
          className={clsx(/*params.category*/'spot' === trans.value && 'active')}
          // onClick={() =>
          //   router.push(`/${params.locale}/exchanges/`)
          // }
        >
          {trans.label}
        </Button>
    </Flex>
  );
};

export default DetailTabs;
