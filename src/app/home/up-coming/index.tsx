import { useEffect, useState } from 'react';
import { Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FetchUpComings, SearchUpcomingFilter } from '../../../usecases/home';
import './style.scss';
import {
  IOptionCustom,
  ICustomTagProp,
  IOptionAny,
} from '@/components/FilterCustom/props';
import SelectItemTable from '@/components/SelectItemTable';
import { get, isArray, isEmpty, random } from 'lodash';
import { nFormatter, renderRangePaging, renderSortIcon } from '@/helpers';
import moment from 'moment';
import FilterCustom from '@/components/FilterCustom';
import { ORDER } from '@/helpers/constants';
import Link from 'next/link';
import { ISearchFilter } from '../coin/props';
import { useDebounce } from 'usehooks-ts';

const columns: ColumnsType<any> = [
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
    key: 'project',
    title: 'Project',
    width: 230,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <img src={value.image} width={32} />
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
        </p>
      );
    },
  },
  {
    key: 'initialCap',
    title: 'Initial Cap',
    width: 150,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return nFormatter(value.initialCap, 2, '$');
    },
  },
  {
    key: 'totalRaise',
    title: 'Total Raise',
    width: 150,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return nFormatter(value.totalRaise, 2, '$');
    },
  },
  {
    key: 'backers',
    title: 'Backers',
    width: 250,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      if (!value.backers || isEmpty(value.backers)) return <span>N/A</span>;
      const image = get(value, 'backers[0].image', '');
      const name = get(value, 'backers[0].name', '');

      return (
        <p className='inline-flex items-center'>
          <img src={image} className='w-8 h-8' alt={name} width={32} />
          <span className='ml-2'>{name}</span>
          {value.backers.length > 1 ? (
            <div className='text-xs ml-2 bg-gray-200 flex pt-0.5 pb-0.5 text-center pl-2.5 pr-2.5 rounded-sm text-gray-400'>
              +{value.backers.length - 1}
            </div>
          ) : (
            ''
          )}
        </p>
      );
    },
  },
  {
    key: 'category',
    title: 'Category',
    width: 186,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return <p className='textover-ellipsis'>{value.category}</p>;
    },
  },
  {
    key: 'launchpad',
    title: 'Launch Pad',
    width: 168,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      if (!value.launchpads || isEmpty(value.launchpads))
        return <span>N/A</span>;
      const image = get(value, 'launchpads[0].image', '');
      const name = get(value, 'launchpads[0].name', '');
      return (
        <p className='inline-flex items-center'>
          <img src={image} className='w-8 h-8' alt={name} width={32} />
          <span className='ml-2'>{name}</span>
          {value.launchpads?.length > 1 ? (
            <div className='text-xs ml-2 bg-gray-200 flex pt-0.5 pb-0.5 text-center pl-2.5 pr-2.5 rounded-sm text-gray-400'>
              +{value.launchpads.length - 1}
            </div>
          ) : (
            ''
          )}
        </p>
      );
    },
  },
  {
    key: 'startDate',
    title: 'Start Date',
    width: 200,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return moment(value.created_at).format('DD MMM YYYY');
    },
  },
];

const UpComing = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [upcomings, setUpComings] = useState([]);

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  function getUpComings(params: any) {
    FetchUpComings(params).then((res: any) => {
      setUpComings(res.data);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    getUpComings({
      limit: pageSize,
      page: currentPage,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      sort_by: order.columnKey,
      search_key: debouncedValue.join(','),
      status: 'upcoming',
    });
  }, [pageSize, currentPage, order, debouncedValue]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const _renderOption = ({ name, code, checked }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={name}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
            {/* <span className='code px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>
              {code}
            </span> */}
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
        {rawData.name || value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await SearchUpcomingFilter({
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

  const _onSelectFilter = (value: string[]) => {
    setKeyFilter(value);
  };

  return (
    <div className='upcoming'>
      <div className='w-full md:max-w-[250px] mb-4'>
        <FilterCustom
          placeholder='Filter Projects'
          renderOption={_renderOption}
          renderTag={_renderTag}
          onChange={_onSelectFilter}
          getData={_getData}
        />
      </div>
      <div className='overflow-x-auto hide-scroll'>
        <Table
          columns={columns}
          dataSource={upcomings}
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
          {renderRangePaging(currentPage, pageSize, upcomings.length, total)}
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

export default UpComing;
