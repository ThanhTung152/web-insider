import { Avatar, Flex, Modal } from 'antd';
import Link from 'next/link';
import React from 'react';
import { IIeoIdoData } from '../../types';
import { IeoIdoCategory } from '../../config';
import { useParams } from 'next/navigation';

type IChildrenCallback = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

type BankersModalProps = {
  children: (props: IChildrenCallback) => React.ReactNode;
  platformId: string;
  data: IIeoIdoData['backers'];
};

export default function BankersModal(props: BankersModalProps) {
  const { children, data, platformId } = props;
  const {
    category: _category = IeoIdoCategory.upcoming,
    locale,
    slug,
  } = useParams<{
    category: string;
    locale: string;
    slug: string[];
  }>();
  const category = slug ? slug[1] || IeoIdoCategory.ended : _category;
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
        {data && (
          <Flex vertical gap={24} className='mt-6'>
            {data?.map((item, index) => (
              <Link
                href={`/${locale}/ieo-ido/${IeoIdoCategory.topIdoLaunchpads}/${item.key}/${category}`}
                key={index}
                target='_blank'
                className='flex items-center gap-2 hover:cursor-pointer'
              >
                <Avatar src={item.image} alt='avatar' size={32} />
                <span className='text-sm font-normal text-[#333747]'>
                  {item.name}
                </span>
              </Link>
            ))}
          </Flex>
        )}
      </Modal>
    </>
  );
}
