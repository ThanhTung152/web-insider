'use client';

import { Segmented, Pagination, Table } from 'antd';
import { useState, useEffect } from 'react';
import SelectMarket from './select-market/SelectMarket';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import SelectItemTable from '@/components/SelectItemTable';
import { currencyFormat, nFormatter, percentFormat } from '@/helpers';
import {
  FetchHistoricals,
  FetchSpot,
} from '@/usecases/coin-info';
import { SegmentedValue } from 'antd/es/segmented';

const columns: ColumnsType<ISpot> = [
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
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchange',
    width: 200,
    render: (_, { name, icon }) => (
      <div className='flex items-center gap-2'>
        <Image src={icon} alt={'icon'} width={24} height={24} />
        <span>{name}</span>
      </div>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
    width: 200,
    render: (_, { tier }) => <>{tier}</>,
  },
  {
    title: 'Pair',
    dataIndex: 'paid',
    key: 'paid',
    width: 200,
    render: (_, { pair }) => <>{pair}</>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 200,
    render: (_, { price }) => <>{currencyFormat(price, '$')}</>,
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'volume24h',
    key: 'volume24h',
    width: 200,
    render: (_, { volume24h }) => <>{nFormatter(volume24h, 2,'$')}</>,
  },
  {
    title: 'Market Share',
    dataIndex: 'ms',
    key: 'ms',
    render: (_, { marketShare }) => <>{percentFormat(marketShare)}</>,
  },
];

const columnsHistoricals: ColumnsType<IHistorical> = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 200,
    render: (_, { date }) => <span>{date}</span>,
  },
  {
    title: 'Open',
    dataIndex: 'open',
    key: 'open',
    width: 200,
    render: (_, { open }) => <>{currencyFormat(open, '$')}</>,
  },
  {
    title: 'High',
    dataIndex: 'high',
    key: 'high',
    width: 200,
    render: (_, { high }) => <>{currencyFormat(high, '$')}</>,
  },
  {
    title: 'Low',
    dataIndex: 'low',
    key: 'low',
    width: 200,
    render: (_, { low }) => <>{currencyFormat(low, '$')}</>,
  },
  {
    title: 'Close',
    dataIndex: 'close',
    key: 'close',
    width: 200,
    render: (_, { close }) => <>{currencyFormat(close, '$')}</>,
  },
  {
    title: 'Volume',
    dataIndex: 'volume',
    key: 'volume',
    width: 200,
    render: (_, { volume }) => <>{nFormatter(volume,2, '$')}</>,
  },
  {
    title: 'Market Cap',
    dataIndex: 'mc',
    key: 'mc',
    width: 200,
    render: (_, { marketcap }) => <>{nFormatter(marketcap, 2,'$')}</>,
  },
];

const data: IMarket[] = [
  {
    exchange: {
      name: 'BTC',
      img: '/btc.png',
    },
    tier: 100.0,
    price: 345.65,
    paid: 345.65,
    volume24h: 345.67,
    ms: '0.15%',
  },
  {
    exchange: {
      name: 'BTC',
      img: '/btc.png',
    },
    tier: 100.0,
    price: 345.65,
    paid: 345.65,
    volume24h: 345.67,
    ms: '0.15%',
  },
  {
    exchange: {
      name: 'BTC',
      img: '/btc.png',
    },
    tier: 100.0,
    price: 345.65,
    paid: 345.65,
    volume24h: 345.67,
    ms: '0.15%',
  },
];

const Markets = (props: any) => {
  const tabs = [
    {
      id: 1,
      label: 'Spot',
      enable: true,
    },
    {
      id: 2,
      label: 'Future',
      enable: false,
    },
    {
      id: 3,
      label: 'Historical Data',
      enable: true,
    },
  ];
  const [active, setActive] = useState<number>(1);
  const activeTab = (id: number) => {
    if (id != 2) setActive(id);
  };

  return (
    <div className='fade-top box-shadow-common p-6'>
      <div className='flex items-center gap-4 mb-4'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => activeTab(tab.id)}
            className={
              'w-auto h-auto rounded-xl py-3 px-5 gap-2 cursor-pointer text-xs md:text-base ' +
              (tab.id === active
                ? 'bg-gradient-to-b from-blue-500 to-indigo-900 text-white'
                : 'border ') +
              (tab.enable ? '' : 'disable')
            }
          >
            <p>{tab?.label}</p>
          </div>
        ))}
      </div>
      {active == 1 && <Spot slug={props.slug} />}
      {active == 3 && <Historical slug={props.slug} />}
    </div>
  );
};

