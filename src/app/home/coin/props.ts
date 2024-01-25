export interface IHomeCoin {
  _id: string;
  key: string;
  rank: number;
  name: string;
  symbol: string;
  image: Image;
  category?: string;
  icon?: any;
  price: Price;
  average24h?: any;
  volume24h: string;
  marketCap: string;
  chart: string;
}

export interface ISearchFilter {
  key: string;
  rank: number;
  name: string;
  symbol: string;
  image: Image;
  price: Price;
  id?: string;
  slug?: string;
  [key: string]: any;
}

interface AtlPrice {
  BTC: number;
  ETH: number;
  USD: number;
  dateBTC: string;
  dateETH: string;
  dateUSD: string;
}
interface HistPrices {
  YTD: Price;
  '30D': Price;
  '3M': Price;
  '6M': Price;
  '1Y': Price;
  '7D': Price;
  '24H': Price;
}
interface Price {
  USD: number;
  BTC: number;
  ETH: number;
}
interface Volatility {
  USD: number;
  ETH?: number;
  BTC?: number;
}
interface IcoData {
  allocationChart: AllocationChart[];
}
interface AllocationChart {
  title: string;
  percent: number;
}
interface AthPrice {
  BTC: number;
  ETH: number;
  USD: number;
  date: string;
  dateBTC: string;
  dateETH: string;
}

interface Vesting {
  coin_id: number;
  total_start_date: string;
  tge_start_date: string;
  links: string[];
  is_hidden: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Token {
  platformName?: string;
  platformKey?: string;
  platformSlug?: string;
  explorerUrl?: string;
  address?: string;
}
interface Image {
  native: string;
  icon: string;
  x60: string;
  x150: string;
}
interface AthMarketCap {
  USD: number;
  dateUSD: string;
}
interface RankHistory {
  h24: number;
  m3: number;
  q3: number;
  d30: number;
  MTD: number;
  d7: number;
  YTD: number;
  q2: number;
  d14: number;
  m6: number;
  y1: number;
  q1: number;
  q4: number;
}
