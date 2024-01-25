import { IconExport } from '@/assets/icons';
import { Button } from 'antd';

const TierSystem = () => {
  const data = [
    {
      heading: 'Lottery',
      items: [
        'Tier 0:-',
        'Tier 1:-',
        'Tier 2:-',
        'Tier 3:-',
        'Tier 4:-',
        'Tier 5:-',
      ],
    },
    {
      heading: 'Guaranteed',
      items: ['Tier 6:-', 'Tier 7:-', 'Tier 8:-', 'Tier 9:-', 'Tier 10:-'],
    },
  ];

  return (
    <section className='grid shadow-primary bg-white p-4 rounded-lg gap-4 md:p-6 lg:px-[8.4%] lg:flex lg:gap-[113px] lg:justify-around'>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <h3>The System</h3>

        <Button disabled size='large' className='!flex items-center gap-2'>
          Resource{' '}
          <span>
            <IconExport />
          </span>
        </Button>
      </div>

      <div className='w-full h-[1px] lg:w-[1px] lg:h-auto bg-gray-300'></div>

      <div className='flex flex-col gap-8 flex-1'>
        {data.map((item, index) => (
          <div key={index}>
            <p>{item.heading}</p>
            <ul className='grid grid-cols-3'>
              {item.items.map((tier, tierIndex) => (
                <li key={tierIndex}>• {tier}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TierSystem;
