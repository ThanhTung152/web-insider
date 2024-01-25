'use client';
import { useEffect, useState } from 'react';

import { TIME_FILTER } from '@/helpers/constants';
import { FetchCategoryDetail } from '@/usecases/category';
import CategoryOverview from './components/category-overview';
import CategoryTable from './components/category-table';
import './styles.scss';
type PageProps = {
  params: {
    id: string;
  };
};

export default function CategoryDetail(props: PageProps) {
  const [category, setCategory] = useState<any>({});

  const getCategoryDetail = async ({
    time = TIME_FILTER['24H'],
  }: {
    time?: TIME_FILTER;
  } = {}) => {
    const response = await FetchCategoryDetail({ id: props.params.id, time });
    setCategory(response);
  };

  useEffect(() => {
    getCategoryDetail();
  }, [props.params]);

  return (
    <>
      <CategoryOverview onFilter={getCategoryDetail} category={category} />
      <CategoryTable />
    </>
  );
}
