'use client';

import { IconAddCircle, IconArrowCircleRight } from '@/assets/icons';
import Slider from 'react-slick';
import { ICoinDataProps, Props } from './Compare.type';
import './index.scss';

const CoinCompare: React.FC<ICoinDataProps> = ({ data }) => {
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
        {data?.map((item) => (
          <div key={item.id}>
            <div className='w-[97%] p-6 bg-grey-200 rounded-lg cursor-pointer'>
              <div className='flex justify-between items-center'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='44'
                    height='44'
                    viewBox='0 0 44 44'
                    fill='none'
                  >
                    <g clipPath='url(#clip0_935_51121)'>
                      <path
                        d='M43.3419 27.3202C40.4025 39.1122 28.4553 46.2804 16.6801 43.3408C4.88776 40.4014 -2.28046 28.4547 0.659117 16.6798C3.59852 4.88776 15.5284 -2.28046 27.3207 0.659118C39.0959 3.58134 46.2814 15.528 43.3419 27.3202Z'
                        fill='url(#paint0_linear_935_51121)'
                      />
                      <path
                        d='M32.4748 19.2584C32.9045 16.3365 30.6873 14.7553 27.6279 13.7068L28.6248 9.73652L26.2186 9.13496L25.2561 13.0021C24.6201 12.8475 23.967 12.6928 23.3139 12.5553L24.2764 8.6709L21.8701 8.06934L20.8904 12.0225C20.3576 11.9021 19.842 11.7818 19.3436 11.6615V11.6443L16.0092 10.8193L15.3732 13.3975C15.3732 13.3975 17.1607 13.81 17.1264 13.8271C18.1061 14.0678 18.2779 14.7209 18.2436 15.2365L17.1092 19.7568C17.1779 19.774 17.2639 19.7912 17.367 19.8428C17.2811 19.8256 17.1951 19.8084 17.1092 19.774L15.5279 26.099C15.4076 26.3912 15.0982 26.8381 14.4279 26.6662C14.4451 26.7006 12.6748 26.2365 12.6748 26.2365L11.4717 29.0037L14.617 29.7943C15.2014 29.949 15.7686 30.0865 16.3357 30.2412L15.3389 34.2459L17.7451 34.8475L18.742 30.8772C19.3951 31.049 20.0482 31.2209 20.667 31.3756L19.6873 35.3287L22.0936 35.9303L23.0904 31.9256C27.2154 32.699 30.3092 32.3897 31.5982 28.66C32.6467 25.6693 31.5467 23.9334 29.3811 22.799C30.9795 22.4381 32.1654 21.3897 32.4748 19.2584ZM26.9576 26.9928C26.2186 29.9834 21.1654 28.3678 19.5326 27.9553L20.8561 22.6443C22.4889 23.0568 27.7482 23.8647 26.9576 26.9928ZM27.7139 19.2068C27.0264 21.9397 22.8326 20.5475 21.4748 20.2037L22.6779 15.3912C24.0357 15.735 28.4186 16.3709 27.7139 19.2068Z'
                        fill='white'
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id='paint0_linear_935_51121'
                        x1='21.9881'
                        y1='-0.01056'
                        x2='21.9881'
                        y2='43.9956'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stopColor='#F9AA4B' />
                        <stop offset='1' stopColor='#F7931A' />
                      </linearGradient>
                      <clipPath id='clip0_935_51121'>
                        <rect width='44' height='44' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='flex flex-column gap-1'>
                  <svg
                    width='138'
                    height='42'
                    viewBox='0 0 138 42'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M14.0787 21.8297L6.32128 39.7929C6.00488 40.5256 5.28322 41 4.48518 41H135C136.105 41 137 40.1046 137 39V36.2075C137 35.103 136.105 34.2075 135 34.2075H134.313C133.516 34.2075 132.795 33.7344 132.478 33.0032L126.212 18.5532C125.953 17.9577 125.422 17.5246 124.787 17.3914L119.412 16.2645C118.892 16.1556 118.437 15.8444 118.147 15.3997L114.101 9.19742C113.258 7.90503 111.331 8.0137 110.639 9.39268L105.444 19.7382C105.164 20.2956 104.64 20.6905 104.028 20.8061L97.6374 22.0118C97.2231 22.09 96.7947 22.0352 96.4133 21.8554L84.8449 16.3985C84.4278 16.2018 84.0916 15.867 83.893 15.4507L77.8573 2.79736C77.3832 1.80345 76.1949 1.37976 75.199 1.84955L69.7201 4.43391C69.2577 4.65204 68.8964 5.03898 68.7104 5.51523L63.7082 18.3239C63.5112 18.8284 63.118 19.2314 62.6186 19.4408L56.4313 22.0351C56.2777 22.0995 56.1328 22.1828 55.9998 22.2832L49.3667 27.2893C48.6718 27.8137 47.7175 27.8284 47.0067 27.3255L43.1366 24.5872C42.3592 24.0372 41.3017 24.1116 40.609 24.7651L36.5264 28.6166C35.8632 29.2422 34.8609 29.3402 34.0892 28.8548L21.4881 20.9296C21.1692 20.7291 20.8001 20.6226 20.4234 20.6226H15.9148C15.1168 20.6226 14.3951 21.0971 14.0787 21.8297Z'
                      fill='url(#paint0_linear_935_51125)'
                    />
                    <path
                      d='M1 41H4.48518C5.28322 41 6.00488 40.5256 6.32128 39.7929L14.0787 21.8297C14.3951 21.0971 15.1168 20.6226 15.9148 20.6226H20.4234C20.8001 20.6226 21.1692 20.7291 21.4881 20.9296L34.0892 28.8548C34.8609 29.3402 35.8632 29.2422 36.5264 28.6166L40.609 24.7651C41.3017 24.1116 42.3592 24.0372 43.1366 24.5872L47.0067 27.3255C47.7175 27.8284 48.6718 27.8137 49.3667 27.2893L55.9998 22.2832C56.1328 22.1828 56.2777 22.0995 56.4313 22.0351L62.6186 19.4408C63.118 19.2314 63.5112 18.8284 63.7082 18.3239L68.7104 5.51523C68.8964 5.03898 69.2577 4.65204 69.7201 4.43391L75.199 1.84955C76.1949 1.37976 77.3832 1.80345 77.8573 2.79736L83.893 15.4507C84.0915 15.867 84.4278 16.2018 84.8449 16.3985L96.4133 21.8554C96.7947 22.0352 97.2231 22.09 97.6374 22.0118L104.028 20.8061C104.64 20.6905 105.164 20.2956 105.444 19.7382L110.639 9.39268C111.331 8.0137 113.258 7.90503 114.101 9.19742L118.147 15.3997C118.437 15.8445 118.892 16.1556 119.412 16.2645L124.787 17.3914C125.422 17.5246 125.953 17.9577 126.212 18.5532L132.478 33.0032C132.795 33.7344 133.516 34.2075 134.313 34.2075H137'
                      stroke='#1AB369'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <defs>
                      <linearGradient
                        id='paint0_linear_935_51125'
                        x1='69.8'
                        y1='-72.2076'
                        x2='69.088'
                        y2='41.0006'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stopColor='#45B36B' />
                        <stop offset='1' stopColor='#45B36B' stopOpacity='0' />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className='text-green-500 text-xs font-semibold'>
                    {item.percent}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className='text-grey-500 text-sm font-semibold'>
                    {item.coinName}
                  </div>
                </div>
                <div className='flex items-center justify-between gap-1'>
                  <div className='text-grey-700 text-2xl truncate'>
                    $ {item.price}
                  </div>
                  <div className='rounded px-1/2 bg-grey-200 border-solid border border-grey-300'>
                    <div className='text-grey-500 text-xs font-semibold'>
                      {item.acronym}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </RenderItemCoin>
    </div>
  );
};

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
