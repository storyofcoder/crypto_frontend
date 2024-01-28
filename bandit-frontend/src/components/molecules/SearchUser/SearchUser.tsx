import React, { useState } from "react";
import styled from "styled-components";

import API from "../../../services/API";
import Select from "../../atoms/Form/Select";

import { Box } from "../../atoms/StyledSystem";

const SearchUser = ({ onSelect, disabled, filterList }) => {
  const [userList, setUsersList] = useState([])
  const [userSearchValue, setUserSearchValue] = useState(null)

  function onChange(value) {
    const [user] = userList.filter((u) => u.username === value)
    onSelect(user)
    setUserSearchValue(null)
    setUsersList([])
  }

  async function onSearch(val) {
    setUserSearchValue(val)
    if (!val) return
    try {
      const res = await API.getUsername(val)
      setUsersList(res)
    } catch (e) {
      console.log(e)
    }
  }

  const getOptionLIst = () => {
    return (filterList(userList) || []).map(({ username }) => ({
      key: username,
      value: username,
    }))
  }

  return (
    <Wrapper>
      <Select
        showSearch
        style={{ width: '100%' }}
        placeholder="Search by username"
        optionFilterProp="children"
        onSelect={onChange}
        onSearch={onSearch}
        searchValue={userSearchValue}
        autoClearSearchValue
        allowClear
        disabled={disabled}
        optionList={getOptionLIst()}
      />
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  .ant-select {
    width: 100%;
    border: none;
    // border-radius: 26.5px !important;
    overflow: hidden;
    border-radius: 16px !important;
    border: 1px solid #e2e4e8 !important;
  }

  .ant-select-selector {
    background-color: ${(p) => p.theme.colors.bg1} !important;
    border: none !important;
    height: 45px !important;
    padding: 0 20px !important;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }

  .ant-select-selection-search {
    input {
      height: 45px !important;
      padding: 0 10px !important;
    }
  }

  .ant-select-item {
    padding: 20px !important;
  }

  .ant-select-arrow {
    right: 26px;
    top: 19px;
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

export default SearchUser
