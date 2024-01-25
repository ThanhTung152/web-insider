import { ReactNode } from 'react';

export interface IMarquee {
  _id: string;
  created_at: string;
  updated_at: string;
  allCurrencies: string;
  btcDominanceChangePercent: string;
  totalVolume24h: string;
  totalMarketCapChangePercent: string;
  totalVolume24hChangePercent: string;
  btcDominance: string;
  totalMarketCap: string;
  gas: IGas;
}

export interface IGas {
  low: ILow;
  average: IAverage;
  high: IHigh;
}

export interface ILow {
  gasPriceGwei: number;
  txExecutionTime: number;
}

export interface IAverage {
  gasPriceGwei: number;
  txExecutionTime: number;
}

export interface IHigh {
  gasPriceGwei: number;
  txExecutionTime: number;
}

export interface IMarqueeItem {
  id: number;
  coinName: string;
  coinPrice: string | number;
  percent: string | number;
  icon?: string | ReactNode;
  child?: IMarqueeItem[];
  isGas?: boolean;
}
