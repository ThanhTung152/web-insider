'use client';

import { IconAddCircle, IconArrowCircleRight } from '@/assets/icons';
import Slider from 'react-slick';
import { ICoinDataProps, Props } from './Compare.type';
import './index.scss';

export function CoinCompare(props: any) {
  const data = props.data?.compare || [];
  return (
    <div className='compare bg-white p-4 mb-6 rounded-lg'>
      <div className='flex flex-wrap justify-between items-center mb-4'>
        <div className='max-w-[424px]'>
          <button className='flex items-center gap-2'>
            <IconAddCircle />
            <div className='text-sm text-blueday-500' color={'blueday.500'}>
              Add coin to compare
            </div>
          </button>
        </div>
        <div className='text-red-500 underline text-sm font-normal cursor-pointer'>
          Delete all
        </div>
      </div>
      <RenderItemCoin data={data}>
        {data?.map((item: any) => (
          <div key={item.key}>
            <div className='w-[97%] p-6 bg-grey-200 rounded-lg cursor-pointer'>
              <div className='flex justify-between items-center'>
                <div>
                  <img
                    src={item?.image?.native}
                    alt=''
                    width={40}
                    height={40}
                    className='mr-2'
                  />
                </div>
                <div className='flex flex-column gap-1'>
                  <img
                    src={`data:image/svg+xml;base64,${item.chart}`}
                    alt=''
                    width={200}
                    height={52}
                    className='mr-2'
                  />
                  {/* <div className='text-green-500 text-xs font-semibold'>
                    {item.percent}
                  </div> */}
                </div>
              </div>
              <div>
                <div>
                  <div className='text-grey-500 text-sm font-semibold'>
                    {item.name}
                  </div>
                </div>
                {/* <div className='flex items-center justify-between gap-1'>
                  <div className='text-grey-700 text-2xl truncate'>
                    $ {item.price}
                  </div>
                  <div className='rounded px-1/2 bg-grey-200 border-solid border border-grey-300'>
                    <div className='text-grey-500 text-xs font-semibold'>
                      {item.acronym}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </RenderItemCoin>
    </div>
  );
}

const NextArrow: React.FC<Props> = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <IconArrowCircleRight />
    </button>
  );
};

const PrevArrow: React.FC<Props> = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <IconArrowCircleRight />
    </button>
  );
};

const RenderItemCoin = ({ data, children }: ICoinDataProps) => {
  const settings = {
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: true,
    infinite: false,
    initialSlide: 0,
    useTransform: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (data?.length >= 5) {
    return <Slider {...settings}>{children}</Slider>;
  } else {
    return (
      <div className='grid grid-cols-[repeat(auto-fill, minmax(312px, 1fr))] gap-y-2'>
        {children}
      </div>
    );
  }
};

export default CoinCompare;
