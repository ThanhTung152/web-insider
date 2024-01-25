'use client';

import { useState } from 'react';
import AboutTab from './tabs/about/About';
// import TeamTab from './tabs/team/Team';
import './index.scss';
import Updating from './Updating';

const Profile = () => {
  const tabs = [
    {
      id: 1,
      disable: false,
      label: 'About',
      component: <AboutTab />,
    },
    {
      id: 2,
      disable: false,
      label: 'Team',
      component: <Updating />,
    },
    {
      id: 3,
      disable: false,
      label: 'Advisors',
      component: <Updating />,
    },
    {
      id: 4,
      disable: false,
      label: 'Unique Selling Proposition (USP)',
      component: <Updating />,
    },
    {
      id: 5,
      disable: false,
      label: 'Partners',
      component: <Updating />,
    },
  ];
  const [active, setActive] = useState<number>(1);
  const activeTab = (id: number) => {
    setActive(id);
  };
  const renderTableContent = () => {
    return tabs[active - 1]?.component;
  };

  return (
    <div className='profile p-6 rounded-lg fade-top'>
      <div className='bh-white flex flex-wrap gap-4 border-b border-grey-300 mb-4 pb-4'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => activeTab(tab.id)}
            className={
              'w-auto h-auto rounded-xl py-3 px-5 gap-2 cursor-pointer ' +
              (tab.id === active
                ? 'bg-gradient-to-b from-blue-500 to-indigo-900 text-white'
                : 'border')
            }
          >
            <p>{tab?.label}</p>
          </div>
        ))}
      </div>
      {renderTableContent()}
    </div>
  );
};

export default Profile;
