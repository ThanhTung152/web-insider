import { ReactNode } from 'react';

export interface SubCategoryLevel2 {
  id: number;
  name: string;
  icons?: ReactNode;
}
export interface SubCategoryLevel1 {
  id: number;
  name: string;
  icons?: ReactNode;
  subCateLevel2?: SubCategoryLevel2[];
}
export interface INavbarProps {
  data: {
    id: number;
    categoryName: string;
    icons?: ReactNode;
    subCateLevel1?: SubCategoryLevel1[];
  }[];
}
