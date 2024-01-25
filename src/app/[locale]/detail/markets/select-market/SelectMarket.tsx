import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { FetchCoinFundraising, FetchSearchExchange } from '@/usecases/coin-info';
import { Checkbox, Select, Tag } from 'antd';
import { random } from 'lodash';
import React from 'react';

export default function SelectMarket({ onChangeSearhKey }:any) {
  async function fetchSearchExchange(searchKey: string) {
    const res = await FetchSearchExchange({ search_key: searchKey });

    return res;
  }

  const _renderOption = ({ name, key, checked }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={key} key={name}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
            <span className='code px-2 rounded py-0 bg-grey-200 text-grey-500 leading-5'>
              {key}
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
  const _changeSearchKey = async ( searchKeys:string[]) => {
    console.log('====================================');
    console.log('_changeSearchKey', searchKeys);
    console.log('====================================');
       let searchKey = '';
       for (let i in searchKeys) {
         searchKey += searchKeys[i] + ',';
       }
       if (searchKey.length > 0) {
         searchKey = searchKey.substring(0, searchKey.length - 1);
       }
    onChangeSearhKey(searchKey);
  };

  const _getData = async ({ searchKey }: any) => {
    const res: any = await fetchSearchExchange(searchKey);
    console.log('====================================');
    console.log('search_key', searchKey, res);
    console.log('====================================');
    // return res;
    let list = [];
    for (let i in res) {
      let item = {
        id: i,
        name: res[i].name,
        key: res[i].key,
        code: res[i].key,
        isSelected: true,
      };
      list.push(item);
    }
    return list;
    // return [
    //   ...Array.from(Array(20)).map(() => ({
    //     id: random(1, 100000),
    //     name: "sdsdsd",
    //     code: `code-${searchKey}${random(100, 999)}`,
    //     thumb: '',
    //     isSelected: false,
    //   })),
    // ];
  };

  return (
    <FilterCustom
      placeholder='Filter Exchanges'
      renderOption={_renderOption}
      renderTag={_renderTag}
      onChange={(value) => {
        _changeSearchKey(value)
      }}
      getData={_getData}
    />
  );
}
