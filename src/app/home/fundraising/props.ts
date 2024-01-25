export interface IFundraising {
  _id: string;
  created_at: string;
  updated_at: string;
  key: string;
  icon: string;
  name: string;
  symbol?: string;
  date: string;
  raise: string;
  stage: string;
  funds: IFund[];
  category?: ICategory2;
  hasFundingRounds: boolean;
  valuation?: string | number;
}

export interface IFund {
  name: string;
  key: string;
  image: string;
  tier?: number;
  type: string;
  category?: ICategory;
  totalInvestments: number;
}

export interface ICategory {
  id: number;
  slug: string;
  name: string;
}

export interface ICategory2 {
  name: string;
  key: string;
}
