'use client';

import React from 'react';
import './index.scss';
import { useParams, useRouter } from 'next/navigation';
import Spot from '../table';
import { Flex, Button } from 'antd';
import clsx from 'clsx';

const ExchangeTabs = () => {
  const router = useRouter();
  const params = useParams<{ locale: string; category: string }>();
  const tags = [
    {
      value: 'spot',
      disabled: false,
      label: 'Spot',
      component: <Spot />,
    },
    {
      value: '2',
      disabled: true,
      label: 'Derivatives',
      component: '',
    },
    {
      value: '3',
      disabled: true,
      label: 'Dex',
      component: '',
    },
    {
      value: '4',
      disabled: true,
      label: 'Lending',
      component: '',
    },
    {
      value: '5',
      disabled: true,
      label: 'CEX Transparency',
      component: '',
    },
  ];

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
    </Flex>
  );
};

export default ExchangeTabs;
