import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderSortIcon,
} from '@/helpers';
import { Flex } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { isArray } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IGainer } from './props';

type TopDataProps = {
  title: string;
  data: IGainer[];
  onChangeOrder: ({
    columnKey,
    order,
  }: {
    columnKey: string;
    order: string;
  }) => void;
};

const TopData = ({ title, data, onChangeOrder }: TopDataProps) => {
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  return (
    <div className='flex-1 flex-col gap-4'>
      <h4 className='font-bold text-[#333747] text-[20px] tracking-[0] leading-[28px] mb-4 whitespace-nowrap'>
        {title}
      </h4>
      <div className='overflow-x-auto hide-scroll'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'] }}
          rowKey='id'
          onChange={(_page, _filter, sort) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            const newOr = {
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : '',
              order: itemSort.order ? itemSort.order.toString() : '',
            };
            setOrder(newOr);
            onChangeOrder(newOr);
          }}
          showSorterTooltip={false}
        />
      </div>
    </div>
  );
};

export default TopData;

const columns: ColumnsType<any> = [
  {
    key: 'id',
    title: '#',
    width: 56,
    align: 'left',
    render: (_, value, index) => {
      return index + 1;
    },
  },
  {
    key: 'name',
    title: 'Name',
    width: 248,
    align: 'left',
    render: (_, value) => {
      return (
        <div className='flex items-center'>
          <img width={32} height={32} alt={value.name} src={value.image.x60} />
          {value.icon}
          <p className='textover-ellipsis'>
            <Link href={`/en/detail/${value.symbol}`} className='mx-2'>
              {value.name}
            </Link>
          </p>

          {value.symbol ? (
            <span className='ml-2 px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5 text-xs'>
              {value.symbol}
            </span>
          ) : null}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },

  {
    key: 'price',
    title: 'Price',
    width: 120,
    align: 'right',
    render: (_, value) => {
      return currencyFormat(value.price.USD, '$');
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'period',
    title: '24h %',
    width: 167,
    align: 'right',
    render: (_, value) => {
      return percentFormat(value.average24);
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    render: (_, value) => {
      return nFormatter(value.volume24h, 2, '$');
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
];
