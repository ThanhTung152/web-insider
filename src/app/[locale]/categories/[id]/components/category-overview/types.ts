export interface ICategoryOverview {
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
  categoryVolumn: CategoryVolumn;
  coins: Coins;
}

export interface CategoryVolumn {
  marketCap: number;
  marketCapChange: number;
  volume: number;
  volumeChange: number;
  dataChart: DataChart;
}

export interface DataChart {
  volumes: number[];
  times: number[];
  marketCaps: number[];
}

export interface Coins {
  total: number;
  data: Daum[];
  page: number;
  perPage: number;
}

export interface Daum {
  _id: string;
  created_at: string;
  updated_at: string;
  key: string;
  rank: number;
  name: string;
  hasFundingRounds: boolean;
  symbol: string;
  type: string;
  rankHistory: RankHistory;
  athMarketCap: AthMarketCap;
  lifeCycle: string;
  maxSupply?: string;
  unlimitedSupply: boolean;
  totalSupply: string;
  percentOfCircSupply: string;
  image: Image;
  tokens: Token[];
  category: string;
  categoryId: string;
  tagIds: number[];
  interest: any;
  isTraded: boolean;
  marketDataNotAvailable: boolean;
  vesting: any;
  hasVesting: boolean;
  listingDate: string;
  athPrice: AthPrice;
  icoData: IcoData;
  icon: any;
  fullyDilutedMarketCap: string;
  availableSupply: string;
  marketCap: string;
  volume24h: string;
  noData: boolean;
  volatility: Volatility;
  price: Price;
  histPrices: HistPrices;
  atlPrice: AtlPrice;
  fundIds?: number[];
  chart: string;
}

export interface RankHistory {
  h24: number;
  q3: number;
  m3: number;
  YTD: number;
  d30: number;
  d7: number;
  d14: number;
  q1: number;
  MTD: number;
  y1: number;
  m6: number;
  q2: number;
  q4: number;
}

export interface AthMarketCap {
  USD: number;
  dateUSD: string;
}

export interface Image {
  native: string;
  icon: string;
  x60: string;
  x150: string;
}

export interface Token {
  platformName: string;
  platformKey: string;
  platformSlug: string;
  explorerUrl: string;
  address: string;
}

export interface AthPrice {
  BTC: number;
  ETH: number;
  USD: number;
  date: string;
  dateBTC: string;
  dateETH: string;
}

export interface IcoData {
  allocationChart: any[];
}

export interface Volatility {
  USD: number;
  ETH: number;
  BTC?: number;
}

export interface Price {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface HistPrices {
  YTD: Ytd;
  '30D': N30D;
  '3M': N3M;
  '6M': N6M;
  '1Y': N1Y;
  '7D': N7D;
  '24H': N24H;
}

export interface Ytd {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface N30D {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface N3M {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface N6M {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface N1Y {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface N7D {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface N24H {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface AtlPrice {
  BTC: number;
  ETH: number;
  USD: number;
  dateBTC: string;
  dateETH: string;
  dateUSD: string;
}
