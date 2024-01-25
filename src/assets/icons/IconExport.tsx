import React from 'react';

type PropsType = {
  className?: string;
};

const IconExport = (props: PropsType = { className: '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      {...props}
    >
      <path
        d='M10.833 9.16671L17.6663 2.33337'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.333 5.66663V1.66663H14.333'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.16699 1.66663H7.50033C3.33366 1.66663 1.66699 3.33329 1.66699 7.49996V12.5C1.66699 16.6666 3.33366 18.3333 7.50033 18.3333H12.5003C16.667 18.3333 18.3337 16.6666 18.3337 12.5V10.8333'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default IconExport;
