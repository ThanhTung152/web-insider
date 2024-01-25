import { Avatar, Flex, Tag } from 'antd';
import React from 'react';

type DataGroupProps<T = any> = {
  onClick?: () => void;
  data?: T[];
};

export default function DataGroup(props: DataGroupProps) {
  const { onClick, data } = props;

  if (!data?.length) {
    return null;
  }

  const [first, ...rest] = data;

  return (
    <Flex align='center' gap={8}>
      <Avatar size={32} src={first.image} />
      <span>{first.name}</span>
      {rest.length > 0 && (
        <Tag
          className={'bg-[#F1F4F7] cursor-pointer'}
          bordered={false}
          onClick={onClick}
        >
          +{rest.length + 1}
        </Tag>
      )}
    </Flex>
  );
}
