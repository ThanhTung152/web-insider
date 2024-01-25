import { Modal } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

const BackerList = ({ backers, initNumber, type }: any) => {
  const [showMore, setShowMore] = useState(false);
  const visibleItems = backers?.slice(0, initNumber);

  const handleCancel = () => {
    setShowMore(false);
  };

  return (
    <div>
      {backers && (
        <div className='flex flex-col gap-4'>
          <div className='w-full p-6 flex flex-wrap items-center justify-around gap-4'>
            {visibleItems?.map((item: any, index: any) => (
              <BackerItem key={index} item={item} />
            ))}
            {backers?.length > initNumber && (
              <button onClick={() => setShowMore(true)}>
                {' '}
                <span className='text-primary-500'>
                  + {backers?.length - initNumber} {type}
                </span>
              </button>
            )}
          </div>
          <Modal
            title={type?.toUpperCase()}
            open={showMore}
            onCancel={handleCancel}
            footer={false}
          >
            <div className='flex flex-wrap gap-5 w-full'>
              {...Array.from(Array(backers?.length).keys()).map((item) => {
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
          </Modal>
        </div>
      )}
    </div>
  );
};

export const BackerItem = ({ item  }:any) => {
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

export default BackerList;
