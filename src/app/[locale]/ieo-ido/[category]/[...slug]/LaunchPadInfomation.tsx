'use client';

import { Page } from '@/components/page';
import { Flex } from 'antd';
import CategoryOverview from '../components/category-overview';
import { IeoIdoTable } from '../components/ieo-ido-table';
import TierSystem from '../components/tier-system';
import { getIeoIdoBreadcrumbs } from '../config';
import { LaunchPadInfomationType } from '../types';
import CoinInformation from './coinInfo';

type PropsType = {
  category: string;
  data: LaunchPadInfomationType;
};

const LaunchPadInfomation = (props: PropsType) => {
  const breadcrumbs = [
    ...getIeoIdoBreadcrumbs(props.category),
    { title: props.data.name },
  ];

  return (
    <Page breadcrumbs={breadcrumbs}>
      <Flex vertical gap={8}>
        <CoinInformation info={props.data} />

        <CategoryOverview info={props.data} />

        <TierSystem />

        <IeoIdoTable />
      </Flex>
    </Page>
  );
};

export default LaunchPadInfomation;
