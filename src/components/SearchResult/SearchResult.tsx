import Image from 'next/image';
import React, { memo } from 'react';
import './index.scss';
import { IGlobalSearch, IRecent } from '../SearchInput/props';
import { nFormatter, percentFormat } from '@/helpers';
import { IconRecent } from '@/assets/icons/home/IconRecent';
import { notFound } from 'next/navigation';
import { get } from 'lodash';

const SearchResult = ({
  data,
  recents,
  isSearch,
  onClearRecent,
}: {
  data: IGlobalSearch;
  recents: IRecent[];
  isSearch: boolean;
  onClearRecent: () => void;
}) => {
  const _renderTrending = () => {
    const { trendings } = data;
    if (!trendings) return null;

    const elements: JSX.Element[] = [];
    trendings.forEach((e) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${e.key}`}
        >
          <div className='coin p-2 flex justify-between items-center'>
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img src={e.image.x60} width={32} height={32} alt={e.name} />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  <div className='coin-tag text-xs font-medium font-jm'>
                    {e.key}
                  </div>
                </div>
                {/* <div className='coin-info__content__price'>
                  <span className='price text-xs font-medium font-jm'>
                    {nFormatter(e.price['USD'])}
                  </span>
                  <span className='percent text-xs font-medium font-jm'>
                    +21.45%
                  </span>
                </div> */}
              </div>
            </div>
            <div className='number-of-coin text-xs font-medium font-jm'>#1</div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item trending-today mb-4'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Trending Today
          <Image src='/rocket.png' width={20} height={20} alt='rocket' />
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderCrypto = () => {
    const { coins } = data;
    if (!coins || !coins.length) return;
    const elements: JSX.Element[] = [];

    coins.forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div className='coin p-2 flex justify-between items-center'>
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img src={e.image.x60} width={32} height={32} alt={e.name} />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                  <div className='coin-tag text-xs font-medium font-jm'>
                    {e.key}
                  </div>
                </div>
                <div className='coin-info__content__price flex items-center'>
                  <span className='price text-xs font-medium font-jm'>
                    {nFormatter(e.price.USD, 2, '$')}
                  </span>
                  <span className='price text-xs font-medium font-jm'>
                    {e.priceChangeIn24h
                      ? percentFormat(e.priceChangeIn24h)
                      : ''}
                  </span>
                </div>
              </div>
            </div>
            {e.rank ? (
              <div className='number-of-coin text-xs font-medium font-jm'>
                #{e.rank}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Coins
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderRecent = () => {
    const elements: JSX.Element[] = [];

    recents.forEach((r, i) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded'
          key={`m-${i}`}
        >
          <div className='coin p-1 flex'>
            <div className='coin-info flex flex-col items-center'>
              <div className='coin-info__image mb-2'>
                <img src={r.icon} width={32} height={32} alt='btc' />
              </div>
              <div className='coin-info__name textover-ellipsis w-20 text-center'>
                {r.name}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item recents'>
        <div className='flex justify-between'>
          <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
            Recent
            <IconRecent />
          </div>
          <div
            className='text-primary-400 text-md cursor-pointer'
            onClick={onClearRecent}
          >
            Clear
          </div>
        </div>
        <div className='modal-search-item__list flex flex-wrap'>{elements}</div>
      </div>
    );
  };

  const _returnNotFound = () => {
    return <>No results found </>;
  };

  const _renderCategory = () => {
    const elements: JSX.Element[] = [];
    const { categories } = data;
    if (!categories.length) return;
    categories.forEach((c, i) => {
      elements.push(
        <div key={c.id} className='pl-4 pr-4 pt-1 pb-1'>
          <p className='text-sm'>{c.name}</p>
        </div>
      );
    });
    return (
      <div className='modal-search-item cryptoassets mb-4 mt-4'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Category
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderUpcoming = () => {
    const { upcomings } = data;
    if (!upcomings || !upcomings.length) return;
    const elements: JSX.Element[] = [];

    upcomings.forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div className='coin p-2 flex justify-between items-center'>
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img src={e.image} width={32} height={32} alt={e.name} />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Upcomings
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderFuncraising = () => {
    const { fundraisings } = data;
    if (!fundraisings || !fundraisings.length) return;
    const elements: JSX.Element[] = [];

    fundraisings.forEach((e, index) => {
      elements.push(
        <div
          className='modal-search-item__list__item hover:rounded cursor-pointer'
          key={`tre-${index}`}
        >
          <div className='coin p-2 flex justify-between items-center'>
            <div className='coin-info flex items-center gap-4'>
              <div className='coin-info__image'>
                <img src={e.icon} width={32} height={32} alt={e.name} />
              </div>
              <div className='coin-info__content'>
                <div className='coin-info__content__name flex gap-2'>
                  <div className='coin-name font-medium text-sm font-jm'>
                    {e.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='modal-search-item cryptoassets'>
        <div className='modal-search-item__title flex gap-2 text-sm font-jm mb-2'>
          Fundraisings
        </div>
        <div className='modal-search-item__list'>{elements}</div>
      </div>
    );
  };

  const _renderContent = () => {
    let isNotfound = true;
    if (!isSearch) {
      return (
        <>
          {_renderTrending()}
          {_renderRecent()}
        </>
      );
    }

    Object.keys(data).forEach((k: any) => {
      if (k === 'trendings') return;
      const dt = get(data, k, []);
      if (dt.length) isNotfound = false;
    });

    if (isNotfound) {
      return _returnNotFound();
    }

    return (
      <>
        {_renderCrypto()}
        {_renderUpcoming()}
        {_renderFuncraising()}
        {_renderCategory()}
        {_renderRecent()}
      </>
    );
  };

  return (
    <div className='modal-search p-4 w-full min-w-[580px] rounded-lg z-10'>
      {_renderContent()}
    </div>
  );
};

export default memo(SearchResult);
