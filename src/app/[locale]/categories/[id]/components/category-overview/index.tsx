import Doughnut from '@/components/DoughnutChart';
import { nFormatter, percentFormat } from '@/helpers';
import { Select } from 'antd';
import { CategoryOverviewType } from '../../types';
import GraphLine from '../graph-line'; 
import { TIME_FILTER } from '@/helpers/constants';

const filterData: { label: string; value: TIME_FILTER }[] = [
  {
    label: '24h',
    value: TIME_FILTER['24H'],
  },
  {
    label: '7d',
    value: TIME_FILTER['7D'],
  },
  {
    label: '1m',
    value: TIME_FILTER['1M'],
  },
];

type PropsType = {
  category: CategoryOverviewType;
  onFilter: ({ time }: { time: TIME_FILTER }) => void;
};

export default function CategoryOverview(props: PropsType) {
  const { gainers, losers, categoryVolumn } = props.category;

  return (
    <div className='category-overview'>
      <div className='w-full flex items-center flex-wrap justify-between'>
        <h1 className='text-gray-700 text-2xl font-bold'>Currency</h1>
        <Select
          defaultValue={TIME_FILTER['24H']}
          options={filterData}
          onChange={(value) => props.onFilter({ time: value })}
          size='large'
        />
      </div>

      <div className='flex flex-wrap w-full items-stretch'>
        <div className='flex-1'>
          <div className='text-base font-medium text-[#4F4F4F]'>
            Gainers / Losers Number
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            {gainers && losers && (
              <Doughnut
                radius={65}
                data={[gainers, losers]}
                colors={['#1AB369', '#FA3363']}
                hole={45}
              />
            )}
            <div className='flex flex-col gap-2'>
              <div className='flex gap-1 items-center'>
                <span className='w-3 h-3 rounded-full bg-[#1AB369]'></span>
                <span>Gainers</span>
                <span className='text-[#1AB369]'>
                  {nFormatter((gainers / (losers + gainers)) * 100, 2, '')}%
                </span>
              </div>
              <div className='flex gap-1 items-center'>
                <span className='w-3 h-3 rounded-full bg-[#FA3363]'></span>
                <span>Losers</span>
                <span className='text-[#FA3363]'>
                  {nFormatter((losers / (losers + gainers)) * 100, 2, '')}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='w-[1px] mx-8 h-auto bg-[#E5E6EB] hidden md:block' />

        <div className='flex-1'>
          <div>
            <div className='text-base font-medium text-[#4F4F4F]'>
              Watchlist Marketcap
            </div>
            <div className='flex gap-1 items-center'>
              <span>
                {nFormatter(Number(categoryVolumn?.marketCap || 0), 2, '$')}
              </span>
              <span>
                {percentFormat(Number(categoryVolumn?.marketCapChange || 0))}
              </span>
            </div>
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <GraphLine
              data={categoryVolumn ? categoryVolumn.dataChart.marketCaps : []}
              color='#1AB369'
              height={86}
              width={400}
            />
          </div>
        </div>

        <div className='w-[1px] mx-8 h-auto bg-[#E5E6EB] hidden md:block' />

        <div className='flex-1'>
          <div>
            <div className='text-base font-medium text-[#4F4F4F]'>
              Watchlist Volume
            </div>
            <div className='flex gap-1 items-center'>
              <span>
                {nFormatter(Number(categoryVolumn?.volume || 0), 2, '$')}
              </span>
              {percentFormat(Number(categoryVolumn?.volumeChange || 0))}
            </div>
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <GraphLine
              data={categoryVolumn ? categoryVolumn.dataChart.volumes : []}
              color='#FA3363'
              height={86}
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
