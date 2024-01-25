import { Popover, Select } from 'antd';
import Image from 'next/image'
import { useState } from 'react';


const ListHorizontal = (props: any) => {
  const list = props.list;
  const initSize = props.initSize || 3;
    const [showMore, setShowMore] = useState(true);
    const visibleItems = showMore ? list : list?.slice(0, initSize);
    return (
      <div className='flex flex-col gap-4'>
        <div className='w-full p-6 flex flex-wrap items-center justify-between gap-4'>
          {visibleItems?.map((item: any, index: any) => (
            <ListItem key={index} item={item} />
          ))}
        </div>
        {!showMore && list?.length > initSize && (
          <button onClick={() => setShowMore(true)}>Hiển thị thêm</button>
        )}
      </div>
    );
};
export function ExtraList(props: any) {
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

export const ListItem = ({ item  }:any) => {
  return (
    <div className='flex justify-center items-center gap-2'>
      <div className='w-12 h-12'>
              <Image src={item.logo} height={100} width={100} alt={item.name} />
      </div>
      <div>
              <p className='text-grey-700 font-semibold text-sm mb-1'>{item.name}</p>
        <div className='bg-grey-200 rounded-sm inline-block px-1'>
          <p className='text-grey-500 text-xs font-medium'>Tier 1</p>
        </div>
      </div>
    </div>
  );
};

export default ListHorizontal;
