import Image from 'next/image';
import { TUnlockTime } from '../../types';
import { currencyFormat } from '@/helpers';

type UnlockTimeProps = TUnlockTime;

export const UnlockTime = (props: UnlockTimeProps) => {
  const { title, money, coins = [] } = props;

  return (
    <div className={'us-time-card rounded flex-1'}>
      <div
        className={
          'border-b flex items-center justify-center space-x-4 py-2 px-6'
        }
      >
        <div className={'us-time-card__title'}>{title}</div>
        <div className={'us-time-card__money'}>{money}</div>
      </div>

      <div
        className={'us-time-card__body grid grid-rows-2 grid-flow-col gap-4'}
      >
        {coins.map((item, index) => (
          <div className={'coin-item space-x-2'} key={index}>
            <img src={item.image} width={24} height={24} alt={'coin-icon'} />
            <div className={'coin-item__name'}>{item.name}</div>
            <div className={'coin-item__money'}>
              {currencyFormat(Number(item.marketcap), '$')}
            </div>
            <div className={'coin-item__time'}>{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
