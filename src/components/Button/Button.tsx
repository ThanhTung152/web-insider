'use client';

import React, { useEffect, useState } from 'react';
import { IButtonProps } from './Button.type';

const Button: React.FC<IButtonProps> = ({
  type = 'default',
  children,
  onClick,
  classProps,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const buttonClass = type === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <>
      {isClient && (
        <button
          className={`text-sm font-semibold px-5 flex justify-center gap-2 rounded-lg whitespace-nowrap ${buttonClass} ${classProps}`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};
export default Button;
