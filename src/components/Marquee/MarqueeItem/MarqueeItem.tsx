import React from 'react';
import { IMarqueeItem } from '../props';
import { nFormatter, percentFormat, secondsToHms } from '@/helpers';
import { IconDown } from '@/assets/icons/home/header/IconDown';
import { Tooltip } from 'antd';

const MarqueeItem = ({ data }: { data: IMarqueeItem }) => {
  const _renderTextDetail = () => {
    if (!data.isGas) {
      return _renderTextNotGas();
    }
    return _renderTextGas();
  };

  const _renderTextNotGas = () => {
    return (
      <>
        <span className='text-xs leading-5 font-semibold text text-grey-700'>
          {nFormatter(Number(data.coinPrice), 2, '$')}
        </span>
        {percentFormat(
          Number(data.percent),
          'text-xs leading-5 font-semibold text'
        )}
      </>
    );
  };

  const _renderTextGas = () => {
    return (
      <span className='text-xs leading-5 font-semibold text text-grey-700'>
        {data.percent} Gwei
      </span>
    );
  };

  const _renderGwei = () => {
    console.log(data.isGas);
    if (!data.isGas || !data.child) return null;
    const elements: JSX.Element[] = data.child.map((item, index) => {
      return (
        <div key={item.id} className={`w-36 ${index === 1} pr-2 pl-2`}>
          <div className='text text-gray-400 font-semibold'>
            {item.coinName}
          </div>
          <div className='text text-black font-semibold'>
            {item.coinPrice} gwei
          </div>
          <div className='text text-gray-400 text-xs'>
            ≈{secondsToHms(item.percent)}
          </div>
        </div>
      );
    });
    return <div className='flex'>{elements}</div>;
  };

  return (
    <Tooltip
      overlayClassName='gas-tooltip'
      className={`flex items-center gap-2 xl:gap-6 md:gap-6 ${
        data.isGas ? 'gas' : ''
      }`}
      title={data.isGas ? _renderGwei() : null}
      color='white'
    >
      <div className='flex items-center gap-2'>
        {data.icon ? data.icon : ''}
        <span className='text-xs leading-5 font-semibold text text-grey-500'>
          {data.coinName}
        </span>
        {_renderTextDetail()}
      </div>
    </Tooltip>
  );
};

export default MarqueeItem;
