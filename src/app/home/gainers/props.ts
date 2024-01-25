export interface IGainer {
  _id: string;
  created_at: string;
  updated_at: string;
  key: string;
  rank: number;
  name: string;
  hasFundingRounds: boolean;
  symbol: string;
  type: string;
  rankHistory: IRankHistory;
  athMarketCap: IAthMarketCap;
  lifeCycle: string;
  unlimitedSupply: boolean;
  maxSupply?: string;
  totalSupply: string;
  percentOfCircSupply: string;
  image: IImage;
  tokens: IToken[];
  category: string;
  categoryId: number;
  tagIds: number[];
  fundIds?: number[];
  interest: any;
  isTraded: boolean;
  marketDataNotAvailable: boolean;
  vesting?: string;
  hasVesting: boolean;
  listingDate: string;
  athPrice: IAthPrice;
  icoData: IIcoData;
  icoFullyDilutedMarketCap?: string;
  fullyDilutedMarketCap: string;
  availableSupply: string;
  marketCap: string;
  volume24h: string;
  noData: boolean;
  volatility: IVolatility;
  price: IPrice;
  histPrices: IHistPrices;
  atlPrice: IAtlPrice;
  icoStatus?: string;
  initialSupply?: string;
  initialMarketCap?: string;
  average24: any;
}

export interface IRankHistory {
  m3?: number;
  q3?: number;
  h24: number;
  d30?: number;
  y1?: number;
  YTD: number;
  d14: number;
  MTD: number;
  d7: number;
  q1?: number;
  q4: number;
  m6?: number;
  q2?: number;
}

export interface IAthMarketCap {
  USD: number;
  dateUSD: string;
}

export interface IImage {
  native: string;
  icon: string;
  x60: string;
  x150: string;
}

export interface IToken {
  platformName: string;
  platformKey: string;
  platformSlug: string;
  explorerUrl: string;
  address: string;
}

export interface IAthPrice {
  BTC: number;
  ETH: number;
  USD: number;
  date: string;
  dateBTC: string;
  dateETH: string;
}

export interface IIcoData {
  allocationChart: IAllocationChart[];
}

export interface IAllocationChart {
  title: string;
  percent: number;
}

export interface IVolatility {
  USD?: number;
  BTC?: number;
  ETH?: number;
}

export interface IPrice {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface IHistPrices {
  '3M'?: IN3M;
  '6M'?: IN6M;
  '7D': IN7D;
  '24H': IN24H;
  YTD: IYtd;
  '1Y'?: IN1Y;
  '30D'?: IN30D;
}

export interface IN3M {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface IN6M {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface IN7D {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface IN24H {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface IYtd {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface IN1Y {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface IN30D {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface IAtlPrice {
  BTC: number;
  ETH: number;
  USD: number;
  dateBTC: string;
  dateETH: string;
  dateUSD: string;
}