export function Historical(props: any) {
  const total = 1000;
  const _onChangePage = (page: number) => {
    setPage(page);
  };

  const _onChangeSize = (value: number) => {
    setPageSize(value);
  };

  const [historicals, setHistoricals] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  async function fetchHistoricals() {
    try {
      console.log('Slug:', props?.slug);

      const res: any = await FetchHistoricals({
        coin_key: props.slug,
        limit: pageSize,
        page: page,
      });
      setHistoricals(res.data);
      console.log('historicals', res.data);
    } catch (error) {
      return null;
    }
  }
  useEffect(() => {
    fetchHistoricals();
  }, [pageSize, page]);

  const _renderRange = () => {
    const start = (page - 1) * pageSize + 1;
    const end = start + data.length - 1;
    return (
      <span className='table-total'>
        {start} - {end} from {total}
      </span>
    );
  };
  return (
    <div>
      <div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
        <div className='w-full max-w-[280px]'></div>
      </div>
      <div>
        <div className='overflow-x-scroll hide-scroll'>
          <Table
            columns={columnsHistoricals}
            dataSource={historicals}
            pagination={{ position: ['none'], pageSize }}
          />
        </div>
        <div className='pt-6 flex items-center justify-between table-pagination'>
          <div className='hidden md:block'>{_renderRange()}</div>
          <div className='flex items-center justify-center w-full md:w-auto'>
            <Pagination
              total={total}
              pageSize={pageSize}
              current={page}
              onChange={_onChangePage}
              showSizeChanger={false}
            />
          </div>
          <div className='hidden md:block'>
            <SelectItemTable onChange={_onChangeSize} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Spot(props: any) {
  const total = 1000;
  const _onChangePage = (page: number) => {
    setPage(page);
  };

  const _onChangeSize = (value: number) => {
    setPageSize(value);
  };

  const _onChangeType = (value: SegmentedValue) => {
    setType(value.toString());
  };

  const [spots, setSpots] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('All');

  async function fetchSpots(searchKey?:string) {
    try {
      console.log('Slug Spots:', props?.slug);
      const res: any = await FetchSpot({
        coin_key: props.slug,
        limit: pageSize,
        page: page,
        type: type,
        search_key:searchKey || ''
      });
      setSpots(res.data);
      console.log('spots', res.data);
    } catch (error) {
      setSpots([]);
      return [];
    }
  }
  useEffect(() => {
    fetchSpots();
  }, [pageSize, page, type]);

  const _renderRange = () => {
    const start = (page - 1) * pageSize + 1;
    const end = start + data.length - 1;
    return (
      <span className='table-total'>
        {start} - {end} from {total}
      </span>
    );
  };
  function onChangeSearchKey(searchKey: string) {
    fetchSpots(searchKey)
  }
  return (
    <div>
      <div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
        <SelectMarket onChangeSearhKey={onChangeSearchKey} />
        <div className='flex items-center justify-center w-full md:w-auto'>
          <Segmented
            onChange={_onChangeType}
            className='items-center'
            options={[
              { value: 'all', label: 'All' },
              { value: 'cex', label: 'CEX' },
              { value: 'dex', label: 'DEX' },
            ]}
          />
        </div>
        <div className='w-full max-w-[280px]'></div>
      </div>
      <div>
        <div className='overflow-x-scroll hide-scroll'>
          <Table
            columns={columns}
            dataSource={spots}
            pagination={{ position: ['none'], pageSize }}
          />
        </div>
        <div className='pt-6 flex items-center justify-between table-pagination'>
          <div className='hidden md:block'>{_renderRange()}</div>
          <div className='flex items-center justify-center w-full md:w-auto'>
            <Pagination
              total={total}
              pageSize={pageSize}
              current={page}
              onChange={_onChangePage}
              showSizeChanger={false}
            />
          </div>
          <div className='hidden md:block'>
            <SelectItemTable onChange={_onChangeSize} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Markets;
