import {
  IconArrowRight,
  IconEmail,
  IconLinkedIn,
  IconTwitter,
  IconVerifiedBadge,
} from '@/assets/icons';
import Link from 'next/link';
import React from 'react';
import { ICardMemberProps } from './CardMember.type';
import './index.scss';
import Image from 'next/image';

const CardMember: React.FC<ICardMemberProps> = ({ data }) => {
  return (
    <div className='card-member p-4 border border-solid border-grey-300 rounded-lg'>
      <div className='flex items-center gap-2 overflow-hidden'>
        {data?.avatarUrl && (
          <Image
            width={86}
            height={86}
            src={data?.avatarUrl}
            alt={data?.name}
          />
        )}
        <div>
          <div>
            <div className='flex items-center gap-1'>
              <div className='truncate'>{data?.name}</div>
              {data?.isBadge && <IconVerifiedBadge />}
            </div>
            <div className='truncate max-w-[250px]'>{data?.position}</div>
          </div>
          <ul className='flex m-0 p-0 items-center gap-4'>
            <li>
              <Link href={data?.twitterUrl}>
                <IconTwitter />
              </Link>
            </li>
            <li>
              <Link href={data?.linkeInUrl}>
                <IconLinkedIn />
              </Link>
            </li>
            <li>
              <Link href={data?.gmailUrl}>
                <IconEmail />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Link className='link-detail' href={'/'}>
        Detail
        <IconArrowRight />
      </Link>
    </div>
  );
};

export default CardMember;
