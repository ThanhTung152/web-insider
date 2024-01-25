import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { FetchIeoIdo } from '@/usecases/ieo-ido';
import { Checkbox, Select, Tag } from 'antd';
import React from 'react';
import { getIeoIdoApiSearchPath } from '../../config';
import { SearchProject } from '../../types';

type PropsType = {
  category: string;
  onFilterChange: (values: string[]) => void;
};

export default function SelectProject(props: PropsType) {
  const _renderOption = ({ name, key, checked, code }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={code}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 justify-between'>
          <div className=''>
            <span className='name mx-2'>{name}</span>
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
    //@ts-ignore
    const data: SearchProject[] = await FetchIeoIdo(
      getIeoIdoApiSearchPath(props.category),
      {
        search_key: searchKey || '',
      }
    );

    return data.map((searchItem: SearchProject) => ({
      id: searchItem.key,
      name: searchItem.name,
      code: searchItem.key,
      thumb: '',
      isSelected: false,
    }));
  };

  return (
    <FilterCustom
      placeholder='Search'
      renderOption={_renderOption}
      renderTag={_renderTag}
      onChange={(keys) => {
        props.onFilterChange(keys);
      }}
      getData={_getData}
    />
  );
}
