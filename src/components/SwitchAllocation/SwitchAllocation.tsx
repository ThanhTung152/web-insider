import React from 'react';
import { useState } from 'react';

interface Props {
  id?: number;
  title?: string;
  isActive?: boolean;
  activeColor?: string;
  onChange?: any;
}

const SwitchAllocation = ({
  id,
  isActive = false,
  onChange,
  activeColor = '',
  title = '',
}: Props) => {
  const [state, setState] = useState(isActive);

  const handleToggle = () => {
    setState(!state);
    if (onChange) {
      onChange({ id, state });
    }
  };

  return (
    <label className='relative inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        value=''
        checked={state}
        onChange={handleToggle}
        className='sr-only peer'
      />
      <div
        className={
          "w-11 h-6 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 "
        }
        style={{ backgroundColor: state ? activeColor : 'rgb(229 231 235 / 1' }}
      ></div>
      <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
        {title}
      </span>
    </label>
  );
};

export default SwitchAllocation;
