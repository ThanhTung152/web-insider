import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { Checkbox, Select, Tag } from 'antd';
import React from 'react';
import { IHeaderFilter } from '../../types';
import { ISearchFilter } from '@/app/home/coin/props';
import {
  FetchSearchTopBanker,
  FundraisingSearch,
} from '@/usecases/fundraising';

export default function SearchSelect({ onChange, layout }: IHeaderFilter) {
  const _renderOption = ({ name, code, checked }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={name}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
            <span className='code px-2 rounded py-0 bg-[#EEF2F6] text-[#9FA4B7] leading-5'>
              {code}
            </span>
          </div>
          <div className='ant-checkbox'>
            {!checked ? (
              <Checkbox disabled className='hover:cursor-pointer' />
            ) : null}
          </div>
        </div>
      </Select.Option>
    );
  };

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index } = options;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (index > 3) return <></>;

    if (index === 3)
      return (
        <Tag color='#5766ff' style={{ marginRight: 3 }}>
          ...
        </Tag>
      );
    return (
      <Tag
        color='#5766ff'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const isFun = layout === 'funding-rounds';
    const api = isFun ? FundraisingSearch : FetchSearchTopBanker;

    const res: any = await api({
      slug: searchKey,
      key: searchKey,
    });

    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      id:  e.slug,
      name: e.name,
      code: e.slug,
      thumb: '',
      isSelected: false,
    }));
  };

  return (
    <FilterCustom
      placeholder='Search'
      renderOption={_renderOption}
      renderTag={_renderTag}
      onChange={onChange}
      getData={_getData}
    />
  );
}
