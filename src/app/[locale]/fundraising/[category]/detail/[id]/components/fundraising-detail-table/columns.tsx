import {
  renderSortIcon,
  currencyFormat,
  percentFormat,
  nFormatter,
} from '@/helpers';
import { ColumnsType } from 'antd/es/table';
import { get } from 'lodash';
import { IPortfolios } from '../../../../types';
import { roundsColumns } from '../../config';

const columnPorfolio: ColumnsType<IPortfolios> = [
  {
    key: 'id',
    title: '#',
    align: 'left',
    render: (_, _value, index) => index + 1,
  },
  {
    key: 'name',
    title: 'Name',
    width: 248,
    align: 'left',
    fixed: true,
    render: (_, value) => {
      const imageSource = get(value, 'logo.x60', '');
      return (
        <span className='table-header'>
          <div className='flex items-center'>
            <img src={imageSource} alt={value.name} className='w-7 h-7' />
            <div
              // href={`/en/detail/${value.key}`}
              className='mx-2 text-grey-700 hover:text-primary-500 truncate max-w-[160px]'
            >
              {value.name}
            </div>
            <span className='px-2 rounded py-0 bg-grey-200 text-grey-500 leading-5 coin-code'>
              {value.ticker}
            </span>
          </div>
        </span>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'rating',
    title: 'Rating',
    align: 'center',
    render: () => {
      return '-';
    },
  },
  {
    key: 'price',
    title: 'Price',
    width: 200,
    align: 'right',
    render: (_, value) => {
      return currencyFormat(value.price, '$');
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price24hPercent',
    title: '24h %',
    width: 167,
    align: 'right',
    render: (_, { price24hPercent }) => {
      return percentFormat(price24hPercent);
    },
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    render: (_, value: any) => {
      return nFormatter(value.volume24h, 2, '$');
    },
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 168,
    align: 'right',
    render: (_, value) => {
      return nFormatter(Number(value.marketCap), 2, '$');
    },
  },
];

export const tabFundraisingTable = {
  por: columnPorfolio,
  fun: roundsColumns,
};
