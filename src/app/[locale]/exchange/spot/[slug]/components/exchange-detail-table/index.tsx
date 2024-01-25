'use client';

import Link from 'next/link';
import './index.scss';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { cloneDeep, isArray, random, round } from 'lodash';
import SelectItemTable from '@/components/SelectItemTable';
import FilterCustom from '@/components/FilterCustom';
import {
  percentFormat,
  nFormatter,
  renderSortIcon,
  renderRangePaging,
} from '@/helpers';

import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { IResponseAxios } from '@/models/IResponse';
import { ISearchFilter } from '../../../props';
import { ICoinTable } from '../../props';
import { COLOR_CHART, ORDER } from '@/helpers/constants';
import { useDebounce } from 'usehooks-ts';
import { FetchSpotList, SearchCoinsInFilter } from '@/usecases/exchange';
import { IconStar } from '@/assets/icons';
import { useParams } from 'next/navigation';
import BaseTable from '@/components/BaseTable';

const columns: ColumnsType<ICoinTable> = [
  {
    key: 'id',
    title: '#',
    width: 56,
    align: 'left',
    render: (_, value, index) => {
      return (
        <div className='text-zinc-700 text-sm font-jb leading-tight'>
          {index + 1}
        </div>
      );
    },
  },
  {
    key: 'name',
    title: 'Name',
    width: 248,
    align: 'left',
    render: (_, value) => {
      return (
        <span className='table-header'>
          <Link
            className='flex items-center'
            href={`/en/detail/${value.key}`}
          >
            <div className='flex items-center'>
              <img className='mr-2 h-8 w-8' src={value.logo} alt={value.name}/>
              <div className='text-zinc-700 text-sm font-jb leading-tight hover:text-primary-500'>
                {value.name}
              </div>
            </div>
          </Link>
        </span>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'rate',
    title: 'Rate',
    width: 115,
    align: 'left',
    render: (_, value, index) => {
      if (!value?.rate) {
        return <span>-</span>;
      }

      return (
        <div className='flex gap-1'>
          <div className='text-zinc-700 text-sm font-sb leading-tight'>
            {value.rate}
          </div>
          <IconStar />
        </div>
      );
    },
  },
  {
    key: 'pair',
    title: 'Pair',
    width: 199,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-zinc-700 text-sm font-sb leading-tight'>
          {value.pair}
        </div>
      );
    },
  },
  {
    key: 'price',
    title: 'Price',
    width: 199,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-zinc-700 text-sm font-jsb leading-tight'>
          {'$ ' +
            (value.price < 0.01 ? value.price : round(value.price, 2))}
          {/* {nFormatter(value.usdLast, 2, '$')} */}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'priceChangeIn24h',
    title: '24h%',
    width: 190,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-sm font-jsb leading-tight'>
          {percentFormat(value.priceChangeIn24h, 'text-sm font-semibold')}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 169,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-zinc-700 text-sm font-jsb leading-tight'>
          {value.volume? nFormatter(value.volume, 2, '$') : '-'}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'exchangePercentVolume',
    title: 'Volumn %',
    width: 152,
    align: 'right',
    render: (_, value) => {
      return (
        <div className='text-sm font-jsb leading-tight'>
          {percentFormat(value.volumeChangeIn24h, 'text-sm font-semibold')}
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
];

const CoinTableInfo = (props: any) => {
  const params = useParams<{ locale: string; slug: string }>();
  const [dataCoins, setDataCoins] = useState<ICoinTable[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(999);
  const [key, setKey] = useState('binance');
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  useEffect(() => {
    getCoins();
  }, [pageSize, currentPage, order, debouncedValue]);

  const getCoins = useCallback(async () => {
    setKey(params.slug);
    const response: IResponseAxios<ICoinTable> = await FetchSpotList({
      key: key,
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: keyFilter.join(','),
    });
    if (!response) return;
    const { data, total } = response;
    setTotal(total!!);
    setDataCoins(data!!);
  }, [pageSize, currentPage, order, debouncedValue]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index, rawData } = options;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (index > 3) return <></>;

    if (index === 3)
      return (
        <Tag color='#5766ff' style={{ marginRight: 3 }}>
          ...
        </Tag>
      );
    return (
      <Tag
        color='#5766ff'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {rawData.name ?? value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await SearchCoinsInFilter({
      search_key: searchKey,
    });
    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      id: e.key,
      name: e.name,
      code: e.key,
      thumb: '',
      isSelected: false,
    }));
  };

  const _renderOption = ({ name, code, checked }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={name}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
          </div>
          <div className='ant-checkbox'>
            {!checked ? (
              <Checkbox disabled className='hover:cursor-pointer' />
            ) : null}
          </div>
        </div>
      </Select.Option>
    );
  };

  const _onSelectFilter = (value: string[]) => {
    setKeyFilter(value);
  };

  return (
    <div className='home-table coin-tab'>
      <div className='filter flex justify-between my-4'>
        <div className='flex'>
          <FilterCustom
            placeholder='Filter coins'
            renderOption={_renderOption}
            renderTag={_renderTag}
            onChange={_onSelectFilter}
            getData={_getData}
            isSortSelected='alphabet'
          />
        </div>
      </div>
      <div className='table-price overflow-x-auto'>
        <BaseTable
          columns={columns}
          data={dataCoins}
          pageSize={pageSize}
          currentPage={currentPage}
          total={total}
          _onChangePage={_onChangePage}
          _onChangeSize={_onChangeSize}
          pagination={{ position: ['none'], pageSize }}
          onChange={(_page: any, _filter: any, sort: any[]) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : '',
              order: itemSort.order ? itemSort.order.toString() : '',
            });
          }}
        />
      </div>
    </div>
  );
};
export default CoinTableInfo;
