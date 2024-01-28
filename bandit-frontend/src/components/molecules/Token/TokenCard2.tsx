import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import styled from "styled-components";
import startCase from "lodash/startCase";
import { useRouter } from "next/router";
import moment from "moment";

import { makeFriendlyNumber, pad, truncateUsername } from "../../../utils";
import { SplitIcon, ThreeDotIcon, VerifiedIcon } from "../../../components/atoms/svg";
import { NextLinkFromReactRouter } from "../../atoms/NextLink";

import Avatar from "../../atoms/Avatar/TokenListAvatar";
import TokenBadge from "../../atoms/Badge/Badge";
import DropDown from "../../atoms/Dropdown/Dropdown";
import Asset from "../../atoms/Image/Asset";
import { CHAIN_IDS_TO_NAMES_HYPHEN } from "constant/chains";

const TokenCardContainer = styled.div`
  // padding: ${(p) => (p.isSmallLayout ? 7 : 8)}px;
  .token-card__img-wrapper {
    box-shadow: none;

    img,
    video {
      border-radius: 6px !important;
      overflow: hidden;
    }
  }

  .asset-video-loading,
  .asset-img-loading {
    background: rgba(128, 128, 128, 0.2);
  }

  text-decoration: none;
  //box-shadow: 0 5px 10px -2px #e7e5de;
  display: block;
  //padding: 14px;
  border-radius: 12px;
  transition: all 0.2s linear;
  background-color: ${(p) => p.theme.colors.bg2};
  //border: 1px solid ${(p) => p.theme.colors.cardBorder};
  height: fit-content;
  min-width: 0;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0 0 3px transparent, 0 2px 8px #11142d1f;
`

const TokenCardLink = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`

const ImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  object-fit: contain;
  border-radius: 6px;
  position: relative;
  margin: 0;
  min-width: 0;
  //box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);

  .asset-img-wrapper,
  .asset-video-wrapper {
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`

const ImageWrapperPadding = styled.div`
  margin: 0;
  min-width: 0;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
`

const Settings = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 3;
  margin-left: 5px;
  position: absolute;
  top: 4%;
  right: 4%;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    //transform: scale(1.05);
    background-color: ${(p) => p.theme.colors.text};
  }
`

const TokenCardDetailsContainer = styled.div`
  padding: ${(p) => (p.isSmallLayout ? 10 : 10)}px;
`
const TokenTitleWrapper = styled.div`
  margin: 0;
`

const TokenTitle = styled.h2`
  font-size: ${(p) => (p.isSmallLayout ? 14 : 18)}px;
  font-weight: 700 !important;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(p) => p.theme.colors.textTertiary};
  line-height: 22px;
  margin: 0;
`

const TokenSubTitle = styled.h2`
  font-size: 10px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;

  svg {
    height: 13px;
    width: 13px;
  }
  a {
    color: ${(p) => p.theme.colors.textTertiary};
  }
  font-weight: 700 !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(p) => p.theme.colors.textTertiary};
  line-height: 22px;
  margin: 0;
`

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .token-card__price {
    color: ${(p) => p.theme.colors.textTertiary};
  }
  .token-card__price--wrapper {
    font-size: 10px;
    &--1 {
      display: flex !important;
      justify-content: space-between;
      line-height: 1;
    }
  }
  .token-card__price--wrapper--1 {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box !important;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
    .equivalance {
      font-size: 10px;
      color: ${(p) => p.theme.colors.textTertiary};
    }
  }
  grid-gap: 10px;
  p {
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 5px;
    opacity: 0.6;
    font-weight: 500;
  }

  h4 {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 0;
    color: ${(p) => p.theme.colors.textTertiary};
  }
`

const TokenTimeTitle = styled.p`
  z-index: ${(p) => (p.isSmallLayout ? 10 : 0)};
`

const AvatarActionsWrapper = styled.div`
  position: relative;
  margin-top: -57px;
  padding: 14px 14px;
  height: 57px;

  .float-right {
    float: right;
  }
  .batch {
    background: rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(30px);
    border-radius: 15px;
    color: white;
    display: inline-block;
    padding: ${(p) => (p.isSmallLayout ? '5px 10px' : '7px 15px')};
    font-size: 10px;

    svg {
      width: 12px;
      height: 12px;
      margin-right: 6px;

      path {
        fill: white;
      }
    }
  }
`

const AvatarWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  p,
  h4,
  .avatar__info--title-wrapper {
    font-size: 10px;
    line-height: 12px;
  }
  &:first-child {
    margin-right: 5px;
  }
