import { useEffect, useState } from 'react';
import { Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './style.scss';
import SelectItemTable from '@/components/SelectItemTable';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { isArray, round } from 'lodash';
import {
  nFormatter,
  percentFormat,
  renderRangePaging,
  renderSortIcon,
} from '@/helpers';
import { FetchCategories, SearchCategoriesFilter } from '@/usecases/home';
import { IResponseAxios } from '@/models/IResponse';

import ReactECharts from 'echarts-for-react';
import { COLOR_CHART, ORDER } from '@/helpers/constants';
import { ISearchFilter } from '../coin/props';
import { useDebounce } from 'usehooks-ts';
import { useParams, useRouter } from 'next/navigation';

const columns: ColumnsType<IHomeCategory> = [
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
    width: 320,
    align: 'left',
    render: (_, value) => {
      const { rankedCoins } = value;
      const elements: JSX.Element[] = rankedCoins?.map((e, index) => {
        return (
          <img
            style={{ marginLeft: -index * 5, zIndex: index + 1 }}
            className='rounded-full border w-6 h-6'
            src={e.iconUrl}
            width={24}
            height={24}
            alt={e.name}
            key={e.key}
          />
        );
      });
      return (
        <div className='flex'>
          <div className='flex'>{elements}</div>
          <div className='ml-2'>{value.name}</div>
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'avgPriceChange',
    title: 'Avg Price Change (24h)',
    width: 250,
    align: 'right',
    render: (_, value) => {
      return percentFormat(value.avgPriceChange['24H']);
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 190,
    align: 'right',
    render: (_, value) => {
      const { marketCapChangeIn24h } = value;
      return (
        <p className='flex flex-col justify-end'>
          {nFormatter(value.market_cap, 2, '$')}
          {percentFormat(marketCapChangeIn24h)}
        </p>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'volume',
    title: 'Volume (24h)',
    align: 'right',
    render: (_, value) => {
      const { volumeChangeIn24h } = value;
      return (
        <p className='flex flex-col justify-end'>
          {nFormatter(value.volume24h, 2, '$')}
          {percentFormat(volumeChangeIn24h)}
        </p>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'dominance',
    title: 'Dominance',
    align: 'right',
    render: (_, value) => {
      return percentFormat(value.dominance);
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'gainers',
    title: 'Gainers',
    align: 'right',
    render: (_, value) => {
      return (
        <div className='flex items-center justify-end'>
          <ReactECharts
            style={{
              height: 40,
              width: 40,
            }}
            option={{
              option: {
                tooltips: { enabled: false },
                hover: { mode: null },
              },
              emphasis: {
                scale: false,
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center',
                  },
                  emphasis: {
                    scale: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  data: [
                    {
                      value: value.losers,
                      name: 'losers',
                      itemStyle: {
                        color: COLOR_CHART.RADICAL_RED,
                      },
                    },
                    {
                      value: value.gainers,
                      name: 'Gainers',
                      itemStyle: {
                        color: COLOR_CHART.CRAYOLA,
                      },
                    },
                  ],
                },
              ],
            }}
          />
          <span className='ml-1 w-[54px] text-left'>
            {round((value.gainers / (value.gainers + value.losers)) * 100, 2)}%
          </span>
        </div>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
];

const increasePercent = (old: number, newValue: number) => {
  return percentFormat(((newValue - old) / old) * 100);
};

const Categories = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IHomeCategory[]>([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);
  const router = useRouter();
  const { locale } = useParams();

  useEffect(() => {
    _fetchCategories();
  }, [currentPage, order, pageSize, debouncedValue]);

  const _fetchCategories = async () => {
    const response: IResponseAxios<IHomeCategory> = await FetchCategories({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: debouncedValue.join(','),
    });
    if (!response) return;
    const { data, total } = response;
    setTotal(total!!);
    setData(data);
  };

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const _renderOption = ({ name, checked, id, code }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={id}>
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
        {rawData?.name ?? value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await SearchCategoriesFilter({
      slug: searchKey,
    });
    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      id: e.id,
      name: e.name,
      code: e.slug,
      thumb: '',
      isSelected: false,
    }));
  };

  const _onSelectFilter = (value: string[]) => {
    setKeyFilter(value);
  };

  return (
    <div className='category-tab'>
      <div className='mb-4'>
        <FilterCustom
          placeholder='Filter Categories'
          renderOption={_renderOption}
          renderTag={_renderTag}
          onChange={_onSelectFilter}
          getData={_getData}
        />
      </div>
      <div className='overflow-x-auto hide-scroll'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'], pageSize }}
          rowKey='id'
          showSorterTooltip={false}
          onRow={(record) => {
            return {
              onClick: () => {
                console.log('categories.record', record);

                router.push(`/${locale}/categories/${record.id}`);
              },
            };
          }}
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
  );
};

export default Categories;
