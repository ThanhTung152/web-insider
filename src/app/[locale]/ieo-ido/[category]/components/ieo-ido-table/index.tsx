'use client';
import SelectItemTable from '@/components/SelectItemTable';
import { ORDER } from '@/helpers/constants';
import { IResponseAxios } from '@/models/IResponse';
import { FetchIeoIdo, FetchLaunchPadProjects } from '@/usecases/ieo-ido';
import { Flex, Pagination, Table } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  IeoIdoCategory,
  IeoIdoStatus,
  getIeoIdoApiPath,
  getIeoIdoColumns,
  getIeoIdoColumnsDetail,
} from '../../config';
import { IIeoIdoData, IIeoIdoFilterType } from '../../types';
import HeadFilter from '../head-filter';
import HeadFilterInformation from '../head-filter-information';
import './styles.scss';

export const IeoIdoTable = () => {
  const {
    category: _category = IeoIdoCategory.upcoming,
    slug,
    locale,
  } = useParams<{
    category: string;
    locale: string;
    slug?: string[];
  }>();

  const category = slug ? slug[1] || IeoIdoCategory.ended : _category;

  const router = useRouter();

  const [data, setData] = useState<IIeoIdoData[]>([]);
  const [pageSize, setPageSize] = useState(slug ? 10 : 20);
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

  const getIeoIdoUpComing = useCallback(
    async (filter: IIeoIdoFilterType = {}) => {
      const _params: { [key: string]: string | number | string[] } = {
        limit: pageSize,
        page: currentPage,
        sort_by: order.columnKey,
        sort_order: ORDER[order.order],
        status: IeoIdoStatus[category] || '',
        ...filter,
      };

      if (slug) {
        _params.key = slug[0];
      }

      const response: IResponseAxios<IIeoIdoData> = slug
        ? await FetchLaunchPadProjects(_params)
        : await FetchIeoIdo(getIeoIdoApiPath(category), _params);

      if (!response) return;
      const { data, total } = response;
      setData(data);
      setTotal(total!!);
    },
    [pageSize, currentPage, order, category]
  );

  useEffect(() => {
    getIeoIdoUpComing();
  }, [getIeoIdoUpComing]);

  return (
    <Flex vertical gap={16} className={'ieo-ido-table'}>
      {slug ? (
        <HeadFilterInformation onFilter={getIeoIdoUpComing} />
      ) : (
        <HeadFilter onFilter={getIeoIdoUpComing} />
      )}
      <Table
        onRow={
          category === IeoIdoCategory.topIdoLaunchpads
            ? (record) => {
                return {
                  onClick: () => {
                    router.push(
                      `/${locale}/ieo-ido/${IeoIdoCategory.topIdoLaunchpads}/${record.key}`
                    );
                  },
                };
              }
            : undefined
        }
        columns={
          slug ? getIeoIdoColumnsDetail(category) : getIeoIdoColumns(category)
        }
        dataSource={data}
        pagination={false}
        className='overflow-x-auto overflow-y-hidden'
      />
      <div className='pt-6 flex-col md:flex-row flex items-center justify-center table-pagination pagination-mobile'>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={_onChangePage}
          showSizeChanger={false}
        />
      </div>

      <div className='pt-6 flex flex-wrap justify-center items-center gap-6 md:justify-between table-pagination'>
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
  );
};
