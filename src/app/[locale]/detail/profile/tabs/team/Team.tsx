import CardMember from '@/components/CardMember/CardMember';

const data = [
  {
    name: 'Robert Fox',
    avatarUrl: '',
    position: 'CEO',
    twitterUrl: '/',
    linkeInUrl: '/',
    gmailUrl: '/',
    isBadge: true,
  },
  {
    name: 'Mohammad Shaikh',
    avatarUrl: '/avatar.png',
    position: 'Founder of ConsenSys, co-founder, CTO',
    twitterUrl: '/',
    linkeInUrl: '/',
    gmailUrl: '/',
    isBadge: false,
  },
  {
    name: 'Phil Hedayatnia',
    avatarUrl: '/avatar.png',
    position: 'Co-Founder and CEO of Parallax.',
    twitterUrl: '/',
    linkeInUrl: '/',
    gmailUrl: '/',
    isBadge: true,
  },
  {
    name: 'Jun Hasegawa',
    avatarUrl: '/avatar.png',
    position: 'Software developer, entrepreneur',
    twitterUrl: '/',
    linkeInUrl: '/',
    gmailUrl: '/',
    isBadge: true,
  },
];

const TeamTab = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
      {data?.map((item) => <CardMember key={item?.name} data={item} />)}
    </div>
  );
};

export default TeamTab;
