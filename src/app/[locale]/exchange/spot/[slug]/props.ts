export interface ICoinInfo {
  coinsCount: number;
  country: string;
  fees: string;
  financialReserves: number;
  icon: string;
  links: ILink[];
  marketShare: number;
  name: string;
  nativeCoin: NativeCoin;
  pairsCount: number;
  spotTradingVolume: Volume;
  tier: number;
  tokenAllocation: CoinAllocation[];
  totalUsdVolume: number;
  yearOfFoundation: string;
}

export interface CoinAllocation {
  changePercent: number;
  coinKey: string;
  coinName: string;
  exchangePercentVolume: number;
  percentUsdVolume: number;
  symbol: string;
  usdLast: number;
  usdVolume: number;
}

export interface ICoinTable {
  key: string;
  logo: string;
  name: string;
  pair: string;
  price: number;
  priceChangeIn24h: number;
  rate: string;
  ticker: string;
  volume: number;
  volumeChangeIn24h: number;
}

interface DataChart {
  openInterests: [];
  timestamps: [];
  volumes: number[];
}

interface Volume {
  btc: number;
  percent: number;
  usd: number;
}

interface ToOtherTypeCoin {
  toBTC: number;
  toETH: number;
  toUSD: number;
}

export interface ILink {
  type: string;
  value: string;
}

interface NativeCoin {
  key: string;
  logo: string;
  name: string;
}
