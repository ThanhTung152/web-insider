import { ColumnsType } from 'antd/es/table';
import { FundraisingCategory } from '../../config';
import { Flex } from 'antd';
import Image from 'next/image';
import { formatDate } from '@/helpers/datetime';
import { nFormatter } from '@/helpers';
import BackersModal from '../../components/backers-modal';
import DataGroup from '@/components/DataGroup';

export const roundsColumns: ColumnsType<any> = [
  {
    title: 'Project',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    render: (_, { name, icon }) => (
      <Flex align={'center'} gap={8}>
        <Image src={icon} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
      </Flex>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => formatDate(value),
  },
  {
    title: 'Amount Raised',
    dataIndex: 'raise',
    key: 'raise',
    align: 'right',
    render: (raise) => nFormatter(raise, 2, '$'),
  },
  {
    title: 'Round',
    dataIndex: 'stage',
    key: 'stage',
  },
  {
    title: 'Valuation',
    dataIndex: 'raise',
    key: 'raise',
    render: (_, { raise }) => nFormatter(raise, 2, '$'),
  },
  {
    title: 'Backers',
    dataIndex: 'funds',
    key: 'funds',
    render: (_, { funds }) => (
      <BackersModal data={funds}>
        {({ onOpen }) => <DataGroup data={funds} onClick={onOpen} />}
      </BackersModal>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (_, { category }) => category?.name,
  },
];

const topBackersColumns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    render: (_, { name, logo }) => (
      <Flex align={'center'} gap={8}>
        <Image src={logo} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
      </Flex>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    render: (_, { location }) => <>{location}</>,
  },
  {
    title: 'Investments',
    dataIndex: 'investments',
    key: 'investments',
    render: (_, { totalInvestments }) => <>{totalInvestments}</>,
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (_, { market_cap }) => (
      <Flex vertical className='font-bold'>
        <span>${market_cap}M</span>
        <span className={'text-[#1AB369]'}>{market_cap}%</span>
      </Flex>
    ),
  },
];

export const getColumnsFundraising = (category: string) => {
  switch (category) {
    case FundraisingCategory.FundingRounds:
      return roundsColumns;
    case FundraisingCategory.TopBackers:
      return topBackersColumns;
    default:
      return [];
  }
};
