'use client';
import {
  Avatar,
  Flex,
  Modal,
  Pagination,
  Progress,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UsHeader } from './us-header';
import { IUnlock, IUnlockData, Launchpad } from '../../types';
import Image from 'next/image';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import SelectItemTable from '@/components/SelectItemTable';
import { IResponseAxios } from '@/models/IResponse';
import { FetchTokenUnlock } from '@/usecases/token-unlock';
import { ORDER } from '@/helpers/constants';
import { currencyFormat, nFormatter, percentFormat } from '@/helpers';
import NextUnlock from '../nextUnlock';
import Link from 'next/link';

export default function UsTable() {
  const columns: ColumnsType<IUnlock> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: true,
      width: '200px',
      render: (_, value) => {
        return (
          <Flex align={'center'} gap={8}>
            <Link
              href={`/en/detail/${value.key}`}
              className='mx-2 text-grey-700 hover:text-primary-500 truncate max-w-[160px]'
            >
              {value.image ? (
                <img src={value.image} alt={'icon'} width={24} height={24} />
              ) : (
                ''
              )}
              <span>{value.name}</span>
              <Tag className={'bg-[#F1F4F7]'} bordered={false}>
                {value.symbol}
              </Tag>
            </Link>
          </Flex>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (_, { price, priceChangeIn24h }) => {
        return (
          <Flex vertical align={'center'} gap={8}>
            <span>
              {currencyFormat(Number(price), '$', { isAutoZero: true })}
            </span>
            {percentFormat(priceChangeIn24h)}
          </Flex>
        );
      },
    },
    {
      title: 'Market Cap',
      dataIndex: 'marketCap',
      key: 'marketCap',
      render: (_, { marketCap }) => {
        return nFormatter(marketCap, 2, '$');
      },
    },

    {
      title: 'Launchpad',
      dataIndex: 'launchpadList',
      key: 'launchpadList',
      align: 'right',
      render: (_, { launchpads }) => {
        if (!launchpads) return null;
        return (
          <Avatar.Group
            maxCount={3}
            maxPopoverTrigger='click'
            size={24}
            maxStyle={{
              color: '#333747',
              backgroundColor: '#E5E6EB',
              cursor: 'pointer',
              fontSize: 10,
            }}
          >
            {launchpads?.map((item) => (
              <Avatar
                onClick={(_e) => _openModal(launchpads)}
                src={item.image}
                key={item.key}
              />
            ))}
          </Avatar.Group>
        );
      },
    },
    {
      title: 'IDO/IEO ROI',
      dataIndex: 'roi',
      key: 'roi',
      render: (_, { roi }) => {
        if (!roi) return '-';
        return <>{currencyFormat(Number(roi), '', { isAutoZero: true })}x</>;
      },
    },
    {
      title: 'Next Unlock',
      dataIndex: 'nextTokenPrice',
      key: 'nextTokenPrice',
      width: '300px',
      align: 'center',
      render: (
        _,
        { nextTokenPrice, nextTokenPricePercent, nextUnlockDate }
      ) => {
        return (
          <NextUnlock
            nextTokenPrice={nextTokenPrice}
            nextTokenPricePercent={nextTokenPricePercent}
            nextUnlockDate={nextUnlockDate}
          />
        );
      },
    },
  ];

  const [data, setData] = useState<IUnlock[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [filter, setFilter] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Launchpad[]>([]);
  const getTokenUnlock = useCallback(async () => {
    const response: IResponseAxios<IUnlock> = await FetchTokenUnlock({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: filter.map((e) => e.code),
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);

    /* #endregion */
  }, [pageSize, currentPage, order, filter]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const _openModal = (ar: any[]) => {
    setModalData(ar);
    setIsModalOpen(true);
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

  useEffect(() => {
    getTokenUnlock();
  }, [getTokenUnlock, pageSize, currentPage, order, filter]);

  const _setFilter = (value: any[]) => {
    setFilter(value);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={'us-table'}>
      <UsHeader onFilter={_setFilter} />
      <div className='overflow-x-auto'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: ['none'], pageSize }}
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

      <Modal
        title='Launchpads'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={350}
      >
        <div className='w-full overflow-y-auto h-60'>
          {modalData.map((e, index) => {
            return (
              <div
                className='flex items-center mt-2 mb-2'
                key={`modal-index-${index}`}
              >
                <img src={e.image} className='w-6 h-6 mr-3' />
                <p className=''>{e.name}</p>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};
