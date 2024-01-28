import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { isDefaultImage, truncateUsername } from '../../../utils'
import { VerifiedIcon } from '../../../components/atoms/svg'
import { NextLinkFromReactRouter } from '../NextLink'

import BoringAvatar from './BoringAvatar'

const AvatarImage = styled.img<any>`
  height: ${(p) => (p.isSmallLayout ? 32 : 44)}px;
  width: ${(p) => (p.isSmallLayout ? 32 : 44)}px;
`
const BoringAvatarWrapper = styled.div<any>`
  height: ${(p) => (p.isSmallLayout ? 32 : 44)}px;
  width: ${(p) => (p.isSmallLayout ? 32 : 44)}px;
`

const AvatarWrapper = styled.div`
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
    display: flex;
    align-items: center;

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
      font-weight: 500;
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
      font-size: 12px;
      line-height: 17px;
      color: ${(p) => p.theme.colors.grey900};
      // opacity: 0.6;
      font-weight: 400;
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

const CustomAvatar = ({ avatarImage, userName, role, navTo, verified, isSmallLayout }: any) => {
  const router = useRouter()
  function goTo(e) {
    e.stopPropagation()
    router.push(navTo)
  }
  return (
    <NextLinkFromReactRouter to={navTo}>
      <AvatarWrapper onClick={goTo}>
        {avatarImage && !isDefaultImage(avatarImage) ? (
          <AvatarImage
            isSmallLayout={isSmallLayout}
            src={avatarImage}
            className="avatar__img"
            alt={role || 'profile'}
          />
        ) : (
          <BoringAvatarWrapper isSmallLayout={isSmallLayout} className="avatar__img">
            <BoringAvatar size={isSmallLayout ? 32 : 40} name={userName} />
          </BoringAvatarWrapper>
        )}
        <div className="avatar__info">
          <p>{role}</p>
          <div className="avatar__info--title-wrapper">
            <h4>@{truncateUsername(userName)} </h4>
            {verified && <VerifiedIcon />}
          </div>
        </div>
      </AvatarWrapper>
    </NextLinkFromReactRouter>
  )
}

export default CustomAvatar
