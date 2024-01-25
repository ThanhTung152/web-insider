import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { PropsWithChildren } from 'react';

export type PageProps = PropsWithChildren<{
  breadcrumbs: ItemType[];
  classnames?: string;
  contentClassnames?: string;
}>;
