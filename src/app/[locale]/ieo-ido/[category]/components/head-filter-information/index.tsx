'use client';
import { Button, Flex, Segmented } from 'antd';
import clsx from 'clsx';
import './styles.scss';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { IeoIdoCategory, getCategoryTags } from '../../config';
import { IIeoIdoFilterType } from '../../types';
import SelectProject from '../select-project';

type PropsType = {
  onFilter: (filter: IIeoIdoFilterType) => void;
};

export default function HeadFilterInformation(props: PropsType) {
  const pathname = usePathname();

  const { category: _category = IeoIdoCategory.upcoming, slug } = useParams<{
    category: string;
    locale: string;
    slug: string[];
  }>();

  const category = slug ? slug[1] || IeoIdoCategory.ended : _category;

  const router = useRouter();

  const tags = getCategoryTags({ isDetail: true });

  return (
    <Flex vertical gap={16} className='header-filter'>
      <Flex wrap='wrap' gap={16} className='header-filter__options'>
        {tags.map((tag) => (
          <Button
            disabled={tag.disabled}
            key={tag.value}
            className={clsx(category === tag.value && 'active')}
            onClick={() => {
              const _target = `/${tag.value}`;

              router.push(
                slug && slug[1]
                  ? pathname.replace(/\/([^/]+)$/, _target)
                  : `${pathname}${_target}`,
                {
                  scroll: false,
                }
              );
            }}
          >
            {tag.label}
          </Button>
        ))}
      </Flex>

      <Flex gap={8} wrap='wrap' align='center' className='relative'>
        <SelectProject
          category={category}
          onFilterChange={(values) => props.onFilter({ search_key: values })}
        />

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
