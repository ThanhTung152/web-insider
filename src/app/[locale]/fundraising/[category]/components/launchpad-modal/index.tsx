import { Avatar, Flex, Modal } from 'antd';
import React from 'react';
import { IIeoIdoData } from '../../types';
import _ from 'lodash';

type IChildrenCallback = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

type LaunchpadProps = {
  children: (props: IChildrenCallback) => React.ReactNode;
  data: IIeoIdoData['launchpadList'];
};

export default function LaunchpadModal(props: LaunchpadProps) {
  const { children, data } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  const childrenCallback: IChildrenCallback = {
    onOpen: showModal,
    onClose: handleCancel,
    isOpen,
  };

  return (
    <>
      {children(childrenCallback)}
      <Modal
        title='Launchpads'
        onCancel={handleCancel}
        centered
        open={isOpen}
        footer={null}
        styles={{
          content: {
            height: 'auto',
            overflowY: 'auto',
          },
        }}
      >
        <Flex vertical gap={16} className='mt-6'>
          {data.map((item) => (
            <Flex align='center' gap={8} key={item.name}>
              <Avatar src={item.avatarUrl} alt='avatar' size={32} />
              <span className='text-sm font-normal text-[#333747]'>
                {item.name}
              </span>
            </Flex>
          ))}
        </Flex>
      </Modal>
    </>
  );
}
