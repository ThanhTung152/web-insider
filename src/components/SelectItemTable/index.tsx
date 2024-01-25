import { Select } from 'antd';

interface IProps {
  onChange: (value: number) => void;
}

const SelectItemTable = ({ onChange }: IProps) => {
  const _onChange = (value: string) => {
    onChange(Number(value));
  };

  return (
    <Select
      defaultValue='10'
      style={{ width: 140 }}
      onChange={_onChange}
      options={[
        { value: '10', label: 'Show rows 10' },
        { value: '20', label: 'Show rows 20' },
        { value: '50', label: 'Show rows 50' },
        { value: '100', label: 'Show rows 100' },
      ]}
    />
  );
};
export default SelectItemTable;
