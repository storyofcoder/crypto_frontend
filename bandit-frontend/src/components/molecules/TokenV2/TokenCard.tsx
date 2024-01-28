import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import styled from 'styled-components'
import startCase from 'lodash/startCase'
import { useRouter } from 'next/router'
import moment from 'moment'

import { makeFriendlyNumber, pad, truncateUsername } from '../../../utils'
import { ThreeDotIcon, VerifiedIcon } from '../../../components/atoms/svg'
import { NextLinkFromReactRouter } from '../../atoms/NextLink'

import { Text } from '../../atoms/StyledSystem'
import DropDown from '../../atoms/Dropdown/Dropdown'
import Asset from '../../atoms/Image/Asset'
import TokenIcon from 'components/atoms/svg/tokenIcon'
import { CHAIN_IDS_TO_NAMES_HYPHEN } from 'constant/chains'

const TokenCardContainer = styled.div`
  box-shadow: ${(p) => p.theme.colors.shadows.small};
  border-radius: 12px;
  overflow: hidden;

  text-decoration: none;
  display: block;
  transition: all 0.2s linear;
  background-color: ${(p) => p.theme.colors.background};
  height: fit-content;
  min-width: 0;
  position: relative;
  cursor: pointer;
  border: 1px solid;
  border-color: transparent;

  &:hover {
    background-color: ${(p) => p.theme.colors.background};
    border-color: ${(p) => p.theme.colors.foreground};
  }

  .token-card__img-wrapper {
    box-shadow: none;

    img,
    video {
      overflow: hidden;
    }
  }

  .asset-video-loading,
  .asset-img-loading {
    background: rgba(128, 128, 128, 0.2);
  }
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
  position: relative;
  margin: 0;
  min-width: 0;

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
    background-color: ${(p) => p.theme.colors.text};
  }
`

const TokenCardDetailsContainer = styled.div`
  padding: 10px;
  position: relative;

  .token-card__batch-badge {
    position: absolute;
    top: -7px;
    right: 10px;
    z-index: 10;
  }
`

const TokenTitle = styled.h2`
  font-size: 14px;
  font-weight: 600 !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(p) => p.theme.colors.foreground};
  margin: 0;
`

const TokenSubTitle = styled.div`
  font-size: 10px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;
  color: ${({ theme }) => theme.colors.foreground};

  svg {
    height: 13px;
    width: 13px;
  }

  font-weight: 500 !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  .token-card__price--wrapper {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 15px;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
  }
  .token-card__price--wrapper--1 {
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box !important;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: 600;
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
  .fiat-icon {
    height: 14px;
    position: relative;
    top: 2px;
  }
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
    padding: 7px 15px;
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

const TokenCard = ({ onClick, token, isBlob = false, optionList, tokenMinted = false }: any) => {
  const router = useRouter()
  const [difference, setDifference] = useState<any>(null)
  const [count, setCount] = useState<any>(1)

  const { assetId, metaData, creator, sale, collection } = token || {}

  const { url, name, type, thumbnail, preview } = metaData || {}
  const { price, saleType, unit, status, auctionLive, auctionEndTime } = sale

  const { name: collectionName, isVerified: isCollectionVerified, username, contractAddress, chainId } = collection || {}

  useEffect(() => {
    // @ts-ignore
    setDifference(
      // @ts-ignore
      moment.utc(auctionEndTime).toDate() - moment().toDate(),
    )
  }, [count])

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
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

  const isPriceZero = Number(price) <= 0

  return (
    <TokenCardContainer onClick={onClick && onClick}>
      {(tokenMinted || !isBlob) && (
        <NextLinkFromReactRouter to={`/assets/${contractAddress}/${assetId}`}>
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
      </ImageWrapper>
      <AvatarActionsWrapper>
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
      </AvatarActionsWrapper>
      <TokenCardDetailsContainer>
        <TokenSubTitle>
          {collectionName ? (
            <AvatarWrapper onClick={() => router.push(`/collection/${CHAIN_IDS_TO_NAMES_HYPHEN[chainId]}/${username}`)}>
              {startCase(collectionName)}
              {isCollectionVerified && <VerifiedIcon ml={2} />}
            </AvatarWrapper>
          ) : (
            <AvatarWrapper onClick={() => router.push(`/${creator.walletAddress}`)}>
              <span style={{ marginRight: '2px' }}>Created by </span>@{truncateUsername(creator.username)}
              {creator.isVerified && <VerifiedIcon ml={2} />}
            </AvatarWrapper>
          )}
        </TokenSubTitle>

        <TokenTitle>{name}</TokenTitle>

        {!isBlob && (
          <PriceWrapper>
            <div className="token-card__price--wrapper">
              {status === 'sold'
                ? 'Price'
                : saleType == 'buy' || status == 'mint' || saleType == 'unSold'
                ? 'Price'
                : auctionLive
                ? 'Current bid'
                : 'Reserve price'}
            </div>

            <div className="token-card__price--wrapper--1">
              {isPriceZero ? (
                <Text fontSize={10} color="foreground">
                  ---
                </Text>
              ) : (
                <>
                  <TokenIcon className="fiat-icon" />

                  {getPrice(price)}
                  {unit}
                </>
              )}
            </div>
          </PriceWrapper>
        )}
      </TokenCardDetailsContainer>
    </TokenCardContainer>
  )
}

export default TokenCard
