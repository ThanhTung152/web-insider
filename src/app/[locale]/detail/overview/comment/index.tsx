'use client';

import Image from 'next/image';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

const CommentAction = () => {
  const [comment, setComment] = useState<string>('');

  const handlerComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('enter press here! ');
    }
  };

  return (
    <div className='flex gap-2 items-center'>
      <div className='avatar'>
        <Image src='/avatar.png' width={40} height={40} alt='avatar' />
      </div>
      <form className='w-full'>
        <label
          htmlFor='comment'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Comment
        </label>
        <div className='relative max-w-xl'>
          <input
            type='text'
            id='comment'
            autoComplete='off'
            value={comment}
            onChange={(e) => handlerComment(e)}
            onKeyDown={(e) => handleKeyPress(e)}
            className='block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 bg-white outline-none'
            placeholder='Enter Coin, Token, NFT, Category...'
          />
          <button className={'absolute right-3 top-1/2 -translate-y-2/4'}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2C9.34784 2 6.8043 3.05357 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.8043 20.9464 9.34784 22 12 22ZM8.25 10.75C8.58152 10.75 8.89946 10.6183 9.13388 10.3839C9.3683 10.1495 9.5 9.83152 9.5 9.5C9.5 9.16848 9.3683 8.85054 9.13388 8.61612C8.89946 8.3817 8.58152 8.25 8.25 8.25C7.91848 8.25 7.60054 8.3817 7.36612 8.61612C7.1317 8.85054 7 9.16848 7 9.5C7 9.83152 7.1317 10.1495 7.36612 10.3839C7.60054 10.6183 7.91848 10.75 8.25 10.75ZM17 9.5C17 9.83152 16.8683 10.1495 16.6339 10.3839C16.3995 10.6183 16.0815 10.75 15.75 10.75C15.4185 10.75 15.1005 10.6183 14.8661 10.3839C14.6317 10.1495 14.5 9.83152 14.5 9.5C14.5 9.16848 14.6317 8.85054 14.8661 8.61612C15.1005 8.3817 15.4185 8.25 15.75 8.25C16.0815 8.25 16.3995 8.3817 16.6339 8.61612C16.8683 8.85054 17 9.16848 17 9.5ZM16.42 16.4187C16.5361 16.3026 16.6281 16.1648 16.6909 16.013C16.7537 15.8613 16.7859 15.6987 16.7859 15.5346C16.7858 15.3704 16.7534 15.2078 16.6905 15.0561C16.6277 14.9045 16.5355 14.7667 16.4194 14.6506C16.3032 14.5346 16.1654 14.4425 16.0137 14.3797C15.862 14.317 15.6994 14.2847 15.5352 14.2847C15.371 14.2848 15.2084 14.3172 15.0568 14.3801C14.9051 14.443 14.7673 14.5351 14.6513 14.6513C13.948 15.3543 12.9944 15.7492 12 15.7492C11.0056 15.7492 10.052 15.3543 9.34875 14.6513C9.11437 14.4167 8.7964 14.2849 8.46482 14.2847C8.13323 14.2846 7.81518 14.4162 7.58063 14.6506C7.34607 14.885 7.21424 15.203 7.21412 15.5346C7.214 15.8661 7.34562 16.1842 7.58 16.4187C8.16039 16.9993 8.84945 17.4598 9.60785 17.774C10.3662 18.0882 11.1791 18.2499 12 18.2499C12.8209 18.2499 13.6338 18.0882 14.3922 17.774C15.1505 17.4598 15.8396 16.9993 16.42 16.4187Z'
                fill='#9FA4B7'
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

const CommentText = () => {
  return (
    <div className='flex gap-2 w-full'>
      <div className='avatar'>
        <Image src='/avatar.png' width={40} height={40} alt='avatar' />
      </div>
      <div className='content w-full bg-grey-200 rounded-lg p-3'>
        <div className='content__header flex justify-between gap-3 mb-1'>
          <div className='user-name text-grey-700 font-bold text-sm font-jeb'>
            Name
          </div>
          <div className='action cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z'
                fill='#333747'
              />
              <path
                d='M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z'
                fill='#333747'
              />
              <path
                d='M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z'
                fill='#333747'
              />
            </svg>
          </div>
        </div>
        <p className='content__description text-grey-600 font-medium text-sm font-jm'>
          I bought the app maybe a month ago to not have a watermark and ads,
          but it has been crashing a lot lately, maybe every 2 minutes of me
          trying to edit. It is also saying there was video conversion failure
          and a pop up saying audio processing failed, giving me an option to
          send audio logs and such to them in email but I got an email back
          saying that their inbox reached full capacity and inactive. The app
          was great! What happened? Please help.
        </p>
      </div>
      <div className='action'></div>
    </div>
  );
};

export default function Comments() {
  return (
    <div className='comments pb-16'>
      <div className='comments__wrapper bg-white p-6 rounded-lg'>
        <h3 className='comment__wrapper__title border-b border-grey-300 border-solid text-grey-700 font-bold text-sm font-jeb mb-6 pb-6'>
          Comment
        </h3>
        <div className='comments__wrapper__action mb-6'>
          <CommentAction />
        </div>
        <div className='comments__wrapper__filter mb-6'>Most Relevent</div>
        <div className='comments__wrapper__list-comment'>
          <CommentText />
        </div>
      </div>
    </div>
  );
}
