'use client';

import React, { useState } from 'react';
import { Button, Flex } from 'antd';
import './styles.scss';
import TableData from './tableData';

const tabs = [
  {
    disable: false,
    label: 'Portfolio',
    key: 'por',
  },
  {
    disable: false,
    label: 'Funding Rounds',
    key: 'fun',
  },
  {
    disable: true,
    label: 'Co-Invesment',
    key: 'inv',
  },
  {
    disable: true,
    label: 'Upcoming IDO/IEO',
    key: 'upc',
  },
];

const FundraisingDetailTable = ({ slug }: { slug: string }) => {
  const [tabActive, setTabActive] = useState('por');

  const _renderTabs = () => {
    return tabs.map((tab) => (
      <Button
        key={tab.key}
        disabled={tab.disable}
        className={tab.key === tabActive ? 'active' : ''}
        onClick={() => {
          setTabActive(tab.key);
        }}
      >
        {tab.label}
      </Button>
    ));
  };

  return (
    <Flex vertical gap={16} className='p-6 mt-6'>
      <Flex vertical gap={16} className='header-filter'>
        <Flex wrap='wrap' gap={16} className='header-filter__options'>
          {_renderTabs()}
        </Flex>
      </Flex>
      <TableData key={tabActive} tabKey={tabActive} slug={slug} />
    </Flex>
  );
};

export default FundraisingDetailTable;
