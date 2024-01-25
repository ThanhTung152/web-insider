import { ColumnsType } from 'antd/es/table';
import { Flex, Tag } from 'antd';
import Image from 'next/image';
import { nFormatter, percentFormat } from '@/helpers';
import { StarIcon } from '@heroicons/react/24/outline';
import GraphLine from '../graph-line';
import { CategoryCoinsType } from '../../types';
import { IconStar } from '@/assets/icons';

export const FundraisingCategory = {
  FundingRounds: 'funding-rounds',
  TopBackers: 'top-backers',
  Overview: 'overview',
};

export const getBreadcrumbConfig = () => {
  return [
    {
      title: 'BlockUltra',
    },
    {
      title: 'Categories',
    },
    {
      title: 'Currency',
    },
  ];
};

export const categoryColumns: ColumnsType<CategoryCoinsType> = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    render: (_, { name, image, symbol }) => (
      <Flex align={'center'} gap={8}>
        <Image src={image.icon} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
        <Tag>{symbol}</Tag>
      </Flex>
    ),
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
    render: (value) =>
      value ? (
        <div className='flex items-center gap-1'>
          <span>{value}</span>
          <IconStar />
        </div>
      ) : (
        <>-</>
      ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price) => nFormatter(price.USD, 2, '$'),
  },
  {
    title: '24h %',
    dataIndex: 'priceChangeIn24h',
    key: 'priceChangeIn24h',
    render: (value) => <>{percentFormat(value)}</>,
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'volume24h',
    key: 'volume24h',
    render: (volume) => nFormatter(Number(volume), 2, '$'),
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (marketCap) => nFormatter(marketCap, 2, '$'),
  },
  {
    title: 'Price Graph (7d)',
    dataIndex: 'chart',
    key: 'chart',
    width: 261,
    align: 'right',
    render: (value) => {
      try {
        return (
          <div className='flex items-center justify-end'>
            <img
              alt='chart'
              width={200}
              height={52}
              src={`data:image/svg+xml;base64,${value}`}
            />
          </div>
        );
      } catch (error) {
        return null;
      }
    },
  },
];
