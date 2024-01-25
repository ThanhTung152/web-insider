export interface IGlobalSearch {
  categories: ICategory[];
  coins: ICoin[];
  fundraisings: IFundraising[];
  upcomings: IUpcoming[];
  trendings: ITrending[];
}

export interface IRecent {
  name: string;
  key: string;
  icon: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ICoin {
  key: string;
  rank: number;
  name: string;
  symbol: string;
  image: IImage;
  price: IPrice;
  priceChangeIn24h: number;
}
export interface IPrice {
  USD: number;
  BTC: number;
  ETH: number;
}

export interface IImage {
  native: string;
  icon: string;
  x60: string;
  x150: string;
}

export interface IFundraising {
  key: string;
  name: string;
  symbol: any;
  icon: string;
  price: IPrice;
  priceChangeIn24h: number;
}

export interface IUpcoming {
  key: string;
  name: string;
  symbol?: string;
  image: string;
  price: IPrice;
  priceChangeIn24h: number;
}

export interface ITrending {
  key: string;
  name: string;
  symbol: string;
  image: IImage;
  rank?: number;
  price: IPrice;
  priceChangeIn24h: number;
}
