interface IHomeCategory {
  _id: string;
  created_at: string;
  updated_at: string;
  id: number;
  name: string;
  slug: string;
  ruName?: string;
  avgPriceChange: IAvgPriceChange;
  gainers: number;
  losers: number;
  rankedCoins: IRankedCoin[];
  isIcoList: boolean;
  market_cap: number;
  volume24h: number;
  yesterday: IYesterday;
  dominance: number;
  volumeChangeIn24h: number;
  marketCapChangeIn24h: number;
}

interface IYesterday {
  time: number;
  marketCap: number;
  volume24h: number;
  marketCapChangeIn24h: number;
  volumeChangeIn24h: number;
}
interface IRankedCoin {
  name: string;
  iconUrl: string;
  key: string;
  marketCap: number;
}
interface IAvgPriceChange {
  '24H': number;
  '7D': number;
  '14D': number;
  MTD: number;
  '30D': number;
  '3M': number;
  '6M': number;
  '1Y': number;
  '3Y': number;
  YTD: number;
  CUSTOM?: any;
}
