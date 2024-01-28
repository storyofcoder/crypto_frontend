import React from "react";
import styled from "styled-components";

import { Flex } from "../StyledSystem";
import { isDefaultImage, truncateUsername } from "../../../utils";
import { VerifiedIcon } from "../../../components/atoms/svg";
import { NextLinkFromReactRouter } from "../NextLink";

import BoringAvatar from "./BoringAvatar";

const Number = styled.div`
  color: ${(p) => p.theme.colors.text};
  opacity: 0.3;
  font-weight: 600;
  font-size: 18px;
  margin-right: 10px;
`
const ImageWrapper = styled.div`
  width: 62px;
  height: 62px;
  margin-right: 10px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const Info = styled.div`
  h4 {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    margin: 0 !important;
    color: ${(p) => p.theme.colors.text};
    opacity: 0.8;
    cursor: pointer;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
    span {
      font-weight: 500;
    }
  }

  h5 {
    font-size: 14px;
    color: ${(p) => p.theme.colors.text};
    opacity: 0.6;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    word-break: break-all;
    overflow: hidden;
    font-size: 14px;
    line-height: 17px;
    font-weight: 500;
  }
`

const StyledLink = styled.span`
  .info-title-wrapper {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    height: 23px;
  }
  .verified {
    margin-left: 5px;
  }
`

const Img = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;

  svg {
    width: 100%;
    height: 100%;
  }
`

const Avatar3 = ({ number, avatarImage, userName, verified, name, to, followers }: any) => {
  return (
    <NextLinkFromReactRouter to={to}>
      <StyledLink>
        <Flex alignItems="center">
          <Number>{number}</Number>
          <ImageWrapper>
            {!isDefaultImage(avatarImage) ? (
              <Img src={avatarImage} alt="profile" />
            ) : (
              <BoringAvatar size={62} name={userName} />
            )}
          </ImageWrapper>
          <Info>
            <div className="info-title-wrapper">
              <h4>{name}</h4>
              {verified && (
                <span className="verified">
                  <VerifiedIcon />
                </span>
              )}
            </div>
            <h5>@{truncateUsername(userName)}</h5>
          </Info>
        </Flex>
      </StyledLink>
    </NextLinkFromReactRouter>
  )
}

export default Avatar3
