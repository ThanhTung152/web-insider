import Image from 'next/image';

const WalletBrand = () => {
  return (
    <div className='min-w-[220px]'>
      <div className='text-base text-grey-700 font-bold font-jm pb-4 mb-4 border-b border-grey-300'>
        Wallets
      </div>
      <div className='max-h-[300px] overflow-y-auto'>
        {...Array.from(Array(4).keys()).map((item) => {
          return (
            <div
              key={item}
              className='flex flex-wrap gap-2 p-3 hover:bg-grey-300 rounded cursor-pointer'
            >
              <Image
                src='/coin-info/fox.png'
                width={24}
                height={24}
                alt='fox'
              />
              <span className='text-sm font-semibold text-grey-700'>
                Metamask
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WalletBrand;
