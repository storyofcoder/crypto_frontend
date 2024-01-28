import React from "react";
import { Select } from "antd";
import styled from "styled-components";

import { Box } from "../StyledSystem";
import { CrossIcon, DownIcon } from "../../../components/atoms/svg";

const { Option } = Select

const CustomSelect = ({ optionList, key, ...selectProps }: any) => {
  return (
    <Wrapper>
      <Select
        {...(key ? [{ key }] : [])}
        size="small"
        suffixIcon={<DownIcon />}
        clearIcon={<CrossIcon />}
        showSearch
        autoClearSearchValue
        allowClear
        dropdownStyle={{
          borderRadius: '10px',
        }}
        {...selectProps}
      >
        {optionList.map(({ key, value }) => (
          <Option key={key} value={value}>
            {key}
          </Option>
        ))}
      </Select>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  .ant-select {
    width: 100%;
    //padding: 15.5px 20px !important;
    // border: 1px solid ${(p) => p.theme.colors.text};
    border-radius: 16px !important;
    border: 1px solid #e2e4e8 !important;
    overflow: hidden;
  }

  .ant-select-selector {
    background-color: ${(p) => p.theme.colors.bg1} !important;
    border: none !important;
    height: 45px !important;
    padding: 0 12px !important;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }

  .ant-select-selection-search {
    input {
      height: 45px !important;
      padding: 0px !important;

      font-weight: 600;
      font-size: 14px;
      line-height: 28px;
    }
  }

  .ant-select-item {
    padding: 20px !important;
  }

  .ant-select-arrow {
    right: 17px;
    top: 22px !important;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .ant-select-clear {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20px;
    right: 17px;
    border-radius: 50%;
    overflow: hidden;
    padding: 5px;
    svg {
      width: 18px;
      height: 18px;
    }
  }

  .ant-select-dropdown {
    border-radius: 10px !important;
  }

  .ant-select-selection-placeholder {
    display: flex;
    align-items: center;
  }
`

export default CustomSelect
