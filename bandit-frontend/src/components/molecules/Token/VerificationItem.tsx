import React from "react";

import { Link } from "../../atoms/svg/images";
import styled from "styled-components";

const VerificationItem = ({ icon, text, onClick }: any) => {
  return (
    <VerificationItemWrapper onClick={onClick}>
      {icon}
      <h4>{text}</h4>
      <LinkWrapper />
      {/*<img src={link} alt="icon" className="verification-item--open"/>*/}
    </VerificationItemWrapper>
  )
}

const VerificationItemWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.1s linear;
  width: 220px;
  width: 100%;

  &:last-child {
    margin-bottom: 0 !important;
  }

  &--icon {
    width: 20px;
    height: 20px;
  }

  h4 {
    font-size: 14px;
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    margin-left: 10px;
  }
`

const LinkWrapper = styled(Link)`
  width: 15px;
  height: 15px;
  margin-left: auto;
`

export default VerificationItem
