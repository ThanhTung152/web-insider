interface ITokenomics {
  id: number;
  name: string;
  tokens_percent: number;
  tokens: number;
  unlock_type: string;
  unlock_frequency_type: string;
  unlock_frequency_value: number;
  vesting_duration_type: string;
  vesting_duration_value: number;
  round_date: Date;
  isActive: boolean;
  activeColor:string
  batches: [
    {
      date: Date;
      is_tge: boolean;
      unlock_percent: number;
    },
  ];
}

interface IRound {
  color: string;
  label: string;
}
