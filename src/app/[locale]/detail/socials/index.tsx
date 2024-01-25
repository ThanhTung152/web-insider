'use client';

import Image from 'next/image';
import React from 'react';
import './index.scss';
import ReactECharts from 'echarts-for-react';

export const Socials = () => {
  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        data: [820, 932, 1901, 934, 2, 2330, 1720],
        type: 'line',
        smooth: true,
        symbol: 'none',
      },
    ],
  };

  return (
    <div className='socials fade-top'>
      <div className='socials__wrapper grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
        <div className='socials-item fade-right'>
          <div className='socials-item__top flex justify-between items-center p-4'>
            <div className='brand flex items-center'>
              <Image
                src='/socials/website.png'
                alt='website'
                width={28}
                height={28}
              />
              <span className='ml-4 font-bold text-base leading-normal font-jm'>
                Website
              </span>
            </div>
            <div className='content'>
              <div className='params'>
                <span className='mr-2 font-bold text-xs leading-normal font-jeb'>
                  -
                </span>
                <span className='increment font-medium text-xs leading-normal font-jm'>
                  (-)
                </span>
              </div>
              <div className='time text-right font-medium text-xs leading-normal font-jm text-grey-500'>
                -
              </div>
            </div>
          </div>
          <div className='socials-item__content p-4'>
            <div className='visit flex justify-between items-center py-5'>
              <div className='visit-content'>
                <div className='visit__title font-medium text-sm leading-normal font-jm text-grey-500'>
                  Total Visits Last 1 Month
                </div>
                <div className='visit__number font-bold text-xl leading-normal font-jm'>
                  -
                </div>
              </div>
              <div className='visit-chart'>
                <ReactECharts option={option} />
              </div>
            </div>
            <div className='traffic flex justify-between items-center pt-5'>
              <div className='top-traffic'>-</div>
              <a
                href='https://coin98.net/'
                className='font-medium text-sm leading-normal font-jm text-grey-500'
              >
                -
              </a>
            </div>
          </div>
        </div>
        <div className='socials-item fade-zoom-out'>
          <div className='socials-item__top flex justify-between items-center p-4'>
            <div className='brand flex items-center'>
              <Image
                src='/socials/twitter.png'
                alt='twitter'
                width={28}
                height={28}
              />
              <span className='ml-4 font-bold text-base leading-normal font-jm'>
                Twitter
              </span>
            </div>
            <div className='content'>
              <div className='params'>
                <span className='mr-2 font-bold text-xs leading-normal font-jeb'>
                  -
                </span>
                <span className='increment font-medium text-xs leading-normal font-jm'>
                  (-)
                </span>
              </div>
              <div className='time text-right font-medium text-xs leading-normal font-jm text-grey-500'>
               -
              </div>
            </div>
          </div>
          <div className='socials-item__content p-4'>
            <div className='visit flex justify-between items-center py-5'>
              <div className='visit-content'>
                <div className='visit__title font-medium text-sm leading-normal font-jm text-grey-500'>
                  Followers
                </div>
                <div className='visit__number font-bold text-xl leading-normal font-jm'>
                 -
                </div>
              </div>
              <div className='visit-chart'>
                <ReactECharts option={option} />
              </div>
            </div>
            <div className='traffic flex justify-between items-center pt-5'>
              <div className='view'>
                <div className='font-medium text-sm leading-normal font-jm text-grey-500'>
                  View
                </div>
                <div className='font-bold text-sm leading-normal font-jm'>
                 -
                </div>
              </div>
              <div className='interact'>
                <div className='font-medium text-sm leading-normal font-jm text-grey-500'>
                  Interact
                </div>
                <div className='font-bold text-sm leading-normal font-jm'>
                  -
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='socials-item fade-left'>
          <div className='socials-item__top flex justify-between items-center p-4'>
            <div className='brand flex items-center'>
              <Image
                src='/socials/telegram.png'
                alt='telegram'
                width={28}
                height={28}
              />
              <span className='ml-4 font-bold text-base leading-normal font-jm'>
                Telegram Chat
              </span>
            </div>
            <div className='content'>
              <div className='params'>
                <span className='mr-2 font-bold text-xs leading-normal font-jeb'>
                  -
                </span>
                <span className='increment font-medium text-xs leading-normal font-jm'>
                  (-)
                </span>
              </div>
              <div className='time text-right font-medium text-xs leading-normal font-jm text-grey-500'>
                -
              </div>
            </div>
          </div>
          <div className='socials-item__content p-4'>
            <div className='visit flex justify-between items-center py-5'>
              <div className='visit-content'>
                <div className='visit__title font-medium text-sm leading-normal font-jm text-grey-500'>
                  Members
                </div>
                <div className='visit__number font-bold text-xl leading-normal font-jm'>
                  -
                </div>
              </div>
              <div className='visit-chart'>
                <ReactECharts option={option} />
              </div>
            </div>
            <div className='traffic flex justify-between items-center pt-5'>
              <div className='view'>
                <div className='font-medium text-sm leading-normal font-jm text-grey-500'>
                  View
                </div>
                <div className='font-bold text-sm leading-normal font-jm'>
                  -
                </div>
              </div>
              <div className='interact'>
                <div className='font-medium text-sm leading-normal font-jm text-grey-500'>
                  Interact
                </div>
                <div className='font-bold text-sm leading-normal font-jm'>
                  -
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='socials-item fade-right'>
          <div className='socials-item__top flex justify-between items-center p-4'>
            <div className='brand flex items-center'>
              <Image
                src='/socials/discord.png'
                alt='discord'
                width={28}
                height={28}
              />
              <span className='ml-4 font-bold text-base leading-normal font-jm'>
                Discord
              </span>
            </div>
            <div className='content'>
              <div className='params'>
                <span className='mr-2 font-bold text-xs leading-normal font-jeb'>
                  -
                </span>
                <span className='increment font-medium text-xs leading-normal font-jm'>
                  (-)
                </span>
              </div>
              <div className='time text-right font-medium text-xs leading-normal font-jm text-grey-500'>
                -
              </div>
            </div>
          </div>
          <div className='socials-item__content p-4'>
            <div className='visit flex justify-between items-center py-5'>
              <div className='visit-content'>
                <div className='visit__title font-medium text-sm leading-normal font-jm text-grey-500'>
                  Total Visits Last 1 Month
                </div>
                <div className='visit__number font-bold text-xl leading-normal font-jm'>
                  -
                </div>
              </div>
              <div className='visit-chart'>
                <ReactECharts option={option} />
              </div>
            </div>
            <div className='traffic flex justify-between items-center pt-5'>
              <div className='view'>
                <div className='font-medium text-sm leading-normal font-jm text-grey-500'>
                  View
                </div>
                <div className='font-bold text-sm leading-normal font-jm'>
                  -
                </div>
              </div>
              <div className='interact'>
                <div className='font-medium text-sm leading-normal font-jm text-grey-500'>
                  Interact
                </div>
                <div className='font-bold text-sm leading-normal font-jm'>
                  -
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='socials-item fade-top'>
          <div className='socials-item__top flex justify-between items-center p-4'>
            <div className='brand flex items-center'>
              <Image
                src='/socials/telegram.png'
                alt='telegram'
                width={28}
                height={28}
              />
              <span className='ml-4 font-bold text-base leading-normal font-jm'>
                Telegram Announcement
              </span>
            </div>
            <div className='content'>
              <div className='params'>
                <span className='mr-2 font-bold text-xs leading-normal font-jeb'>
                  -
                </span>
                <span className='increment font-medium text-xs leading-normal font-jm'>
                  (-)
                </span>
              </div>
              <div className='time text-right font-medium text-xs leading-normal font-jm text-grey-500'>
                -
              </div>
            </div>
          </div>
          <div className='socials-item__content p-4'>
            <div className='visit flex justify-between items-center py-5'>
              <div className='visit-content'>
                <div className='visit__title font-medium text-sm leading-normal font-jm text-grey-500'>
                  Followers
                </div>
                <div className='visit__number font-bold text-xl leading-normal font-jm'>
                  -
                </div>
              </div>
              <div className='visit-chart'>
                <ReactECharts option={option} />
              </div>
            </div>
            <div className='traffic flex justify-between items-center pt-5'>
              <div className='view'>
                <div className='font-medium text-sm leading-normal font-jm text-grey-500'>
                  View
                </div>
                <div className='font-bold text-sm leading-normal font-jm'>
                 -
                </div>
              </div>
              <div className='interact'>
                <div className='font-medium text-sm leading-normal font-jm text-grey-500'>
                  Interact
                </div>
                <div className='font-bold text-sm leading-normal font-jm'>
                 -
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='socials-item fade-left'>
          <div className='socials-item__top flex justify-between items-center p-4'>
            <div className='brand flex items-center'>
              <Image
                src='/socials/github.png'
                alt='github'
                width={28}
                height={28}
              />
              <span className='ml-4 font-bold text-base leading-normal font-jm'>
                Github
              </span>
            </div>
          </div>
          <div className='socials-item__content p-4'>
            <div className='visit flex justify-between items-center py-5'>
              <div className='visit-content'>
                <div className='visit__title font-medium text-sm leading-normal font-jm text-grey-500'>
                  Recent activity
                </div>
                <div className='visit__number font-bold text-xl leading-normal font-jm'>
                  -
                </div>
              </div>
              <Image
                src='/socials/man-working.png'
                alt='man-working'
                width={80}
                height={80}
              />
            </div>
            <div className='traffic flex justify-center items-center pt-5'>
              <a
                href='https://coin98.net/'
                className='font-medium text-sm leading-normal font-jm text-grey-500'
              >
                https://coin98.net
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
