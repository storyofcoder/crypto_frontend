import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { VerifiedIcon } from "../../../components/atoms/svg";
import { isDefaultImage, truncateUsername } from "../../../utils";
import { NextLinkFromReactRouter } from "../NextLink";

import BoringAvatar from "./BoringAvatar";

const AvatarImage = styled.img<any>`
  position: relative;
  top: 2px;
  height: ${(p) => (p.isSmallLayout ? 30 : 30)}px;
  width: ${(p) => (p.isSmallLayout ? 30 : 30)}px;
`
const BoringAvatarWrapper = styled.div<any>`
  position: relative;
  top: 2px;
  height: ${(p) => (p.isSmallLayout ? 30 : 30)}px;
  width: ${(p) => (p.isSmallLayout ? 30 : 30)}px;
`

const AvatarWrapper = styled.div`
  .avatar__info p,
  .avatar__info--title-wrapper h4 {
    font-size: 12px;
  }
  .avatar__info--title-wrapper span {
    display: flex;
  }
`

const AvatarWrapper2 = styled(NextLinkFromReactRouter)`
  display: flex;
  text-decoration: none;
  &:hover {
    h4 {
      opacity: 1;
    }
  }

  .avatar__img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .avatar__info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .avatar__info--title-wrapper {
      display: flex;
      align-items: center;

      svg {
        width: 13px;
        height: 13px;
      }
    }

    h4 {
      margin: 0 !important;
      font-size: 14px;
      line-height: 17px;
      color: ${(p) => p.theme.colors.text};
      opacity: 0.8;
      font-weight: 700;
      cursor: pointer;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      white-space: normal;
      word-break: break-all;
      overflow: hidden;
      margin-top: 3px;
    }

    p {
      margin: 0;
      font-size: 13px;
      line-height: 17px;
      color: ${(p) => p.theme.colors.text};
      opacity: 0.6;
      font-weight: 500;
    }

    svg {
      margin-left: 4px;
    }
  }

  .__verified {
    width: 14px;
    height: 14px;
  }
`

const TokenListAvatar = ({ avatarImage, userName, role, navTo, verified, isSmallLayout }: any) => {
  const history = useRouter()
  function goTo(e) {
    e.stopPropagation()
    history.push(navTo)
  }
  return (
    <AvatarWrapper>
      <AvatarWrapper2 to={navTo} onClick={goTo}>
        <>
          {!isDefaultImage(avatarImage) ? (
            <AvatarImage
              isSmallLayout={isSmallLayout}
              src={avatarImage}
              className="avatar__img"
              alt={role || 'profile'}
            />
          ) : (
            <BoringAvatarWrapper isSmallLayout={isSmallLayout} className="avatar__img">
              <BoringAvatar size={isSmallLayout ? 30 : 30} name={userName} />
            </BoringAvatarWrapper>
          )}
          <div className="avatar__info">
            <p>{role}</p>
            <div className="avatar__info--title-wrapper">
              <h4>@{truncateUsername(userName)} </h4>
              {verified && <VerifiedIcon />}
            </div>
          </div>
        </>
      </AvatarWrapper2>
    </AvatarWrapper>
  )
}

export default TokenListAvatar
