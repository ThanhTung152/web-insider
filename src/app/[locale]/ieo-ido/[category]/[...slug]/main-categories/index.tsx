import React from 'react';
import { CategoryDistribution } from '../../types';
import { Flex } from 'antd';
import { colorChart } from '../../config';

const MainCategories = ({ data }: { data: CategoryDistribution[] }) => {
  return (
    <Flex vertical gap={12}>
      {data.map((item, index) => (
        <Flex gap={13} key={index}>
          <span>
            <svg
              className='w-4.5 h-5 hover:w-5.5 hover:h-6'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill={colorChart[index]}
              />
            </svg>
          </span>
          <span>
            {item.name}: {item.percentage.toFixed(2)}%
          </span>
        </Flex>
      ))}
    </Flex>
  );
};

export default MainCategories;
