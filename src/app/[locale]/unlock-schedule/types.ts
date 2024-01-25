export type TTopCoin = {
  money: string;
  date: string;
  key: string;
  symbol: string;
  image: string;
  name: string;
  price: number;
  marketcap: string | number;
};

export type TUnlockTime = {
  title: string;
  money: string;
  coins: TTopCoin[];
};

type TLaunchpad = {
  avatarUrl: string;
  // more
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

export interface IUnlock {
  key: string;
  symbol: string;
  image: string;
  name: string;
  price: string;
  marketcap: string;
  marketCap: number;
  nextunlocks: Nextunlock[];
  launchpads?: Launchpad[];
  roi?: string;
  unlockThisWeek: number;
  unlockNextWeek: number;
  priceChangeIn24h: number;
  nextTokenPrice?: number;
  nextTokenPricePercent?: number;
  nextUnlockDate?: string;
}

export interface Nextunlock {
  date: string;
  allocationTokens: number;
  allocationName: string;
  tokens: number;
}

export interface Launchpad {
  key: string;
  name: string;
  image: string;
}

export interface INextUnlock {
  nextTokenPrice?: number;
  nextTokenPricePercent?: number;
  nextUnlockDate?: string;
}
