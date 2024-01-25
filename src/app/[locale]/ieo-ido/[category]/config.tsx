import { Flex, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import BankersModal from './components/bankers-modal';
import DataGroup from '@/components/DataGroup';
import LaunchpadModal from './components/launchpad-modal';
import { nFormatter } from '@/helpers';
import { formatDate } from '@/helpers/datetime';
import Doughnut from '@/components/DoughnutChart';
import IconWeb from '@/assets/icons/IconWeb';
import {
  IconDiscord,
  IconFile,
  IconGithub,
  IconMedium,
  IconTelegram,
  IconTwitter,
} from '@/assets/icons';
import { IconFacebook } from '@/assets/icons/IconFacebook';
import { ReactNode } from 'react';
import { COLOR_CHART } from '@/helpers/constants';

export const IeoIdoCategory = {
  upcoming: 'upcoming',
  ongoing: 'ongoing',
  ended: 'ended',
  topIeoLaunchpads: 'top-ieo/launchpads',
  topIdoLaunchpads: 'top-ido-launchpads',
  overview: 'overview',
};

export const IeoIdoApiPath = {
  [IeoIdoCategory.upcoming]: 'ieo-ido',
  [IeoIdoCategory.ongoing]: 'ieo-ido',
  [IeoIdoCategory.ended]: 'ieo-ido',
  [IeoIdoCategory.topIeoLaunchpads]: 'ieo-ido',
  [IeoIdoCategory.topIdoLaunchpads]: 'ieo-ido/top-launch-pad',
  [IeoIdoCategory.overview]: 'ieo-ido',
};

export const IeoIdoStatus = {
  [IeoIdoCategory.upcoming]: 'upcoming',
  [IeoIdoCategory.ended]: 'past',
};

export const IeoIdoApiSearchPath = {
  [IeoIdoCategory.upcoming]: 'ieo-ido/upcoming/search',
  // [IeoIdoCategory.ongoing]: 'ieo-ido',
  [IeoIdoCategory.ended]: 'ieo-ido/ended/search',
  // [IeoIdoCategory.topIeoLaunchpads]: 'ieo-ido',
  [IeoIdoCategory.topIdoLaunchpads]: 'ieo-ido/top-ido-launch-pad/search',
  // [IeoIdoCategory.overview]: 'ieo-ido',
};

const TEMP_DISABLED_TAGS = [
  IeoIdoCategory.ongoing,
  IeoIdoCategory.topIeoLaunchpads,
  IeoIdoCategory.overview,
];

export const IeoIdoCategoryLabel = {
  [IeoIdoCategory.upcoming]: 'Upcoming',
  [IeoIdoCategory.ongoing]: 'Ongoing',
  [IeoIdoCategory.ended]: 'Ended',
  [IeoIdoCategory.topIeoLaunchpads]: 'Top IEO Launchpads',
  [IeoIdoCategory.topIdoLaunchpads]: 'Top IDO Launchpads',
  [IeoIdoCategory.overview]: 'Overview',
};

export const IeoIdoCategoryPath = {
  [IeoIdoCategory.upcoming]: 'upcoming',
  [IeoIdoCategory.ongoing]: 'ongoing',
  [IeoIdoCategory.ended]: 'ended',
  [IeoIdoCategory.topIeoLaunchpads]: 'top-ieo/launchpads',
  [IeoIdoCategory.topIdoLaunchpads]: 'top-ido/launchpads',
  [IeoIdoCategory.overview]: 'overview',
};

const columnsUpcoming: ColumnsType<any> = [
  {
    title: '#',
    render: (_text, _record, index) => `${index + 1}`,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    fixed: true,
    render: (project, { symbol, image, isHot }) => (
      <Flex wrap='wrap' gap={8}>
        <Image src={image} alt={'icon'} width={24} height={24} />
        <span>{project}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {symbol}
        </Tag>
        {isHot && <Image alt='hot' src={'/hot.svg'} width={12} height={12} />}
      </Flex>
    ),
  },
  {
    title: 'Initial Cap',
    dataIndex: 'initialCap',
    key: 'initialCap',
    render: (_, { initialCap }) => nFormatter(initialCap, 2, '$'),
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    render: (_, { totalRaise }) => nFormatter(totalRaise, 2, '$'),
  },
  {
    title: 'Backers',
    dataIndex: 'backers',
    key: 'backers',
    render: (backers, { ido_platform_id }) => (
      <BankersModal data={backers} platformId={ido_platform_id}>
        {({ onOpen }) => <DataGroup data={backers} onClick={onOpen} />}
      </BankersModal>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (category) => `${category}`,
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpads',
    key: 'launchpads',
    render: (_, { launchpads, ido_platform_id }) => (
      <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
        {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
      </LaunchpadModal>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startedDate',
    key: 'startedDate',
    render: (_, { start_date }) => formatDate(start_date),
  },
];

const columnsUpcomingDetail: ColumnsType<any> = [
  {
    title: '#',
    render: (_text, _record, index) => `${index + 1}`,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    fixed: true,
    render: (project, { symbol, image, isHot }) => (
      <Flex wrap='wrap' gap={8}>
        <Image src={image} alt={'icon'} width={24} height={24} />
        <span>{project}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {symbol}
        </Tag>
        {isHot && <Image alt='hot' src={'/hot.svg'} width={12} height={12} />}
      </Flex>
    ),
  },
  {
    title: 'Initial Cap',
    dataIndex: 'initialCap',
    key: 'initialCap',
    render: (_, { initialCap }) => nFormatter(initialCap, 2, '$'),
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    render: (_, { totalRaise }) => nFormatter(totalRaise, 2, '$'),
  },
  {
    title: 'Backers',
    dataIndex: 'backers',
    key: 'backers',
    render: (backers, { ido_platform_id }) => (
      <BankersModal data={backers} platformId={ido_platform_id}>
        {({ onOpen }) => <DataGroup data={backers} onClick={onOpen} />}
      </BankersModal>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (category) => `${category}`,
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpads',
    key: 'launchpads',
    render: (_, { launchpads, ido_platform_id }) => (
      <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
        {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
      </LaunchpadModal>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startedDate',
    key: 'startedDate',
    render: (_, { start_date }) => formatDate(start_date),
  },
];

const columnsEnded: ColumnsType<any> = [
  {
    title: '#',
    render: (_text, _record, index) => `${index + 1}`,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    render: (_, { project, image, tag }) => (
      <Flex align={'center'} gap={8}>
        <Image src={image} alt={'icon'} width={24} height={24} />
        <span>{project}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {tag}
        </Tag>
      </Flex>
    ),
  },
  {
    title: 'Current Price',
    dataIndex: 'price',
    key: 'price',
    render: (_, { price }) => nFormatter(price, 2, '$'),
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    render: (totalRaise) => nFormatter(totalRaise, 2, '$'),
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    key: 'roi',
    render: (_, { roi }) => nFormatter(roi, 2, '$'),
  },
  {
    title: 'ATH ROI',
    dataIndex: 'auth_roi',
    key: 'auth_roi',
    render: (_, { auth_roi }) => nFormatter(auth_roi, 2, '$'),
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpadList',
    key: 'launchpadList',
    render: (_, { launchpads, ido_platform_id }) => (
      <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
        {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
      </LaunchpadModal>
    ),
  },
  {
    title: 'End Date',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (_, { updated_at }) => formatDate(updated_at),
  },
];

const columnsEndedDetail: ColumnsType<any> = [
  {
    title: '#',
    render: (_text, _record, index) => `${index + 1}`,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    render: (_, { project, icon, symbol }) => (
      <Flex align={'center'} gap={8}>
        <Image src={icon} alt={'icon'} width={24} height={24} />
        <span>{project}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {symbol}
        </Tag>
      </Flex>
    ),
  },
  {
    title: 'Current Price',
    dataIndex: 'currentPrice',
    key: 'currentPrice',
    render: (value) => nFormatter(value, 2, '$'),
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaised',
    key: 'totalRaised',
    render: (value) => nFormatter(value, 2, '$'),
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    key: 'roi',
    render: (_, { roi }) => nFormatter(roi, 2, '$'),
  },
  {
    title: 'ATH ROI',
    dataIndex: 'athRoi',
    key: 'athRoi',
    render: (value) => nFormatter(value, 2, '$'),
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpadList',
    key: 'launchpadList',
    render: (_, { launchpads, ido_platform_id }) => (
      <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
        {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
      </LaunchpadModal>
    ),
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
    render: (value) => formatDate(value),
  },
];

const columnsTopIdoLaunchpads: ColumnsType<any> = [
  {
    title: '#',
    render: (_text, _record, index) => `${index + 1}`,
  },
  {
    title: 'Name',
    dataIndex: 'project',
    key: 'project',
    render: (_, { name, image, tag }) => (
      <Flex align={'center'} gap={8}>
        <Image src={image} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {tag}
        </Tag>
      </Flex>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    key: 'roi',
    render: (value) => `${value.toFixed(2)}x`,
  },
  {
    title: 'ATH ROI',
    dataIndex: 'athRoi',
    key: 'athRoi',
    render: (value) => `${value.toFixed(2)}x`,
  },
  {
    title: 'IDOs',
    dataIndex: 'idos',
    key: 'idos',
  },
  {
    title: 'Sum Market Cap',
    dataIndex: 'sumMarketCap',
    key: 'sumMarketCap',
    render: (_, { sumMarketCap }) => nFormatter(sumMarketCap, 2, '$'),
  },
  {
    title: 'Entry',
    dataIndex: 'entry',
    key: 'entry',
    render: (_, { entry }) => nFormatter(entry, 2, '$'),
  },
  {
    title: 'Gainers',
    dataIndex: 'gainer',
    key: 'gainer',
    render: (value, {}) => (
      <div className='flex gap-3 items-center'>
        <Doughnut
          data={[Number(value || 0), 100 - Number(value || 0)]}
          colors={['green', 'red']}
          radius={24}
          hole={14}
          stroke={1}
        />
        <div className='text-sm font-semibold text-[#333747]'>
          {value || 0}%
        </div>
      </div>
    ),
  },
];

export const getIeoIdoCategoryLabel = (category: string) => {
  return (
    IeoIdoCategoryLabel[category] ||
    IeoIdoCategoryLabel[IeoIdoCategory.upcoming]
  );
};

export const getIeoIdoBreadcrumbs = (category: string) => {
  return [
    {
      title: 'Home',
    },
    {
      title: 'IDO/IEO',
    },
    {
      title: getIeoIdoCategoryLabel(category),
    },
  ];
};

export const getIeoIdoColumns = (category: string) => {
  switch (category) {
    case IeoIdoCategory.upcoming:
      return columnsUpcoming;
    case IeoIdoCategory.ongoing:
      return columnsUpcoming;
    case IeoIdoCategory.ended:
      return columnsEnded;
    case IeoIdoCategory.topIeoLaunchpads:
      return columnsUpcoming;
    case IeoIdoCategory.topIdoLaunchpads:
      return columnsTopIdoLaunchpads;
    case IeoIdoCategory.overview:
      return columnsUpcoming;
    default:
      return columnsUpcoming;
  }
};

export const getIeoIdoColumnsDetail = (category?: string) => {
  switch (category) {
    case IeoIdoCategory.upcoming:
      return columnsUpcomingDetail;
    default:
      return columnsEndedDetail;
  }
};

export const getCategoryTags = (
  { isDetail }: { isDetail?: boolean } = { isDetail: false }
) => {
  if (isDetail) {
    return [
      {
        label: IeoIdoCategory.ended,
        value: IeoIdoCategory.ended,
        disabled: false,
      },
      {
        label: IeoIdoCategory.ongoing,
        value: IeoIdoCategory.ongoing,
        disabled: true,
      },
      {
        label: IeoIdoCategory.upcoming,
        value: IeoIdoCategory.upcoming,
        disabled: false,
      },
    ];
  }

  return Object.values(IeoIdoCategory).map((category) => ({
    label: IeoIdoCategoryLabel[category],
    value: category,
    disabled: TEMP_DISABLED_TAGS.includes(category),
  }));
};

export const getIeoIdoApiPath = (category: string) => {
  return IeoIdoApiPath[category] || IeoIdoApiPath[IeoIdoCategory.upcoming];
};

export const getIeoIdoApiSearchPath = (category: string) => {
  return (
    IeoIdoApiSearchPath[category] ||
    IeoIdoApiSearchPath[IeoIdoCategory.upcoming]
  );
};

export const getIconLink = (type: string) => {
  const icons: { [key: string]: ReactNode } = {
    web: <IconWeb />,
    twitter: <IconTwitter />,
    telegram: <IconTelegram />,
    gitbook: <IconFile />,
    medium: <IconMedium />,
    github: <IconGithub />,
    discord: <IconDiscord />,
    facebook: <IconFacebook />,
  };

  return icons[type] || icons.web;
};

export const colorChart = [
  COLOR_CHART.BITTER_LEMON,
  COLOR_CHART.MALACHITE,
  COLOR_CHART.PAOLO_VERONESE_GREEN,
  COLOR_CHART.TURQUOISE_SURF,
  COLOR_CHART.CERULEAN_FROST,
  COLOR_CHART.PLUMP_PURPLE,
  COLOR_CHART.PURPUREUS,
  COLOR_CHART.JAZZBERRY_JAM,
  COLOR_CHART.CERISE,
  COLOR_CHART.SUNSET_ORANGE,
];
