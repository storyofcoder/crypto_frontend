import React from "react";
import styled from "styled-components";
import cx from "classnames";
import SearchIcon from "../../../components/atoms/svg/images/search";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  line-height: 100%;

  input {
    border-radius: 25px;
    padding: 10px 15px 10px 40px;
    font-size: 16px;
    font-weight: 500;
    border: 1.8px solid ${(p) => p.theme.colors.text};
    background-color: ${(p) => p.theme.colors.bg1};
    width: 100%;

    &:focus,
    &:active {
      outline: none;
      border: 1.8px solid ${(p) => p.theme.colors.text};
    }
  }
`

const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
`

const Search = ({ className, inputRef, ...props }) => {
  return (
    <InputWrapper className={cx('search-input-wrapper', className)}>
      <Icon className="search-icon">
        <SearchIcon />
      </Icon>
      <input ref={inputRef} {...props} />
    </InputWrapper>
  )
}

export default Search
