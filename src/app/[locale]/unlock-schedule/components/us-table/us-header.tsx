import { Checkbox, Flex, Select, Tag } from 'antd';
import CustomSelect from '@/components/CustomSelect';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CloseCircleOutlined } from '@ant-design/icons';
import FilterCustom from '@/components/FilterCustom';
import { IOptionAny, IOptionCustom } from '@/components/FilterCustom/props';
import { ISearchFilter } from '@/app/home/coin/props';
import { SearchCoinsFilter } from '@/usecases/home';
import { FetchSearchTokenUnlock } from '@/usecases/token-unlock';

type TData = {
  id: string;
  label: string;
  icon: string;
  value: string;
};

type UsHeaderProps = {
  defaultValues?: TData[];
  onFilter?: (values: any[]) => void;
};

export const UsHeader = (props: UsHeaderProps) => {
  const { onFilter } = props;

  const [data, setData] = useState<TData[]>([]);
  const [dataSelected, setDataSelected] = useState<IOptionCustom[]>([]);

  const _renderActiveTag = () => {
    const preview = dataSelected.slice(0, 3);
    const isMore = dataSelected.length > 3;
    return (
      <Flex gap={12} wrap={'wrap'}>
        {preview.map((item, index) => (
          <Tag
            className={'filter-tag'}
            closeIcon={<CloseCircleOutlined />}
            onClose={() => handleRemoveTag(index)}
            key={item.key}
          >
            <img src={item.image} alt={'icon-select'} width={24} height={24} />
            {item.name}
          </Tag>
        ))}
        {isMore && (
          <Tag className={'filter-tag'}>+{dataSelected.length - 3}</Tag>
        )}
      </Flex>
    );
  };

  const handleRemoveTag = (indexRemove: number) => {
    const newStage = dataSelected.filter(
      (_item, index) => index !== indexRemove
    );
    setDataSelected(newStage);
  };

  useEffect(() => {
    onFilter?.(dataSelected);
  }, [dataSelected]);

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

  const _renderTag = () => {
    return <></>;
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await FetchSearchTokenUnlock({
      search_key: searchKey,
    });
    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      ...e,
      id: e.key,
      name: e.name,
      code: e.key,
      thumb: '',
      isSelected: false,
    }));
  };

  const _onChange = (_value: string[], optionSelect: any) => {
    setDataSelected(optionSelect);
  };
  return (
    <Flex align={'center'} wrap={'wrap'} gap={10} className={'us-header'}>
      <FilterCustom
        placeholder='Filter Launchpads'
        renderOption={_renderOption}
        renderTag={_renderTag}
        onChange={_onChange}
        getData={_getData}
        isSortSelected='oldToNew'
        value={dataSelected}
      />
      {_renderActiveTag()}
    </Flex>
  );
};
