import { memo, useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Pagination, Select, Table, Tag } from 'antd';
import { isArray } from 'lodash';
import SelectItemTable from '@/components/SelectItemTable';
import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { renderRangePaging } from '@/helpers';
import { IResponseAxios } from '@/models/IResponse';
import { ORDER } from '@/helpers/constants';
import { ISearchFilter } from '@/app/home/coin/props';
import { useParams } from 'next/navigation';
import { tabFundraisingTable } from './columns';
import {
  FetchFilterFunc,
  FetchFilterPor,
  FetchFunRound,
  FetchPortfollios,
} from '@/usecases/fundraising';

interface IPropsTableData {
  tabKey: string;
  slug: string;
  //   bankerId: string;
}

const TableData = (props: IPropsTableData) => {
  const { tabKey, slug } = props;
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [keyFilter, setKeyFilter] = useState<string[]>([]);

  const getTableData = useCallback(async () => {
    const api = tabKey === 'por' ? FetchPortfollios : FetchFunRound;
    const response: IResponseAxios<any> = await api({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: keyFilter.join(','),
      backer_id: id,
      key: 'cmt-digital',
      slug,
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);

    /* #endregion */
  }, [pageSize, currentPage, order, keyFilter, slug]);

  useEffect(() => {
    getTableData();
  }, [getTableData, pageSize, currentPage, order, keyFilter]);

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
    const api = tabKey === 'por' ? FetchFilterFunc : FetchFilterPor;

    const res: any = await api({
      search_key: searchKey,
      key: searchKey,
      backer_id: id,
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
              placeholder={tabKey === 'por' ? 'Search' : 'Filter project'}
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
        </div>
        <div className='overflow-x-auto hide-scroll'>
          <Table
            columns={
              tabFundraisingTable[tabKey as keyof typeof tabFundraisingTable]
            }
            key={tabKey}
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

export default memo(TableData);
