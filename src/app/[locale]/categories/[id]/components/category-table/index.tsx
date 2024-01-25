import { Flex, Pagination, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import HeadFilter from '../HeadFilter';
import { categoryColumns } from './config';
import { useParams } from 'next/navigation';
import SelectItemTable from '@/components/SelectItemTable';
import { faker } from '@faker-js/faker';
import { FetchCategoryCoins } from '@/usecases/category';
import { CategoryCoinsFilterType, CategoryCoinsType } from '../../types';
import { IResponseAxios } from '@/models/IResponse';
import { ORDER } from '@/helpers/constants';

export default function CategoryTable() {
  const params = useParams<{ locale: string; id: string }>();
  const categoryId = params.id;

  const [data, setData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const _renderRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = start + data.length - 1;
    return (
      <span className='table-total'>
        {start} - {end} from {total}
      </span>
    );
  };

  const getCategoryCoins = useCallback(
    async (filter: CategoryCoinsFilterType = {}) => {
      const _params: CategoryCoinsFilterType = {
        category_id: categoryId,
        limit: pageSize,
        page: currentPage,
        sort_by: order.columnKey,
        sort_order: ORDER[order.order],
        ...filter,
      };

      const response: IResponseAxios<CategoryCoinsType> =
        await FetchCategoryCoins(_params);

      if (!response) return;
      const { data, total } = response;
      setData(data);
      setTotal(total!!);
    },
    [pageSize, currentPage, categoryId]
  );

  useEffect(() => {
    getCategoryCoins();
  }, [getCategoryCoins]);

  return (
    <div className='mt-4 category-table'>
      <Flex vertical gap={16} className={'p-6'}>
        <HeadFilter onFilter={getCategoryCoins} />
        <Table
          columns={categoryColumns}
          dataSource={data as any}
          pagination={false}
          className='overflow-x-auto overflow-y-hidden'
        />
        <div className='pt-6 flex items-center justify-center table-pagination pagination-mobile'>
          <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={_onChangePage}
            showSizeChanger={false}
          />
        </div>
        <div className='pt-6 flex flex-wrap gap-6 items-center justify-between table-pagination'>
          <div>{_renderRange()}</div>
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
      </Flex>
    </div>
  );
}
