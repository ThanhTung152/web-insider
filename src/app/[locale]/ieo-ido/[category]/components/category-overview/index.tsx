import Doughnut from '@/components/DoughnutChart';
import { nFormatter, percentFormat } from '@/helpers';
import { Flex, Select } from 'antd';
import { LaunchPadInfomationType } from '../../types';
import GraphLine from '../graph-line';
import { useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { TopIdoLaunchPadDetail } from '@/usecases/ieo-ido';
import { TIME_FILTER } from '@/helpers/constants';

const filterData = [
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
  info: LaunchPadInfomationType;
};

export default function CategoryOverview(props: PropsType) {
  const params = useParams<{ slug: string[] }>();
  const [info, setInfo] = useState(props.info);
  const { losers, gainers } = info;

  const getLaunchPadDetail = useCallback(
    async (filter:any) => {
      filter.key = params.slug[0];
      filter.time = TIME_FILTER;
      const response: any = await TopIdoLaunchPadDetail(filter);

      if (response) {
        setInfo(response);
      }
    },
    []
  );

  return (
    <Flex
      vertical
      gap={24}
      className='shadow-primary bg-white p-4 rounded-lg md:p-6'
    >
      <div className='w-full flex items-center flex-wrap justify-between'>
        <h1 className='text-gray-700 text-2xl font-bold'>Overview</h1>
        <Select
          className='min-w-[90px]'
          options={filterData}
          defaultValue={filterData[0].value}
          size='large'
          onChange={(value) => getLaunchPadDetail({ time: value })}
        />
      </div>

      <div className='flex flex-wrap w-full items-stretch'>
        <div className='flex-1'>
          <div className='text-base font-medium text-[#4F4F4F]'>
            Gainers / Losers Number
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <Doughnut
              radius={65}
              data={[gainers, losers]}
              colors={['#1AB369', '#FA3363']}
              hole={45}
            />
            <div className='flex flex-col gap-2'>
              <div className='flex gap-1 items-center'>
                <span className='w-3 h-3 rounded-full bg-[#1AB369]'></span>
                <span>Gainers</span>
                <span className='text-[#1AB369]'>
                  {gainers} (
                  {nFormatter((gainers / (losers + gainers)) * 100, 2, '')}%)
                </span>
              </div>
              <div className='flex gap-1 items-center'>
                <span className='w-3 h-3 rounded-full bg-[#FA3363]'></span>
                <span>Losers</span>
                <span className='text-[#FA3363]'>
                  {losers} (
                  {nFormatter((losers / (losers + gainers)) * 100, 2, '')}%)
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
              <span>{nFormatter(Number(props.info.marketCap), 2, '$')}</span>
              <span>{percentFormat(Number(props.info.marketCapChange))}</span>
            </div>
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <GraphLine
              data={props.info.dataChart.marketCaps}
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
              <span>{nFormatter(Number(props.info.volume24h), 2, '$')}</span>
              <span>{percentFormat(Number(props.info.volumeChange))}</span>
            </div>
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <GraphLine
              data={props.info.dataChart.volumes}
              color='#FA3363'
              height={86}
              width={400}
            />
          </div>
        </div>
      </div>
    </Flex>
  );
}
