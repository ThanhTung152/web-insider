import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

export interface ISearchData {
  id: number | string;
  name: string;
  code: string;
  thumb: string | null;
  isSelected: boolean;
  [key: string]: string | number | boolean | any;
}

export interface IOptionCustom extends ISearchData {
  checked?: boolean;
}

export interface IFilterCustom {
  renderOption: (options: IOptionCustom) => JSX.Element;
  onChange: (keys: string[], optionSelect?: any[]) => void;
  renderTag: (options: ICustomTagProp) => JSX.Element;
  getData: (options: IOptionAny) => any;
  placeholder?: string;
  isSelectAll?: boolean;
  isSortSelected?: 'alphabet' | 'oldToNew' | 'newToOld';
  value?: any[];
  resetValue?: () => void;
}

export interface ICustomTagProp extends CustomTagProps {
  index: number;
  rawData?: any;
}

export interface IOptionAny {
  [key: string]: string | number | boolean;
}
