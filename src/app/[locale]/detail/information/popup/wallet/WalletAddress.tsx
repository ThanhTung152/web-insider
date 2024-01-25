import { IconCopy } from '@/assets/icons';
import IconETH from '@/assets/icons/IconETH';
import Image from 'next/image';

const WalletAddress = (props: any) => {
  const tokens = props.tokens;
  if (!tokens) return;
  if (tokens.length <= 0) return;

    console.log('====================================');
    console.log('tokens', tokens);
    console.log('====================================');

  return (
    <div className='wallet-contract max-h-[300px] overflow-y-auto'>
      {...Array.from(Array(tokens.length).keys()).map((item) => {
        return (
          <div
            key={item}
            className='flex items-center gap-4 px-3 py-2 rounded cursor-pointer hover:bg-grey-200'
          >
            <IconETH />
            <span className='text-sm'> {tokens[item]?.platformName}</span>
            <span className='text-primary-500 max-w-[62px] lg:max-w-[124px] truncate'>
              {tokens[item]?.address}
            </span>
            <IconCopy />
            <Image src='/coin-info/fox.png' width={24} height={24} alt='fox' />
          </div>
        );
      })}
    </div>
  );
};

export default WalletAddress;
