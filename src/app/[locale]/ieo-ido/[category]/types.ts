type TLaunchpad = {
  image: string;
  name: string;
  key: string;
};

type IProject = {
  name: string;
  icon: string;
  tag: string;
  isHot: boolean;
};

type IBanker = {
  image: string;
  key: string;
  name: string;
  tier: number;
};

export type IUnlockData = {
  name: {
    displayName: string;
    icon: string;
    tag: string;
  };
  price: {
    ratio: number;
    value: number;
  };
  marketCap: number;
  launchpadList: TLaunchpad[];
  roi: number;
  process: {
    value: number;
    lock: {
      ratio: number;
      name: string;
      value: number;
    };
    unlock: {
      ratio: number;
      name: string;
      value: number;
    };
  };
  nextUnlock: {
    value: number;
    ratio: number;
    name: string;
    time: {
      d: number;
      h: number;
      m: number;
    };
  };
};

export type IIeoIdoData = {
  project: IProject;
  initialCap: number;
  totalRaise: number;
  backers: IBanker[];
  category: string;
  launchpadList: TLaunchpad[];
  startedDate: string;
};

export type SearchProject = {
  image: string;
  key: string;
  name: string;
  symbol: string;
};

export type ToKenPlatformType = {
  name: string;
  key: string;
  iconUrl: string;
  marketCap: number;
};

export type NativeTokenType = {
  key: string;
  name: string;
  symbol: string;
  icon: string;
};

export type AvgRoiType = {
  current: number;
  currentPercent: number;
  ath: number;
  athPercent: number;
};

export type CategoryDistribution = {
  name: string;
  count: number;
  percentage: number;
};

export type LaunchPadInfomationDataChart = {
  volumes: number[];
  times: number[];
  marketCaps: number[];
};

export type LaunchPadInfomationType = {
  name: string;
  foundationDate: string;
  tokenPlatforms: ToKenPlatformType[];
  nativeToken: NativeTokenType;
  enterPrice: string;
  priceChangeIn24h: null | number | string;
  links: { value: string; type: string }[];
  totalFundsRaised: string;
  avgRoi: AvgRoiType;
  projectsCount: number;
  avgRoiAth: number;
  categoriesDistribution: CategoryDistribution[];
  gainers: number;
  losers: number;
  marketCap: string;
  volume24h: string;
  marketCapChange: number;
  volumeChange: number;
  dataChart: LaunchPadInfomationDataChart;
  projects: { total: number; data: any[]; page: number; perPage: number };
};

export type IIeoIdoFilterType = { search_key?: string[]; is_hot?: string };
