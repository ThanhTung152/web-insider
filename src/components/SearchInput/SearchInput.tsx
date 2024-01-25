'use client';

import { RefObject, useEffect, useRef, useState, FC } from 'react';
import SearchResult from '../SearchResult/SearchResult';
import { ISearchInputProps } from './SearchInput.type';
import { useDebounce } from 'usehooks-ts';
import { GlobalSearchCoins } from '@/usecases/common';
import { IGlobalSearch, IRecent } from './props';
import { get, uniqBy } from 'lodash';
import { TEXT_RECENT_DATA } from '@/helpers/constants';

const SearchInput: FC<ISearchInputProps> = ({
  isButton,
  component = 'banner',
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const wrapperRef = useRef(null);
  const debouncedValue = useDebounce<string>(search, 500);
  const [data, setData] = useState<IGlobalSearch>({
    categories: [],
    coins: [],
    fundraisings: [],
    trendings: [],
    upcomings: [],
  });
  const [recents, setRecents] = useState<IRecent[]>([]);

  const useOutsideAlerter = <T extends HTMLElement>(ref: RefObject<T>) => {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsTyping(false);
        } else {
          setIsTyping(true);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    GlobalSearchCoins({ name: debouncedValue }).then((res: any) => {
      setData(res);

      if (!debouncedValue) return;

      const oneCoin = get(res, 'coins[0]', null);
      const oneTren = get(res, 'trendings[0]', null);

      if (oneCoin || oneTren) {
        recents.push({
          name: get(oneCoin ?? oneTren, 'key', null),
          key: get(oneCoin ?? oneTren, 'name', null),
          icon: get(oneCoin ?? oneTren, 'image.x60', null),
        });

        const recentData = uniqBy(recents, 'key').reverse();

        setRecents(recentData);
        localStorage.setItem(TEXT_RECENT_DATA, JSON.stringify(recentData));
      }
    });
  }, [debouncedValue]);

  useEffect(() => {
    const jsonData = localStorage.getItem(TEXT_RECENT_DATA);
    if (!jsonData) return;
    try {
      const recentData = JSON.parse(jsonData);
      setRecents(recentData);
    } catch (error) {}
  }, []);

  const _onClearRecent = () => {
    localStorage.removeItem(TEXT_RECENT_DATA);
    setRecents([]);
  };

  useOutsideAlerter(wrapperRef);

  return (
    <div>
      <form ref={wrapperRef}>
        <label
          htmlFor='search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Search
        </label>
        <div className='relative max-w-xl'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='search'
            id='search'
            autoComplete='off'
            value={search}
            onChange={(e) => handlerSearch(e)}
            onFocus={() => setIsTyping(true)}
            className={
              'block w-full pl-14 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none ' +
              (component === 'banner' ? 'rounded-full p-4' : 'rounded-lg p-3')
            }
            placeholder='Enter Coin, Token, NFT, Category...'
          />
          {isButton ? (
            <button
              className={
                'text-white absolute right-2.5 top-1/2 -translate-y-1/2 focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 py-2 search-btn ' +
                (isTyping ? 'hidden' : '')
              }
            >
              Search
            </button>
          ) : (
            ''
          )}
        </div>
        <div
          className={
            'search-preview relative max-w-xl ' + (isTyping ? '' : 'hidden')
          }
        >
          <div
            className={
              'absolute top-0 right-0 p-4 rounded-lg z-10 ' +
              (isTyping ? 'active' : '')
            }
          >
            <SearchResult
              isSearch={!!debouncedValue.length}
              data={data}
              recents={recents}
              onClearRecent={_onClearRecent}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
