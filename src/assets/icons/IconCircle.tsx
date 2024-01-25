import { FC } from 'react';

interface IColor {
  color?: string;
}

const IconCircle: FC<IColor> = ({ color = '#F7931A' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='13'
      height='12'
      viewBox='0 0 13 12'
      fill='none'
    >
      <circle cx='6.5' cy='6' r='6' fill={color} />
    </svg>
  );
};

export default IconCircle;
