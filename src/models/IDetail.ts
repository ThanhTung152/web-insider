export interface IDetail {
  name: string;
  image: Image;
  symbol: string;
  rank: number;
  category: string;
  wallet: number;
  rank_coin_in_category: number;
  price: Price;
  atlPrice?: Price;
  athPrice?: Price;
  price_change_in_24h: any;
  tokens: any[];
  listingDate: string;
  idoPrice: number;
  links: any[];
  idoPriceType: string;
  public_price_change_in24h: number;
  marketCap: string;
  volume24h: string;
  volMCap24h: number;
  fdv: string;
  circ: number;
  percentOfCircSupply: string;
  totalSupply: string;
  backers: Backer[];
  chart: any;
  nextUnlock: any;
  compare: Compare[];
  header: Header;
  tags: any[];
}

export interface Image {
  native: string;
  icon: string;
  x60: string;
  x150: string;
}

export interface Price {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface Backer {
  id: number;
  slug: string;
  type: string;
  name: string;
  location: string;
  logo: string;
  tier?: number;
}

export interface Compare {
  key: string;
  rank: number;
  name: string;
  symbol: string;
  image: Image2;
  chart: string;
}

export interface Image2 {
  native: string;
  icon: string;
  x60: string;
  x150: string;
}

export interface Header {
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
  gas: Gas;
}

export interface Gas {
  low: Low;
  average: Average;
  high: High;
}

export interface Low {
  gasPriceGwei: number;
  txExecutionTime: number;
}

export interface Average {
  gasPriceGwei: number;
  txExecutionTime: number;
}

export interface High {
  gasPriceGwei: number;
  txExecutionTime: number;
}
