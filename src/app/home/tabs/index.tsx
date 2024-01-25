import { useEffect, useState } from 'react';
import './style.scss';
import {
  IconCategories,
  IconCoin,
  IconGainers,
  IconTrending,
} from '@/assets/icons';
import IconFundraising from '@/assets/icons/IconFundraising';
import IconUpcomingIEOIDO from '@/assets/icons/IconUpcomingIEOIDO';
import animationData from "./icons/trending.json";
import Lottie from "lottie-react";

const data: any = [
  {
    id: 'all_coin',
    icon: <IconCoin />,
    label: 'Coins',
    isActive: false,
  },
  {
    id: 'categories',
    icon: <IconCategories />,
    label: 'Categories',
    isActive: false,
  },
  {
    id: 'gainers',
    icon: <IconGainers />,
    label: 'Gainers & Losers',
    isActive: false,
  },
  {
    id: 'trending',
    icon: <Lottie
      animationData={animationData}
    />,
    label: 'Trending',
    isActive: false,
  },
  {
    id: 'fundraising',
    icon: <IconFundraising />,
    label: 'Fundraising',
    isActive: false,
  },
  {
    id: 'upcoming',
    icon: <IconUpcomingIEOIDO />,
    label: 'Upcoming IDO/IEO',
    isActive: false,
  },
];

interface IProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const HomeTabs = ({ currentTab, setCurrentTab }: IProps) => {
  const [tabs, setTabs] = useState<any>([]);

  useEffect(() => {
    const newTabs = data.map((tab: any) => ({
      ...tab,
      isActive: tab.id === currentTab,
    }));
    setTabs(newTabs);
  }, [currentTab]);

  return (
    <>
      <div className='hide-scroll flex items-center justify-normal lg:justify-center home-tabs md:mt-8 w-full gap-6 lg:gap-9 overflow-x-auto'>
        {tabs.map((tab: any) => (
          <div
            key={tab.id}
            className={`home-tab flex items-center gap-2 cursor-pointer ${
              tab.isActive ? 'active' : ''
            }`}
            onClick={() => setCurrentTab(tab.id)}
          >
            <div className='min-w-[20px]'>{tab.icon}</div>
            <span className='text-lg lg:text-xl whitespace-nowrap'>
              {tab.label}
            </span>
          </div>
        ))}
      </div>
      <div className='flex py-6 justify-center gap-[6px]'>
        {tabs.map((tab: any) => (
          <div
            key={tab.id}
            className={`home-tab-thumb hidden lg:block ${
              tab.isActive ? 'active' : ''
            }`}
            onClick={() => setCurrentTab(tab.id)}
          ></div>
        ))}
      </div>
    </>
  );
};

export default HomeTabs;
