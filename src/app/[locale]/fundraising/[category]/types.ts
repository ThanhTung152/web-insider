type TLaunchpad = {
  avatarUrl: string;
  name: string;
  // more
};

type IProject = {
  name: string;
  icon: string;
  tag: string;
  isHot: boolean;
};

export type IBacker = {
  image: string;
  name: string;
  group: string;
};

export type IFundingRoundsData = {
  project: IProject;
  date: string;
  amountRaised: number;
  round: string;
  valuation: number;
  backers: IBacker[];
  category: string;
};

export type ITopBackerData = {
  name: {
    name: string;
    icon: string;
  };
  tier: number;
  type: string;
  country: string;
  investments: number;
  marketCap: {
    value: number;
    ratio: number;
  };
  resources: {
    icon: string;
  }[];

  gainers: number;
};
export type IIeoIdoData = {
  project: IProject;
  initialCap: number;
  totalRaise: number;
  backers: any[];
  category: string;
  launchpadList: TLaunchpad[];
  startedDate: string;
};

export interface IHeaderFilter {
  onChange: (...args: any) => void;
  layout: string;
}

export interface IBankerData {
  id: number;
  logo: string;
  slug: string;
  name: string;
  type: string;
  tier: number;
  location: string;
  leadRounds: number;
  raised: string;
  unicorns: number;
  gainers: number;
  links: Link[];
  introduction: string;
  invesmentCategories: string;
  totalInvesments: number;
  categories: ItemCategoryBanker[];
}

export interface ItemCategoryBanker {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface Link {
  type: string;
  value: string;
}

export interface IBankerDetail {
  data: IBankerData;
}

export interface IPortfolios {
  id: string;
  logo: Logo;
  name: string;
  ticker: string;
  rating?: any;
  price: number;
  price24hPercent: number;
  volume24h: string;
  marketCap: string;
}
interface Logo {
  native: string;
  icon: string;
  x60: string;
  x150: string;
}
