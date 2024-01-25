'use client';
import { Button, Flex, Segmented } from 'antd';
import React, { useState } from 'react';
import './styles.scss';
import clsx from 'clsx';

import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import SelectProject from '../select-project';
import { IeoIdoCategory, getCategoryTags } from '../../config';
import { useParams, useRouter } from 'next/navigation';
import { IIeoIdoFilterType } from '../../types';

type PropsType = {
  onFilter: (filter: IIeoIdoFilterType) => void;
};

export default function HeadFilter(props: PropsType) {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const { category = IeoIdoCategory.upcoming, locale } = useParams<{
    category: string;
    locale: string;
  }>();

  const router = useRouter();

  const tags = getCategoryTags();

  const handleFilter = () => {
    props.onFilter({ search_key: selectedProjects });
  };

  return (
    <Flex vertical gap={16} className='header-filter'>
      <Flex wrap='wrap' gap={16} className='header-filter__options'>
        {tags.map((tag) => (
          <Button
            disabled={tag.disabled}
            key={tag.value}
            className={clsx(category === tag.value && 'active')}
            onClick={() => router.push(`/${locale}/ieo-ido/${tag.value}`)}
          >
            {tag.label}
          </Button>
        ))}
      </Flex>

      <Flex gap={8} wrap='wrap' align='center' className='relative'>
        <SelectProject
          category={category}
          onFilterChange={(values) => setSelectedProjects(values)}
        />
        <Button
          disabled={selectedProjects.length === 0}
          size='large'
          onClick={handleFilter}
        >
          <Flex className='text-[#333747]'>
            <IconFilterCoinTab />
            <span className='ml-1'>Filters</span>
          </Flex>
        </Button>

        {category === IeoIdoCategory.upcoming && (
          <Segmented
            className='lg:absolute lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%]'
            size='large'
            options={['All', 'Hot']}
            onChange={(value) => {
              props.onFilter({ is_hot: value.toString().toLowerCase() });
            }}
          />
        )}
      </Flex>
    </Flex>
  );
}
