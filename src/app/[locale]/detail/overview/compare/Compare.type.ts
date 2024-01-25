import { ReactNode } from 'react';

export interface ICoinDataProps {
  data: {
    id: number;
    coinName: string;
    price: number;
    percent: string;
    acronym: string;
  }[];
  children?: ReactNode;
}
export interface Props {
  className?: string | undefined;
  onClick?: () => void;
}
