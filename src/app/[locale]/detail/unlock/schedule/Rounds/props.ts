interface ITotalUnlockProgress {
  totalRemainingTime: Date;
  totalUnlockedPercent: number;
  totalUnlockedToken: number;
  totalUnlockedValue: number;
  totalLockedPercent: number;
  totalLockedToken: number;
  totalLockedValue: number;
  totalNextUnlockPercent: number;
  totalNextUnlockToken: number;
  totalNextUnlockValue: number;
  remainingTime: Date;
  percentOfMarketCap: number;
}

interface IUnlock {
  name: string;
  allocation: number;
  allocationPercent: number;
  unlockedPercent: number;
  startDate: Date;
  lockedPercent: number;
  endDate: Date;
  tgeUnlockPercent: number;
  tgeUnlockToken: number;
  nextUnlockPercent: number;
  nextUnlockToken: number;
  nextUnlockValue: number;
  timer: Date;
}
