import { ORDER } from '@/helpers/constants';

export type CategoryOverviewType = {
  _id: string;
  id: number;
  slug: string;
  name: string;
  gainers: number;
  losers: number;
  market_cap: number;
  volume24h: number;
  gainerPercent: number;
  loserPercent: number;
  categoryVolumn: {
    marketCap: string;
    marketCapChange: number;
    volume: number;
    volumeChange: number;
    dataChart: {
      volumes: number[];
      times: number[];
      marketCaps: number[];
    };
  };
};

export type CategoryCoinsFilterType = {
  category_id?: string | number;
  search_key?: string | string[];
  limit?: number;
  page?: number;
  sort_by?: string;
  sort_order?: keyof typeof ORDER;
};

export type CategoryCoinsType = {
  key: string;
  image: {
    native: string;
    icon: string;
    x60: string;
    x150: string;
  };
  name: string;
  symbol: string;
  price: {
    USD: number;
    BTC: number;
    ETH: number;
  };
  priceChangeIn24h: number;
  volume24h: string;
  marketCap: string;
  chart: string;
};

export type SearchProject = {
  id: number;
  name: string;
  slug: string;
};
