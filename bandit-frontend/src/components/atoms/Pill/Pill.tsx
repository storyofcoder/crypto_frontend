import React from "react";
import styled from "styled-components";

import { Flex } from "../StyledSystem";
import { CheckIcon } from "../../../components/atoms/svg";

const PillContainer = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6.5px 15px 6.5px 13px;
  background-color: ${(p) => p.theme.colors.bg2};
  border: 1.5px solid ${(p) => p.theme.colors.textTertiary};
  color: ${(p) => p.theme.colors.textTertiary};
  border-radius: 25px;
  font-size: 13px;
  font-weight: 500;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
  span {
    margin-left: ${(p) => (p.active ? '5px' : '0')};
    line-height: 16px;
  }
`

const PillText = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
`

const Pill = ({ name, active, onClick }: any) => {
  return (
    <PillContainer active={active} onClick={onClick}>
      {active && <CheckIcon />}
      <PillText>{name}</PillText>
    </PillContainer>
  )
}

export default Pill
