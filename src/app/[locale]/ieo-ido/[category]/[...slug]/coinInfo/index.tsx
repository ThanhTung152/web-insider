'use client';

import { nFormatter, percentFormat } from '@/helpers';
import { Avatar, Flex, Modal, Popover } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { IeoIdoCategory, getIconLink } from '../../config';
import { LaunchPadInfomationType } from '../../types';
import Allocation from '../allocation';
import MainCategories from '../main-categories';
import './index.scss';

type PropsType = {
  info: LaunchPadInfomationType;
};

const CoinInformation = (props: PropsType) => {
  const { info } = props;
  const _sortedCategories = useMemo(
    () =>
      info.categoriesDistribution.sort((a, b) => b.percentage - a.percentage),
    []
  );
  const { locale } = useParams<{
    locale: string;
  }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSupportedOpen, setIsModalSupportedOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal
        title={<div className='text-2xl'>Launched Project Categories</div>}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer=''
      >
        <MainCategories data={_sortedCategories} />
      </Modal>

      <Modal
        open={isModalSupportedOpen}
        onCancel={() => setIsModalSupportedOpen(false)}
        title={<div className='text-2xl'>Supported Blockchain Platforms</div>}
        footer={false}
        width={466}
      >
        <div className='max-h-[418px] overflow-y-auto mt-6'>
          <Flex vertical gap={16}>
            {info.tokenPlatforms.map((token, index) => (
              <Flex key={index} gap={12}>
                <Avatar key={token.key} src={token.iconUrl} alt={token.name} />

                <span>{token.name}</span>
              </Flex>
            ))}
          </Flex>
        </div>
      </Modal>

      <Flex
        vertical
        gap={24}
        className='shadow-primary bg-white p-4 rounded-lg md:p-6'
      >
        <Flex wrap='wrap' gap={16} className='launchpad-information'>
          <div className='w-[76px] h-[76px]'>
            <Image
              width={76}
              height={76}
              alt={info.name}
              src={info.nativeToken.icon}
              className='rounded-full'
            />
          </div>
          <div>
            <div className='flex items-center mb-3 coins__header-info'>
              <div className='coins__name text-zinc-700 text-2xl font-bold leading-loose'>
                {info.name}
              </div>
            </div>
            <div className='flex flex-wrap gap-3 items-center coins__header-tag'>
              <Link
                href={`/${locale}/ieo-ido/${IeoIdoCategory.topIdoLaunchpads}`}
                className='coins__tag'
              >
                <p className='coins__tag-text px-2 items-center'>Tier 1</p>
              </Link>

              <span className='inline-block w-[2px] relative bg-gray-500 h-[18px]'></span>

              <span className='coins__tag items-center'>
                <p>
                  Year of Foundation:
                  <span>{info.foundationDate}</span>
                </p>
              </span>

              <span className='inline-block w-[6px] h-[6px] bg-gray-500 rounded-full'></span>
              <div
                onClick={() => setIsModalSupportedOpen(true)}
                className='flex items-center avatar-wrapper'
              >
                <Avatar.Group maxCount={4}>
                  {info.tokenPlatforms.map((token, index) => (
                    <Avatar
                      key={token.key}
                      src={token.iconUrl}
                      alt={token.name}
                    />
                  ))}
                </Avatar.Group>
              </div>
            </div>
          </div>
        </Flex>
        <div className='grid gap-y-4 lg:gap-y-0 pt-[6px] border border-r-0 border-l-0 border-b-0 border-t-gray-300 lg:gap-4 lg:grid-cols-5'>
          <div className='flex flex-col gap-6 lg:col-span-3'>
            <div className='grid gap-4 md:grid-cols-2'>
              <Flex vertical gap={8}>
                <Flex align='center' gap={6}>
                  <span className='text-gray-500'>Token:</span>
                  <Image
                    width={20}
                    height={20}
                    src={info.nativeToken.icon}
                    alt={info.name}
                  />
                  <span>{info.nativeToken.symbol}</span>
                </Flex>
                <Flex gap={16} align='center'>
                  <span className='text-4xl'>
                    {nFormatter(Number(info.enterPrice), 2, '$')}
                  </span>
                  {info.priceChangeIn24h && (
                    <span className='text-base'>
                      {percentFormat(Number(info.priceChangeIn24h))}
                    </span>
                  )}
                </Flex>
              </Flex>
              <div className='grid grid-cols-2'>
                <Flex vertical gap={24}>
                  <div>
                    <p className='text-gray-500'>Total Funds Raise</p>
                    <p className='text-base'>
                      {nFormatter(Number(info.totalFundsRaised), 2, '$')}
                    </p>
                  </div>
                  <div>
                    <p className='text-gray-500'>Current Avg ROI (USD)</p>
                    <div className='text-base flex gap-1'>
                      {nFormatter(Number(info.avgRoi.current), 2, '')}x
                      <span>
                        {percentFormat(Number(info.avgRoi.currentPercent))}
                      </span>
                    </div>
                  </div>
                </Flex>
                <Flex vertical gap={24}>
                  <div>
                    <p className='text-gray-500'>Number of IDOs</p>
                    <p className='text-base'>{Number(info.projectsCount)}</p>
                  </div>
                  <div>
                    <p className='text-gray-500'>ATH Avg ROI (USD)</p>
                    <div className='text-base flex gap-1'>
                      {nFormatter(Number(info.avgRoi.ath), 2, '')}x
                      <span>
                        {percentFormat(Number(info.avgRoi.athPercent))}
                      </span>
                    </div>
                  </div>
                </Flex>
              </div>
            </div>
            <div className='coins__links'>
              <p className='coins__label text-gray-500'>Links</p>
              <div className='flex mt-2 gap-4 xl:gap-5 py-[6px]'>
                {info.links.slice(0, 3).map((item, index) => (
                  <Link target='_blank' key={index} href={item.value}>
                    {getIconLink(item.type)}
                  </Link>
                ))}

                {info.links.length > 3 && (
                  <Popover
                    trigger='click'
                    placement='bottom'
                    content={
                      <div className='flex items-center gap-5'>
                        {info.links.slice(3).map((item, index) => (
                          <Link target='_blank' key={index} href={item.value}>
                            {getIconLink(item.type)}
                          </Link>
                        ))}
                      </div>
                    }
                  >
                    <div className='w-7 h-7 bg-slate-100 rounded-3xl flex-col justify-center items-center gap-2.5 inline-flex'>
                      <div className='text-zinc-700 text-xs font-semibold leading-tight hover:cursor-pointer'>
                        +{info.links.slice(3).length}
                      </div>
                    </div>
                  </Popover>
                )}
              </div>
            </div>
          </div>
          <div
            className='lg:col-span-2 lg:border lg:border-l-gray-300 lg:border-t-0 lg:border-r-0 lg:border-b-0'
            onClick={toggleModal}
          >
            <Allocation data={_sortedCategories} />
          </div>
        </div>
      </Flex>
    </>
  );
};

export default CoinInformation;
