import React from 'react';
import { Socials } from '../socials';
import { Overview } from '../overview';
import { Tabs } from 'antd';
import './index.scss';
import dynamic from 'next/dynamic';

const IEOIDODetail = dynamic(() => import('../ieoido'), { ssr: false })
const Unlock = dynamic(() => import('../unlock'), { ssr: false })
const Markets = dynamic(() => import('../markets'), { ssr: false })
const Tokenomics = dynamic(() => import('../tokenomics'), { ssr: false })
const Profile = dynamic(() => import('../profile/Profile'), { ssr: false })
const Fundraising = dynamic(() => import('../fundraising/Fundraising'), { ssr: false })


const CoinTabInfo = (props: any) => {
  const tabs = [
    {
      id: '1',
      disable: false,
      label: 'Overview',
      component: <Overview data={props.data} />,
    },
    {
      id: '2',
      disable: false,
      label: 'Markets',
      component: <Markets slug={props.slug} />,
    },
    {
      id: '3',
      disable: false,
      label: 'Profile',
      component: <Profile />,
    },
    {
      id: '4',
      disable: false,
      label: 'Fundraising',
      component: <Fundraising data={props.data} slug={props.slug} />,
    },
    {
      id: '5',
      disable: false,
      label: 'IDO/IEO',
      component: <IEOIDODetail data={props.data} slug={props.slug} />,
    },
    {
      id: '6',
      disable: false,
      label: 'Tokenomics',
      component: <Tokenomics tokenInfo={props.data} />,
    },
    {
      id: '7',
      disable: false,
      label: 'Unlock',
      component: <Unlock tokenInfo={props.data} />,
    },
    {
      id: '8',
      disable: true,
      label: 'On-Chain',
      component: '',
    },
    {
      id: '9',
      disable: false,
      label: 'Socials',
      component: <Socials />,
    },
    {
      id: '10',
      disable: true,
      label: 'Reviews',
      component: '',
    },
  ];
  return (
    <div className='detail-tab'>
      <div>
        <Tabs
          defaultActiveKey='1'
          tabPosition={'top'}
          items={tabs?.map((tab) => {
            return {
              label: tab.label,
              key: tab.id,
              disabled: tab.disable,
              children: tab.component,
            };
          })}
        />
      </div>
    </div>
  );
};

export default CoinTabInfo;
