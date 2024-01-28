import React from "react";
import styled from "styled-components";

import { Flex } from "../StyledSystem";
import { CheckIcon, PlusIcon } from "../../../components/atoms/svg";

const PillContainer = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  background-color: ${(p) => (p.active ? `${p.theme.colors.grey400} !important` : p.theme.colors.bg1)};
  // border: 1.5px solid
  //   ${(p) => (p.active ? 'transparent' : p.theme.colors.textTertiary)};
  color: ${(p) => (p.active ? p.theme.colors.bg2 : p.theme.colors.text6)};
  border-radius: 25px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
  max-width: fit-content;
  opacity: ${(p) => (p.disabled ? 0.7 : 1)};

  span {
    line-height: 16px;
  }

  svg {
    margin-left: 4px;
    width: 10px;
    height: 10px;
    path {
      fill: ${(p) => (p.active ? p.theme.colors.primary : p.theme.colors.text6)};
    }
  }
`

const PillFilled = ({ name, active, onClick, disabled, showIcons = true }: any) => {
  return (
    <PillContainer active={active} onClick={!disabled && onClick} disabled={disabled}>
      <span>{name}</span>
      {showIcons && (
        <>
          {active && <CheckIcon />}
          {!active && <PlusIcon />}
        </>
      )}
    </PillContainer>
  )
}

export default PillFilled
