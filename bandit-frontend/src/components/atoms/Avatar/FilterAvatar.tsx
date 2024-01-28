import React from "react";
import { startCase } from "lodash";
import styled from "styled-components";

import { Tick, VerifiedIcon } from "../../../components/atoms/svg";
import { truncateUsername } from "../../../utils";

const Container = styled.div`
  padding: 5px 0;
  cursor: pointer;

  svg {
    fill: rgb(13, 110, 253);
  }
`
const ActiveAvatar = styled.img`
  height: 28px;
  width: 28px;
  opacity: 0.5;
`
const AvatarImage = styled.img`
  height: 28px;
  width: 28px;
`
const ActiveAvatarContainer = styled.div`
  position: relative;
`

const PillText = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 5px;
  font-size: 14px;
  font-weight: 400;
  color: ${(p) => p.theme.colors.text};
`

const TickWrapper = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  path {
    fill: black;
  }
`

const CustomAvatar = ({ avatarImage, userName, name, verified, isActive, onClick }: any) => {
  return (
    <Container className="avatar" onClick={() => onClick(userName)}>
      {isActive ? (
        <ActiveAvatarContainer>
          <ActiveAvatar src={`${avatarImage}?h=30&auto=format,compress`} className="avatar__img" alt="profile" />
          <TickWrapper>
            <Tick />
          </TickWrapper>
        </ActiveAvatarContainer>
      ) : (
        <AvatarImage src={`${avatarImage}?h=30&auto=format,compress`} className="avatar__img" alt="profile" />
      )}
      <div className="avatar__info">
        <div className="avatar__info--title-wrapper">
          <PillText>{startCase(truncateUsername(userName))}</PillText>
          {verified && <VerifiedIcon />}
        </div>
      </div>
    </Container>
  )
}

export default CustomAvatar