`

const TokenCard = ({
  onClick,
  token,
  showSoldOut = true,
  isBlob = false,
  showBurn = false,
  showOptions = false,
  optionList,
  isSmallLayout,
  isCollectionToken = false,
  tokenMinted = false,
}: any) => {
  const history = useRouter()
  const [difference, setDifference] = useState<any>(null)
  const [count, setCount] = useState<any>(1)

  const {
    metaData,
    tokenCreator,
    ownerVerified,
    ownerProfileImage,
    price,
    unit,
    id,
    creatorVerified,
    localRate,
    localUnit,
    tokenOwner,
    status,
    saleType,
    auctionLive,
    auctionEndTime,
    badge,
    collection,
    hasSplits,
    contractAddress,
  } = token || {}

  const { url, name, type, thumbnail, preview } = metaData || {}

  const { name: collectionName, isVerified: isCollectionVerified, username, chainId } = collection || {}

  useEffect(() => {
    // @ts-ignore
    setDifference(
      // @ts-ignore
      moment.utc(token?.auctionEndTime).toDate() - moment().toDate(),
    )
  }, [count])

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return null
    } else {
      return (
        <>
          {hours > 0 && `${pad(hours, 2)}h`} {`${pad(minutes, 2)}m`} {pad(seconds, 2)}s
        </>
      )
    }
  }

  const auctionEnded = difference <= 0

  function getPrice(price) {
    return String(parseInt(price)).length <= 6 ? price : makeFriendlyNumber(price)
  }

  function getConversion(price) {
    return String(parseInt(price)).length <= 6 ? parseFloat(price).toLocaleString() : makeFriendlyNumber(price)
  }

  // function goTo(e) {
  //   e.stopPropagation();
  //   history.push(navTo);
  // }

  const isPriceZero = Number(price) <= 0

  return (
    <TokenCardContainer isSmallLayout={isSmallLayout} onClick={onClick && onClick}>
      {(tokenMinted || !isBlob) && (
        <NextLinkFromReactRouter to={`/assets/${contractAddress}/${id}`}>
          <TokenCardLink> </TokenCardLink>
        </NextLinkFromReactRouter>
      )}

      <ImageWrapper>
        <ImageWrapperPadding />

        <Asset
          isBlob={isBlob}
          type={type}
          imageSrc={url}
          videoSrc={url}
          previewVideo={preview}
          thumbnail={`${thumbnail}?h=50&q=10&auto=format`}
          objectFit="cover"
        />

        {!!optionList?.length && (
          <DropDown
            trigger={['click']}
            placement="bottomRight"
            optionList={optionList}
            customButton={() => (
              <Settings>
                <ThreeDotIcon style={{ width: '15px', height: '15px' }} />
              </Settings>
            )}
          />
        )}

        {/*{getBadge(auctionEnded)}*/}
      </ImageWrapper>
      <AvatarActionsWrapper isSmallLayout={isSmallLayout}>
        {auctionLive && !auctionEnded ? (
          <div className="batch">
            Ends in{' '}
            <Countdown
              date={moment.utc(auctionEndTime).toDate()}
              renderer={renderer}
              onTick={() => setCount(count + 1)}
            />
          </div>
        ) : (
          <span>&nbsp;</span>
        )}
        {!!hasSplits && (
          <div className="batch float-right">
            <SplitIcon /> Split
          </div>
        )}
      </AvatarActionsWrapper>
      <TokenCardDetailsContainer isSmallLayout={isSmallLayout}>
        <div className="token-card__batch-badge">
          <TokenBadge batch={badge} />
        </div>

        {isCollectionToken ? (
          <>
            <TokenTitleWrapper isSmallLayout={isSmallLayout}>
              <TokenTitle isSmallLayout={isSmallLayout}>{name}</TokenTitle>
            </TokenTitleWrapper>
          </>
        ) : (
          <TokenTitleWrapper isSmallLayout={isSmallLayout}>
            <TokenTitle isSmallLayout={isSmallLayout}>{name}</TokenTitle>
          </TokenTitleWrapper>
        )}
        <TokenSubTitle isSmallLayout={isSmallLayout}>
          {collectionName ? (
            <AvatarWrapper
              // href={`/collection/${username}`}
              onClick={() => {
                history.push(`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[chainId]}/${username}`)
              }}
            >
              <>
                {startCase(collectionName)}
                {isCollectionVerified && <VerifiedIcon ml={2} />}
              </>
            </AvatarWrapper>
          ) : (
            <AvatarWrapper
              // href={`/${tokenCreator}`}
              onClick={() => {
                history.push(`/${tokenCreator}`)
              }}
            >
              <>
                <span style={{ opacity: '0.6', marginRight: '2px' }}>Created by </span>@{truncateUsername(tokenCreator)}
                {creatorVerified && <VerifiedIcon ml={2} />}
              </>
            </AvatarWrapper>
          )}
        </TokenSubTitle>
        {!isBlob && (
          <PriceWrapper isSmallLayout={isSmallLayout}>
            <div className="token-card__price">
              <div className="token-card__price--wrapper">
                {status === 'sold' ? (
                  <p>Price</p>
                ) : saleType == 'buy' || status == 'mint' || saleType == 'unSold' ? (
                  <p>Price</p>
                ) : auctionLive ? (
                  <p>Current bid</p>
                ) : (
                  <p>Reserve price</p>
                )}
              </div>

              <div className="token-card__price--wrapper--1">
                {!isPriceZero ? (
                  <h4>
                    {getPrice(price)} {unit}{' '}
                    <span className="equivalance">
                      ({getConversion(localRate)} {localUnit})
                    </span>
                  </h4>
                ) : (
                  '--'
                )}
              </div>
            </div>
            {!isSmallLayout && (
              <Avatar
                avatarImage={`${ownerProfileImage}?h=100&auto=format,compress`}
                role="Owner"
                userName={`${tokenOwner}`}
                navTo={`/${tokenOwner}`}
                verified={ownerVerified}
                isSmallLayout={isSmallLayout}
              />
            )}
          </PriceWrapper>
        )}
      </TokenCardDetailsContainer>
    </TokenCardContainer>
  )
}

export default TokenCard
