const Calendar = ({ date }: any) => {
  const nDate = new Date(date||Date.now());
const month = nDate.toLocaleString('default', { month: 'short' });
  return (
    <div className='w-[70px] max-w-[70px] min-w-[70px] shadow-[0_0_8.5px_0_rgba(51,55,71,0.15)] rounded-lg overflow-hidden'>
      <div className='bg-primary-500 text-white text-center relative p-1 text-xs font-semibold'>
        <div className='absolute top-[5px] left-[5px] w-[5px] h-[5px] bg-white rounded-full'></div>
        <div className='absolute top-[5px] right-[5px] w-[5px] h-[5px] bg-white rounded-full'></div>
        {month}
      </div>
      <div className='bg-white text-center p-1'>
        <div className='text-3xl font-bold font-jb'>{nDate?.getDate()}</div>
        <div className='text-xs font-semibold font-jsb'>
          {nDate?.getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
