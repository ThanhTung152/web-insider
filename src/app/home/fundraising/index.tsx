import { useEffect, useState } from 'react';
import './style.scss';
import { Checkbox, Pagination, Select, Table, Tag } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  FetchFundraisings,
  SearchFundraisingsFilter,
} from '../../../usecases/home';
import { IFundraising } from './props';
import { nFormatter, renderRangePaging, renderSortIcon } from '@/helpers';
import moment from 'moment';
import { get, isArray, isEmpty, random } from 'lodash';
import SelectItemTable from '@/components/SelectItemTable';
import { ORDER } from '@/helpers/constants';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import Link from 'next/link';
import { ISearchFilter } from '../coin/props';
import { useDebounce } from 'usehooks-ts';

const columns: ColumnsType<IFundraising> = [
  {
    key: 'id',
    title: '#',
    width: 56,
    align: 'center',
    render: (_, value, index) => {
      return index + 1;
    },
  },
  {
    key: 'project',
    title: 'Project',
    width: 248,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <p className='inline-flex items-center'>
          <img src={value.icon} width={32} />
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
    key: 'date',
    title: 'Date',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 150,
    align: 'left',
    render: (_, value) => {
      return moment(value.date).format('DD MMM YYYY');
    },
  },
  {
    key: 'amountRaised',
    title: 'Amount Raised',
    width: 150,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return nFormatter(Number(value.raise), 2, '$');
    },
  },
  {
    key: 'stage',
    title: 'Round',
    width: 130,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return value.stage;
    },
  },
  {
    key: 'valuation',
    title: 'Valuation',
    width: 130,
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'right',
    render: (_, value) => {
      return value.valuation
        ? nFormatter(Number(value.valuation), 2, '$')
        : 'N/A';
    },
  },
  {
    key: 'funds',
    title: 'Backers',
    width: 250,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      if (!value.funds || isEmpty(value.funds)) return <span>N/A</span>;
      const image = get(value, 'funds[0].image', '');
      const name = get(value, 'funds[0].name', '');

      return (
        <p className='inline-flex items-center'>
          <img src={image} className='w-8 h-8' alt={name} width={32} />
          <span className='ml-2'>{name}</span>
          {value.funds.length > 1 ? (
            <div className='text-xs ml-2 bg-gray-200 flex pt-0.5 pb-0.5 text-center pl-2.5 pr-2.5 rounded-sm text-gray-400'>
              +{value.funds.length - 1}
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
    sortIcon: renderSortIcon,
    sorter: true,
    width: 261,
    align: 'left',
    render: (_, value) => {
      return value.category?.name;
    },
  },
];

const Fundraising = () => {
  const [fundraisings, setFundraisings] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  function getFundraisings(params: any) {
    FetchFundraisings(params).then((res: any) => {
      setFundraisings(res.data);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    getFundraisings({
      limit: pageSize,
      page: currentPage,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      sort_by: order.columnKey,
      search_key: debouncedValue.join(','),
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
        {rawData?.name ?? value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await SearchFundraisingsFilter({
      search_key: searchKey,
    });
    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      id: e.key,
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
    <div className='fundraising'>
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
          dataSource={fundraisings}
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
          {renderRangePaging(currentPage, pageSize, fundraisings.length, total)}
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

export default Fundraising;
