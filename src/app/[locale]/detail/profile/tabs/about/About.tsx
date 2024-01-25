import {
  IconAddress,
  IconCalendar,
  IconEmployees,
  IconEye,
  IconUser,
} from '@/assets/icons';
import React from 'react';
import './index.scss';

const AboutTab = () => {
  return (
    <div className='block md:flex'>
      <div className='w-full mb-4 pb-4 border-b border-grey-300 md:border-b-0 md:max-w-[330px] md:border-r mr-4 pr-4 xl:mr-[63px] xl:pr-[63px]'>
        <div className='font-bold text-base text-primary-500 mb-5 md:mb-6'>
          Information
        </div>
        <div>
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='flex items-center gap-1'>
              <IconUser />
              <div className='font-bold font-jb text-sm text-grey-700'>CEO</div>
            </div>
            <div className='font-medium text-sm text-grey-700'>Updating...</div>
          </div>
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='flex items-center gap-1'>
              <IconEmployees />
              <div className='font-bold font-jb text-sm text-grey-700'>
                Employees
              </div>
            </div>
            <div className='font-medium text-sm text-grey-700'>Updating...</div>
          </div>
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='flex items-center gap-1'>
              <IconAddress />
              <div className='font-bold font-jb text-sm text-grey-700'>
                Address
              </div>
            </div>
            <div className='font-medium text-sm text-grey-700'>Updating...</div>
          </div>
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='flex items-center gap-1'>
              <IconCalendar />
              <div className='font-bold font-jb text-sm text-grey-700'>
                Founded
              </div>
            </div>
            <div className='font-medium text-sm text-grey-700'>Updating...</div>
          </div>
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='flex items-center gap-1'>
              <IconEye />
              <div className='font-bold font-jb text-sm text-grey-700'>
                Views
              </div>
            </div>
            <div className='font-medium text-sm text-grey-700'>Updating...</div>
          </div>
        </div>
      </div>
      <div className='about-right-content'>
        <div className='font-bold text-base text-primary-500 mb-6'>
          Introduction
        </div>
        <div className='text-grey-700 text-sm font-medium'>{`Updating...`}</div>
      </div>
    </div>
  );
};

export default AboutTab;
