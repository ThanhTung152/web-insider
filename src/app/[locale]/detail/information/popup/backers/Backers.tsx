import { Popover, Select } from 'antd';
import Image from 'next/image';

const Backers = (props: any) => {
  const backers = props.backers;
  if (!backers) return;
  if (backers.length <= 0) return;
  let backerExtend = [];
  for (let i = 0; i < backers.length; i++) {
    if (i > 2) {
      backerExtend.push(backers[i]);
    }
  }
  return (
    <div>
      {backers[0] && (
        <div>
          <p className='text-grey-500 text-sm'>Backers</p>
          <div className='flex gap-4 xl:gap-5 py-[6px]'>
            {backers[0] && (
              <img
                src={backers[0]?.logo}
                width={28}
                height={28}
                alt='backers-1'
              />
            )}
            {backers[1] && (
              <Image
                src={backers[1]?.logo}
                width={28}
                height={28}
                alt='backers-1'
              />
            )}
            {backers[2] && (
              <Image
                src={backers[2]?.logo}
                width={28}
                height={28}
                alt='backers-1'
              />
            )}
            <Popover content={<DialogBackers backers={backerExtend} />}>
              <span className='flex items-center justify-center w-7 h-7 rounded-full bg-grey-300 text-xs font-semibold text-grey-700 text-center cursor-pointer'>
                +{backers.length - 3}
              </span>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};
export function DialogBackers(props: any) {
  const backers = props.backers;
  return (
    <div className='flex flex-wrap gap-5 w-full md:max-w-[220px]'>
      {...Array.from(Array(backers.length).keys()).map((item) => {
        return (
          <img
            src={backers[item]?.logo}
            width={28}
            height={28}
            alt='backers-1'
            key={item}
          />
        );
      })}
    </div>
  );
}

export default Backers;
