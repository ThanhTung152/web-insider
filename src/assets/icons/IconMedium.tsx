import React from 'react';

type PropsType = {
  className?: string;
};

const IconMedium = (props: PropsType = { className: '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      {...props}
    >
      <circle cx='14' cy='14' r='12.25' fill='#FF4500' />
      <path
        d='M7.62891 17.5L5.63281 20.043V20.3301H10.5547V20.043L8.57227 17.5V10.9375L12.8242 20.3301H13.4258L17.0625 10.9375V18.6484L15.5723 20.043V20.3301H22.0938V20.043L20.6445 18.6484V8.94141L22.0938 7.58789V7.25977H17.5957L14.3145 15.3125L10.6504 7.25977H5.86523V7.58789L7.62891 9.67969V17.5Z'
        fill='white'
      />
    </svg>
  );
};

export default IconMedium;
