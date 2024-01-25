import Link from 'next/link';
import { memo, useCallback, useEffect, useState } from 'react';
import './style.scss';
import { Button, Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchCoins, SearchCoinsFilter } from '@/usecases/home';
import { get, isArray, round } from 'lodash';
import SelectItemTable from '@/components/SelectItemTable';
import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import { IconCustomCointTab } from '@/assets/icons/home/IconCustomCoinTab';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderRangePaging,
  renderSortIcon,
} from '@/helpers';
import { IResponseAxios } from '@/models/IResponse';
import { IHomeCoin, ISearchFilter } from './props';
import { ORDER } from '@/helpers/constants';
import { useDebounce } from 'usehooks-ts';

const columns: ColumnsType<IHomeCoin> = [
  {
    key: 'id',
    title: '#',
    width: 40,
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
      const imageSource = get(value, 'image.x60', '');
      return (
        <span className='table-header'>
          <div className='flex items-center'>
            <img src={imageSource} alt={value.name} className='w-7 h-7' />
            <Link
              href={`/en/detail/${value.key}`}
              className='mx-2 text-grey-700 hover:text-primary-500 truncate max-w-[160px]'
            >
              {value.name}
            </Link>
            <span className='px-2 rounded py-0 bg-grey-200 text-grey-500 leading-5 coin-code'>
              {value.symbol}
            </span>
          </div>
        </span>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price',
    title: 'Price',
    width: 200,
    align: 'right',
    render: (_, value) => {
      const price = value.price['USD'];
      return currencyFormat(price, '$');
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'average24h',
    title: '24h %',
    width: 167,
    align: 'right',
    render: (_, value) => {
      return percentFormat(value.average24h);
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
  {
    key: 'chart',
    title: 'Price Graph (7d)',
    width: 261,
    align: 'right',
    render: (_, value) => {
      try {
        return (
          <div className='flex items-center justify-end'>
            <img
              alt='chart'
              width={200}
              height={52}
              src={`data:image/svg+xml;base64,${value.chart}`}
            />
          </div>
        );
      } catch (error) {
        return null;
      }
    },
  },
];

const Coins = () => {
  const [data, setData] = useState<IHomeCoin[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 300);

  const getCoins = useCallback(async () => {
    const response: IResponseAxios<IHomeCoin> = await FetchCoins({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: debouncedValue.join(','),
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);

    /* #endregion */
  }, [pageSize, currentPage, order, debouncedValue]);

  useEffect(() => {
    getCoins();
  }, [getCoins, pageSize, currentPage, order, debouncedValue]);

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
    const res: any = await SearchCoinsFilter({
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
      <Select.Option isSelectOption={true} value={code} key={code}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
            <span className='code px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>
              {code}
            </span>
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
      <div className=''>
        <div className='filter flex justify-between mb-4'>
          <div className='flex'>
            <FilterCustom
              placeholder='Filter Coins'
              renderOption={_renderOption}
              renderTag={_renderTag}
              onChange={_onSelectFilter}
              getData={_getData}
              isSortSelected='alphabet'
            />
            <div className='hidden xl:block md:block'>
              <Button className='ml-1 !h-full hover:!border-primary-500 hover:!text-primary-500 !font-jm'>
                <div className='flex'>
                  <IconFilterCoinTab />
                  <span className='ml-1'>Filters</span>
                </div>
              </Button>
            </div>
          </div>
          <div className='hidden xl:block md:block'>
            <Button className='ml-1 !h-full hover:!border-primary-500 hover:!text-primary-500 !font-jm'>
              <div className='flex'>
                <IconCustomCointTab />
                <span className='ml-1'>Customize</span>
              </div>
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto hide-scroll'>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ position: ['none'], pageSize }}
            onChange={(_page, _filter, sort) => {
              const itemSort = isArray(sort) ? sort[0] : sort;
              setOrder({
                columnKey: itemSort.columnKey
                  ? itemSort.columnKey.toString()
                  : '',
                order: itemSort.order ? itemSort.order.toString() : '',
              });
            }}
            // sortDirections={['ascend', 'descend']}
            showSorterTooltip={false}
          />
        </div>

        <div className='pt-6 flex items-center justify-center table-pagination pagination-mobile'>
          <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={_onChangePage}
            showSizeChanger={false}
            size='small'
          />
        </div>

        <div className='pt-6 flex items-center justify-between table-pagination'>
          <div>
            {renderRangePaging(currentPage, pageSize, data.length, total)}
          </div>
          <div className='pagination-desktop'>
            <Pagination
              total={total}
              pageSize={pageSize}
              current={currentPage}
              onChange={_onChangePage}
              showSizeChanger={false}
            />
          </div>
          <div>
            <SelectItemTable onChange={_onChangeSize} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Coins);
