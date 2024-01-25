'use client';

import SwitchAllocation from '@/components/SwitchAllocation/SwitchAllocation';
import './index.scss';
import { COLOR_CHART } from '@/helpers/constants';
import ReactECharts from 'echarts-for-react';
import { useState } from 'react';

interface IAllocation {
  id?: number;
  title?: string;
  isActive?: boolean;
  activeColor?: string;
}

export default function Chart(props: any) {
  const optionPie = {
    color: [
      COLOR_CHART.BITTER_LEMON,
      COLOR_CHART.MALACHITE,
      COLOR_CHART.PAOLO_VERONESE_GREEN,
      COLOR_CHART.TURQUOISE_SURF,
      COLOR_CHART.CERULEAN_FROST,
      COLOR_CHART.PLUMP_PURPLE,
      COLOR_CHART.PURPUREUS,
      COLOR_CHART.JAZZBERRY_JAM,
      COLOR_CHART.CERISE,
      COLOR_CHART.SUNSET_ORANGE,
    ],
    series: [
      {
        name: 'Token ABC',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 3,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 40 },
          { value: 20 },
          { value: 10 },
          { value: 15 },
          { value: 15 },
          { value: 15 },
          { value: 15 },
          { value: 15 },
          { value: 15 },
          { value: 15 },
        ],
      },
    ],
  };

  const optionStackArea = {
    color: [
      COLOR_CHART.BITTER_LEMON,
      COLOR_CHART.MALACHITE,
      COLOR_CHART.PAOLO_VERONESE_GREEN,
      COLOR_CHART.TURQUOISE_SURF,
      COLOR_CHART.CERULEAN_FROST,
      COLOR_CHART.PLUMP_PURPLE,
      COLOR_CHART.PURPUREUS,
      COLOR_CHART.JAZZBERRY_JAM,
      COLOR_CHART.CERISE,
      COLOR_CHART.SUNSET_ORANGE,
    ],
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Private',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Seed Round',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Strategic Round',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Public Round',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'Team',
        type: 'line',
        stack: 'Total',
        label: {
          show: false,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
      {
        name: 'Airdrops',
        type: 'line',
        stack: 'Total',
        label: {
          show: false,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
      {
        name: 'Marketing',
        type: 'line',
        stack: 'Total',
        label: {
          show: false,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
      {
        name: 'Advisors',
        type: 'line',
        stack: 'Total',
        label: {
          show: false,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
      {
        name: 'Foundation',
        type: 'line',
        stack: 'Total',
        label: {
          show: false,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
      {
        name: 'Ecosystem',
        type: 'line',
        stack: 'Total',
        label: {
          show: false,
          position: 'top',
        },
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };

  const [listAllocation] = useState<IAllocation[]>([
    {
      id: 1,
      title: 'Private',
      isActive: true,
      activeColor: COLOR_CHART.BITTER_LEMON,
    },
    {
      id: 2,
      title: 'Seed Round',
      isActive: true,
      activeColor: COLOR_CHART.MALACHITE,
    },
    {
      id: 3,
      title: 'Strategic Round',
      isActive: true,
      activeColor: COLOR_CHART.PAOLO_VERONESE_GREEN,
    },
    {
      id: 4,
      title: 'Public Round',
      isActive: true,
      activeColor: COLOR_CHART.TURQUOISE_SURF,
    },
    {
      id: 5,
      title: 'Team',
      isActive: true,
      activeColor: COLOR_CHART.CERULEAN_FROST,
    },
    {
      id: 6,
      title: 'Airdrops',
      isActive: true,
      activeColor: COLOR_CHART.PLUMP_PURPLE,
    },
    {
      id: 7,
      title: 'Marketing',
      isActive: true,
      activeColor: COLOR_CHART.PURPUREUS,
    },
    {
      id: 8,
      title: 'Advisors',
      isActive: true,
      activeColor: COLOR_CHART.JAZZBERRY_JAM,
    },
    {
      id: 9,
      title: 'Foundation',
      isActive: true,
      activeColor: COLOR_CHART.CERISE,
    },
    {
      id: 10,
      title: 'Ecosystem',
      isActive: true,
      activeColor: COLOR_CHART.SUNSET_ORANGE,
    },
  ]);

  const handler = (e: { id: string; isActive: boolean }) => {
    console.log('e', e);
  };

  return (
    <div className='token grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <div className='allocation'>
        <div className='text-grey-700 text-sm font-bold font-jb mb-5'>
          Token ABC
        </div>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='relative'>
            <ReactECharts option={optionPie} />
            <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center'>
              <div className='text-grey-700 text-xl font-jm font-medium'>
                StableCoins
              </div>
              <div className='text-grey-500 text-sm font-jm font-medium'>
                60%
              </div>
            </div>
          </div>
          <div className='note'>
            {listAllocation && listAllocation.length > 0
              ? listAllocation.map((item) => {
                  return (
                    <div
                      className='flex items-center justify-between gap-4 mb-6'
                      key={item.id}
                    >
                      <SwitchAllocation
                        id={item.id}
                        isActive={item.isActive}
                        title={item.title}
                        activeColor={item.activeColor}
                        onChange={(e: any) => handler(e)}
                      />
                      <div className='flex items-center justify-between gap-4'>
                        <div className='text-grey-700 text-medium text-xs'>
                          NBIT 1.85B
                        </div>
                        <div className='text-grey-500 text-medium text-xs'>
                          25.32%
                        </div>
                      </div>
                    </div>
                  );
                })
              : 'Không có dữ liệu'}
          </div>
        </div>
      </div>
      <div className='vesting-schedule'>
        <div className='flex items-center justify-between'>
          <div className='text-grey-700 text-sm font-bold font-jb'>
            Release Schedule
          </div>
          <div className='text-grey-700 text-sm font-bold font-jb'>
            Today, 21 Apr 2023
          </div>
        </div>
        <ReactECharts option={optionStackArea} />
      </div>
    </div>
  );
}
