// import { IconStar } from '@/assets/icons';
import { useEffect, useState } from 'react';
import './style.scss';
import { Pagination, Table, Tabs } from 'antd';
// import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchTrendings } from '../../../usecases/home';
import { caculatorAverage24h } from '@/helpers/functions';
import { ORDER } from '@/helpers/constants';
import SelectItemTable from '@/components/SelectItemTable';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderRangePaging,
  renderSortIcon,
} from '@/helpers';
import { isArray } from 'lodash';

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
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <img src={value.image.x60} width={32} />
          <span className='ml-2'>{value.name}</span>
          {value.symbol ? (
            <span className='ml-2 px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5 text-xs'>
              {value.symbol}
            </span>
          ) : null}
        </p>
      );
    },
  },
  // {
  //   key: 'rate',
  //   title: 'Rate',
  //   width: 91,
  //   align: 'left',
  //   render: (_, value) => {
  //     return (
  //       <p className='inline-flex items-center'>
  //         <span className='mr-1'>{value.rate}</span> <IconStar />
  //       </p>
  //     );
  //   },
  // },
  {
    key: 'price',
    title: 'Price',
    width: 151,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return currencyFormat(value.price['USD'], '$');
    },
  },
  {
    key: 'period',
    title: '24h %',
    width: 150,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return percentFormat(value.average24);
    },
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return nFormatter(value.volume24h, 2, '$');
    },
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 168,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return nFormatter(value.marketCap, 2, '$');
    },
  },
  {
    key: 'graph',
    title: 'Price Graph (7d)',
    width: 261,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <div className='flex items-center justify-end'>
          <img src={`data:image/svg+xml;base64,${value.chart}`} />
        </div>
      );
    },
  },
];

const IconFire = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M19.5 14.0003C19.5 18.1354 16.136 21.5003 12 21.5003C7.864 21.5003 4.5 18.1354 4.5 14.0003C4.5 11.7523 5.142 10.1513 6.646 8.64635C6.941 8.35035 7.275 8.05434 7.621 7.74834C9.037 6.49434 10.5 5.19737 10.5 2.99937C10.5 2.81537 10.602 2.64533 10.764 2.55833C10.926 2.47133 11.123 2.48036 11.277 2.58336C11.337 2.62336 16.915 6.44633 14.055 13.0143C14.726 12.6393 15.529 12.0243 16.022 11.0693C16.338 10.4573 16.499 9.76137 16.499 8.99937C16.499 8.79637 16.622 8.61336 16.81 8.53636C16.996 8.45936 17.213 8.50336 17.356 8.64836C18.719 10.0334 19.5 11.9844 19.5 14.0003Z'
        fill='url(#paint0_linear_2870_33418)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_2870_33418'
          x1='12'
          y1='2.49902'
          x2='12'
          y2='21.5003'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color='#FAA93F' />
          <stop offset='1' stop-color='#F04636' />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Trending = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [trendings, setTrendings] = useState([]);

  const showTotal = (total: number) => `Total ${total} items`;
  function getTrendings(params: any) {
    FetchTrendings(params).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      setTrendings(res.data);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    getTrendings({
      limit: pageSize,
      page: currentPage,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      sort_by: order.columnKey,
    });
  }, [pageSize, currentPage, order]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const tabs = [
    'Trending Coins',
    'Real World Assets',
    'Zero Knowledge (ZK)',
    'Binance Launchpad ',
  ];

  return (
    <div className='tab-trending'>
      <Tabs
        defaultActiveKey='1'
        items={tabs.map((label, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: label,
            children: (
              <div>
                <div className='overflow-x-auto hide-scroll'>
                  <Table
                    columns={columns}
                    dataSource={trendings}
                    pagination={{ position: ['none'], pageSize }}
                    rowKey='id'
                    showSorterTooltip={false}
                    onChange={(_page, _filter, sort) => {
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
                    {renderRangePaging(
                      currentPage,
                      pageSize,
                      trendings.length,
                      total
                    )}
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
            ),
            icon: <IconFire />,
            disabled: true,
          };
        })}
      />
    </div>
  );
};

export default Trending;
