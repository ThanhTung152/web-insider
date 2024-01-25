import IconCheckedCompleted from '@/assets/icons/IconCheckedCompleted';
import Image from 'next/image';

const IntroduceCoin = (props: any) => {
  return (
    <div className='introduce-coin w-full md:w-[380px] font-jm'>
      <div className='flex items-center gap-3 pb-4 mb-4 border-b border-grey-300'>
        <img
          src={props.data?.image?.native}
          alt=''
          width={76}
          height={76}
          className='rounded-full'
        />
        <div className='info'>
          <div className='flex gap-1'>
            <span className='font-bold text-grey-700'>{props.data?.name}</span>
            <IconCheckedCompleted />
          </div>
          <a className='text-primary-500' href='#'>
            @{props.data?.name}
          </a>
        </div>
      </div>
      <div className='mb-6 text-sm text-grey-600'>
        Ready for a fresh start in 2023? So are we Join NanoBit Community Call
        to reflect on the past and set our sights on the future. Ready for a
        fresh start in 2023? So are we Join NanoBit Community Call to reflect on
        the past and set our sights on the future.
      </div>
      <div className='w-full flex'>
        <button
          className={`text-sm px-10 py-3 rounded-lg whitespace-nowrap btn-primary text-white mx-auto`}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default IntroduceCoin;
