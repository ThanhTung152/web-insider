export interface ICountdownTimerProps {
  targetDate: Date;
  countDownName?: string;
}

export interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
}
