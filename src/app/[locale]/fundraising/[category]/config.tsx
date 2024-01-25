import { ColumnsType } from 'antd/es/table';
import { Flex } from 'antd';
import Image from 'next/image';
import BackersModal from './components/backers-modal';
import DataGroup from '@/components/DataGroup';
import { formatDate } from '@/helpers/datetime';
import { nFormatter, percentFormat, renderSortIcon } from '@/helpers';

export const FundraisingCategory = {
  FundingRounds: 'funding-rounds',
  TopBackers: 'top-backers',
  Overview: 'overview',
};

const TEMP_DISABLED_TAGS = [FundraisingCategory.Overview];

export const FundraisingCategoryLabel = {
  [FundraisingCategory.FundingRounds]: 'Funding Rounds',
  [FundraisingCategory.TopBackers]: 'Top Backers',
  [FundraisingCategory.Overview]: 'Overview',
};

export const FundraisingPathApi = {
  [FundraisingCategory.FundingRounds]: 'funding-rounds',
  [FundraisingCategory.TopBackers]: 'top-backers',
  [FundraisingCategory.Overview]: 'overview',
};

export type FundraisingType = keyof typeof FundraisingCategory;

export const validFundraisingType = (type: string): type is FundraisingType => {
  return Object.keys(FundraisingCategory).includes(type);
};

export const getBreadcrumbConfig = (category?: FundraisingType) => {
  return [
    {
      title: 'Fundraising',
    },
    {
      title: (
        <a href='#'>
          {
            FundraisingCategoryLabel[
              category ?? FundraisingCategory.FundingRounds
            ]
          }
        </a>
      ),
    },
  ];
};

const roundsColumns: ColumnsType<any> = [
  {
    title: 'Project',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    render: (_, { name, icon, _id }) => (
      <Flex align={'center'} gap={8}>
        <img src={icon} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
      </Flex>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => formatDate(value),
  },
  {
    title: 'Amount Raised',
    dataIndex: 'raise',
    key: 'raise',
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (raise) => nFormatter(raise, 2, '$'),
  },
  {
    title: 'Round',
    dataIndex: 'stage',
    key: 'stage',
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    title: 'Valuation',
    dataIndex: 'raise',
    key: 'raise',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { raise }) => nFormatter(raise, 2, '$'),
  },
  {
    title: 'Backers',
    dataIndex: 'funds',
    key: 'funds',
    sortIcon: renderSortIcon,
    sorter: true,
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
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { category }) => category?.name,
  },
];

const topBackersColumns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { name, logo, id }) => (
      <a href={`funding-rounds/detail/${id}?name=${name}`}>
        <Flex align={'center'} gap={8}>
          <Image src={logo} alt={'icon'} width={24} height={24} />
          <span>{name}</span>
        </Flex>
      </a>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    title: 'Country',
    dataIndex: 'location',
    key: 'location',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { country }) => <>{country}</>,
  },
  {
    title: 'Investments',
    dataIndex: 'investments',
    key: 'investments',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { investments }) => <>{investments}</>,
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { marketCap, mCapChangeIn24h }) => (
      <Flex vertical>
        <span>{nFormatter(marketCap, 2, '$')}</span>
        {percentFormat(mCapChangeIn24h)}
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

export const getFundraisingTags = () => {
  return Object.values(FundraisingCategory).map((key) => ({
    label: FundraisingCategoryLabel[key],
    value: key,
    disabled: TEMP_DISABLED_TAGS.includes(key),
  }));
};

export const getFundraisingPathApi = (category: string) => {
  switch (category) {
    case FundraisingCategory.FundingRounds:
      return FundraisingPathApi[FundraisingCategory.FundingRounds];
    case FundraisingCategory.TopBackers:
      return FundraisingPathApi[FundraisingCategory.TopBackers];
    default:
      return FundraisingPathApi[FundraisingCategory.Overview];
  }
};
