// TODO: write function formatter money and date
// using formatDate function format date
const unlockTimeData = [
  {
    title: 'usThisWeek',
    money: '$ 200,000,000',
    coins: [
      {
        icon: '/unlock-schedule/tia-coin.svg',
        name: 'TIA',
        money: '$ 715M',
        date: '11/11/2023',
      },
      {
        icon: '/unlock-schedule/dot-coin.svg',
        name: 'DOT',
        money: '$ 15M',
        date: '15/11/2023',
      },
      {
        icon: '/unlock-schedule/dydx-coin.svg',
        name: 'DYDX',
        money: '$ 15M',
        date: '15/11/2023',
      },
      {
        icon: '/unlock-schedule/apt-coin.svg',
        name: 'APT',
        money: '$ 15M',
        date: '15/11/2023',
      },
    ],
  },
  {
    title: 'usNextWeek',
    money: '$ 250,000,000',
    coins: [
      {
        icon: '/unlock-schedule/tia-coin.svg',
        name: 'TIA',
        money: '$ 715M',
        date: '11/11/2023',
      },
      {
        icon: '/unlock-schedule/dot-coin.svg',
        name: 'DOT',
        money: '$ 15M',
        date: '15/11/2023',
      },
      {
        icon: '/unlock-schedule/dydx-coin.svg',
        name: 'DYDX',
        money: '$ 15M',
        date: '15/11/2023',
      },
      {
        icon: '/unlock-schedule/apt-coin.svg',
        name: 'APT',
        money: '$ 15M',
        date: '15/11/2023',
      },
    ],
  },
];

export const useUnlockTime = () => {
  // TODO: handle logic here
  return {
    unlockTimeData,
  };
};
