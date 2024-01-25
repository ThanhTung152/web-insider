'use client';
import { Flex } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import { getColumnsFundraising, getFundraisingPathApi } from '../../config';
import { useParams } from 'next/navigation';
import { IResponseAxios } from '@/models/IResponse';
import { FetchFundraising } from '@/usecases/fundraising';
import { ORDER } from '@/helpers/constants';
import { useDebounce } from 'usehooks-ts';
import { isArray } from 'lodash';
import dynamic from 'next/dynamic';

const HeadFilter = dynamic(() => import('../head-filter'), { ssr: false })
const BaseTable = dynamic(() => import('@/components/BaseTable'), { ssr: false })

export default function FunDTable() {
  const params = useParams<{ locale: string; category: string }>();

  const [data, setData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const columns = getColumnsFundraising(params.category);

  const getTopbacker = useCallback(async () => {
    const url = getFundraisingPathApi(params.category);
    const response: IResponseAxios<any> = await FetchFundraising(url, {
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
  }, [pageSize, currentPage, order, params.category, debouncedValue]);

  useEffect(() => {
    getTopbacker();
  }, [getTopbacker]);

  const _onChangeFilter = (keys: string[]) => {
    setKeyFilter(keys);
  };

  return (
    <Flex vertical gap={16}>
      <HeadFilter layout={params.category} onChange={_onChangeFilter} />
      <BaseTable
        columns={columns}
        data={data}
        pageSize={pageSize}
        currentPage={currentPage}
        total={total}
        _onChangePage={_onChangePage}
        _onChangeSize={_onChangeSize}
        showSorterTooltip={false}
        onChange={(_page: any, _filter: any, sort: any[]) => {
          const itemSort = isArray(sort) ? sort[0] : sort;
          setOrder({
            columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
            order: itemSort.order ? itemSort.order.toString() : '',
          });
        }}
      />
    </Flex>
  );
};
