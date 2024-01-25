'use client';

import React from 'react';
import { Avatar, Divider, Popover, Tooltip } from 'antd';
import _ from 'lodash';
import IconWeb from '@/assets/icons/IconWeb';
import {
  IconDiscord,
  IconGithub,
  IconInfo,
  IconMedium,
  IconTelegram,
  IconTwitter,
} from '@/assets/icons';
import ModalChart from './modalChart';
import { IBankerDetail } from '../../../../types';
import { getFlagCountry } from '@/helpers';
import { IconTikTok } from '@/assets/icons/IconTikTok';
import { IconFacebook } from '@/assets/icons/IconFacebook';

const linksIcon = {
  web: <IconWeb />,
  twitter: <IconTwitter />,
  medium: <IconMedium />,
  telegram: <IconTelegram />,
  tiktok: <IconTikTok />,
  facebook: <IconFacebook />,
  github: <IconGithub />,
  discord: <IconDiscord />,
};

const FundraisingDetailOverview = (props: IBankerDetail) => {
  const { data } = props;
  // const params = useParams();
  // console.log(props);
  // const response = await fetchDetail('123');
  // console.log(response, 'aaa');
  // const _renderTags = () => {
  //   // data.categories.
  //   return [1, 2].map((e) => (

  //   ));
  // };

  const _renderFlag = (country: string) => {
    // const ic = getFlagCountry(data.location);
    const ic = `/Flag/Country=${country}, Style=Flag, Radius=Off.svg`;
    return (
      country? (
        <img src={ic} width={32} height={18} />
      ) : ('')
    );
  };

  const _renderLinks = () => {
    const { links } = data;
    const elements: JSX.Element[] = links?.splice(0, 3).map((link) => {
      return (
        <a href={link.value} key={link.value}>
          {linksIcon[link.type as keyof typeof linksIcon]}
        </a>
      );
    });

    return (
      <>
        <Avatar.Group
          maxCount={3}
          maxPopoverTrigger='click'
          style={{
            gap: 20,
          }}
          maxStyle={{
            color: '#333',
            backgroundColor: '#EEF2F6',
            cursor: 'pointer',
          }}
        >
          {elements}
        </Avatar.Group>
      </>
    );
  };

  return (
    <div className='w-full mx-auto'>
      <div className='overview bg-white p-6 pb-4'>
        {/* overview top */}
        <div className='flex justify-center md:justify-start pb-6 border-bottom-content'>
          <div className='flex gap-4 flex-col md:flex-row justify-center items-center'>
            <img width={76} height={76} src={data.logo} alt={data.name} />
            <div className='flex flex-col gap-3'>
              <h1 className='text-grey-700 text-center md:text-left text-2xl font-bold font-jm'>
                {data.name}
              </h1>
              <div className='flex justify-center md:justify-start item-center gap-3'>
                <div className='flex items-center gap-1'>
                  <div className='bg-grey-200 px-2 rounded'>
                    <div className='font-jm text-xs leading-5 text-grey-500'>
                      {data.type}
                    </div>
                  </div>
                  <div className='bg-grey-200 px-2 rounded'>
                    <div className='font-jm text-xs leading-5 text-grey-500'>
                      {data.tier}
                    </div>
                  </div>
                </div>

                <span className='items-center'>
                  <Popover
                    content={
                      <div className='text-right text-zinc-700 text-xs font-medium leading-tight'>
                        {data.location}
                      </div>
                    }
                    trigger='hover'
                  >
                    {_renderFlag(data.location)}
                  </Popover>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* overview body */}
        <div className='flex flex-1 flex-col-reverse md:flex-row py-2 gap-6 md:gap-0 mt-10 md:mt-0'>
          {/* body left */}
          <div className='flex flex-[2] flex-col md:flex-row gap-6 p-6 border-left-content'>
            <div className='flex-[2] flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <div className='text-sm font-jm font-medium text-grey-500'>
                  Total Investments
                </div>
                <div className='text-[40px] text-grey-700 font-bold font-jm'>
                  {data.totalInvesments}
                </div>
              </div>

              <div className='flex flex-col gap-2 md:mt-14'>
                <div className='text-xs font-medium text-grey-500 font-jm'>
                  Links
                </div>
                <div className='flex items-center gap-[20px]'>
                  {_renderLinks()}
                </div>
              </div>
            </div>
            <div className='flex-[3] flex'>
              <div className='w-full flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center'>
                    <div className='flex flex-col gap-2 flex-1'>
                      <div className='text-sm font-medium font-jm text-grey-500'>
                        Lead Rounds
                      </div>
                      <div className='text-sm text-grey-700 font-bold font-jm'>
                        {data.leadRounds}
                      </div>
                    </div>

                    <div className='flex flex-col gap-2 flex-1'>
                      <div className='text-sm font-medium text-grey-500 font-jm'>
                        Raised
                      </div>
                      <div className='text-sm text-grey-700 font-bold font-jm'>
                        {data.raised}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <div className='flex flex-col gap-2 flex-1'>
                      <div className='text-sm font-medium text-grey-500 font-jm'>
                        Unicorns
                      </div>
                      <div className='text-sm text-grey-700 font-bold font-jm'>
                        {data.unicorns}
                      </div>
                    </div>

                    <div className='flex flex-col gap-2 flex-1'>
                      <div className='text-sm font-medium text-grey-500 font-jm'>
                        Gainers
                      </div>
                      <div className='text-sm text-grey-700 font-bold font-jm'>
                        {data.gainers}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className='flex items-center gap-2'>
                    <IconInfo />
                    <span className='text-sm font-bold text-grey-700 font-jm'>
                      About
                    </span>
                  </div>

                  <div
                    className='mt-2 list-disc m-0 p-0 pl-4 text-sm text-[#4F4F4F] font-medium font-jm'
                    dangerouslySetInnerHTML={{
                      __html: data.introduction,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* body right */}
          <ModalChart data={data.categories} />
        </div>
      </div>
    </div>
  );
};

export default FundraisingDetailOverview;
