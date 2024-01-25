import React from 'react';

type PropsType = {
  className?: string;
};

const IconTelegram = (props: PropsType = { className: '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      {...props}
    >
      <circle cx='14' cy='14' r='14' fill='#03A8E2' />
      <path
        d='M20.9866 8.20879C21.1112 7.40332 20.3454 6.76755 19.6292 7.082L5.36482 13.3448C4.85123 13.5703 4.8888 14.3483 5.42147 14.5179L8.36315 15.4547C8.92458 15.6335 9.53253 15.541 10.0228 15.2023L16.655 10.6203C16.855 10.4821 17.073 10.7665 16.9021 10.9426L12.1281 15.8646C11.665 16.3421 11.7569 17.1512 12.314 17.5005L17.659 20.8523C18.2585 21.2282 19.0297 20.8506 19.1418 20.1261L20.9866 8.20879Z'
        fill='#F5F7FA'
      />
    </svg>
  );
};

export default IconTelegram;
