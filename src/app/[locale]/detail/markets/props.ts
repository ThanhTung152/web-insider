interface IMarket {
  exchange: IExchange;
  tier: number;
  paid: number;
  price: number;
  volume24h: number;
  ms: string;
}

interface IExchange {
  name: string;
  img: string;
}

interface IHistorical {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  marketcap: number;
}

interface ISpot {
  icon: string;
  marketShare: number;
  name: string;
  pair: number;
  tier: number;
  volume24h: number;
  price: number;
}
