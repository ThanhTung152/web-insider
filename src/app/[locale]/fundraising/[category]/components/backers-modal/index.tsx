import { Avatar, Flex, Modal } from 'antd';
import React from 'react';
import _ from 'lodash';
import { IBacker } from '../../types';

type IChildrenCallback = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

type BackersModalProps = {
  children: (props: IChildrenCallback) => React.ReactNode;
  data: IBacker[];
};

export default function BackersModal(props: BackersModalProps) {
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

  const mappedData = _.groupBy(data, 'type');

  return (
    <>
      {children(childrenCallback)}
      <Modal
        title='Backers'
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
        <Flex vertical gap={24} className='mt-6'>
          {_.map(mappedData, (value, key) => {
            return (
              <Flex vertical gap={16} key={key}>
                <h4 className='font-bold text-sm text-[#333747]'>{key}</h4>
                <Flex vertical gap={16}>
                  {value.map((item) => (
                    <Flex align='center' gap={8} key={item.name}>
                      <Avatar src={item.image} alt='avatar' size={32} />
                      <span className='text-sm font-normal text-[#333747]'>
                        {item?.name || ''}
                      </span>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Modal>
    </>
  );
}
