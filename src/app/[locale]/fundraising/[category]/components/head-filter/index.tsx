'use client';
import { Button, Flex } from 'antd';
import React from 'react';
import './styles.scss';
import clsx from 'clsx';

import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import SearchSelect from '../search-select';
import { getFundraisingTags } from '../../config';
import { useParams, useRouter } from 'next/navigation';
import { IHeaderFilter } from '../../types';

export default function HeadFilter({ onChange, layout }: IHeaderFilter) {
  const router = useRouter();
  const params = useParams<{ locale: string; category: string }>();
  const tags = getFundraisingTags();
  return (
    <Flex vertical gap={16} className='header-filter'>
      <Flex wrap='wrap' gap={16} className='header-filter__options'>
        {tags.map((tag) => (
          <Button
            key={tag.value}
            disabled={tag.disabled}
            className={clsx(params.category === tag.value && 'active')}
            onClick={() =>
              router.push(`/${params.locale}/fundraising/${tag.value}`)
            }
          >
            {tag.label}
          </Button>
        ))}
      </Flex>

      <Flex gap={8} wrap='wrap'>
        <SearchSelect layout={layout} onChange={onChange} />
        <Button className='ml-1' size='large'>
          <Flex className='text-[#333747]'>
            <IconFilterCoinTab />
            <span className='ml-1'>Filters</span>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}
