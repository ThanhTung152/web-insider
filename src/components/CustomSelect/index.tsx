import React, { ReactNode } from 'react';
import { Select, SelectProps } from 'antd';
import styled from 'styled-components';
import './styles.scss';
import IconDownCoinTab from '@/assets/icons/home/IconDownCoinTab';
type CustomSelectProps = SelectProps & {
  prefixIcon?: ReactNode;
};

const SelectWrapper = styled.div`
  position: relative;

  .prefix-icon-wrapper {
    position: absolute;
    z-index: 1;
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  && .ant-select .ant-select-selector {
    padding-left: calc(3rem - 15px);
  }

  .ant-select .ant-select-arrow {
    transition: transform 0.2s ease-in;
  }
  .ant-select.ant-select-open .ant-select-arrow {
    transform: rotate(180deg);
  }

  .ant-select-selection-placeholder {
    font-size: 14px;
    font-weight: 500;
  }

  .ant-select-selection-search {
    margin-left: -1px !important;
  }

  .ant-select-item-option-content:hover {
    background-color: red !important;
  }

  .ant-select-selection-item {
    background: rgb(82 120 248 / 30%) !important;
  }

  .ant-checkbox {
    display: none !important;
  }
`;

const CustomSelect = ({ prefixIcon, children, ...rest }: CustomSelectProps) => {
  return (
    <SelectWrapper>
      {prefixIcon && <div className='prefix-icon-wrapper'>{prefixIcon}</div>}
      <Select
        suffixIcon={
          <div className='down'>
            <IconDownCoinTab />
          </div>
        }
        className='select-custom hover:!border-primary-500'
        {...rest}
      >
        {children}
      </Select>
    </SelectWrapper>
  );
};

export default CustomSelect;
