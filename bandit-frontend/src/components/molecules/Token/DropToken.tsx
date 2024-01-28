import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import Countdown from "react-countdown";
import moment from "moment";
import styled from "styled-components";

import { Box, Flex, Text } from "../../atoms/StyledSystem";
import { makeFriendlyNumber, pad } from "../../../utils";
import { NextLinkFromReactRouter } from "../../atoms/NextLink";

import TokenBadge from "../../atoms/Badge/Badge";
import Avatar from "../../atoms/Avatar/Avatar";
import Button from "../../atoms/Button/Button";
import Asset from "../../atoms/Image/Asset";

const StyledRow = styled(Row)<{ reverseContent: boolean }>`
  margin-bottom: 80px;

  ${(p) => p.theme.media.xs} {
    flex-direction: ${(props) => (!props.reverseContent ? `column` : `column-reverse`)};
    margin-bottom: 80px;
  }
`
const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled(Button)`
  font-size: 14px;
  font-weight: 700};
`

const AssetWrapper = styled(Box)``

const DropToken = ({ reverseContent, token, onClickView }: any) => {
  const [difference, setDifference] = useState<any>(null)
  const [auctionEndingSoon, setAuctionEndingSoon] = useState<any>(null)
  const [auctionEndingVerySoon, setAuctionEndingVerySoon] = useState<any>(null)
  const [auctionEnded, setAuctionEnded] = useState<any>(false)

  useEffect(() => {
    setTimeDifference()
  }, [token.auctionEndTime])

  useEffect(() => {
    const auctionEndingSoon = difference > 0 && difference < 900000
    const auctionEndingVerySoon = difference > 0 && difference < 120000
    const auctionEnded = difference <= 0

    setAuctionEnded(auctionEnded)
    setAuctionEndingSoon(auctionEndingSoon)
    setAuctionEndingVerySoon(auctionEndingVerySoon)
  }, [difference])

  function setTimeDifference() {
    // @ts-ignore
    setDifference(
      // @ts-ignore
      moment.utc(token.auctionEndTime).toDate() - moment().toDate(),
    )
  }

  function setAuctionComplete() {
    setAuctionEnded(true)
  }

  function getPrice(price) {
    return String(parseInt(price)).length <= 6 ? price : makeFriendlyNumber(price)
  }

  function getConversion(price) {
    return String(parseInt(price)).length <= 6 ? parseFloat(price).toLocaleString() : makeFriendlyNumber(price)
  }

  const {
    metaData: { url, name, type, thumbnail, preview },
    creatorProfileImage,
    tokenCreator,
    tokenOwner,
    ownerProfileImage,
    id,
    price,
    unit,
    localRate,
    localUnit,
    creatorVerified,
    ownerVerified,
    saleType,
    auctionLive,
    status,
    auctionEndTime,
    badge,
    contractAddress,
  } = token

  const assetRef: any = useRef()

  function renderAsset(reverseContent) {
    const getPriceClass = (): string => {
      return reverseContent
        ? 'token-view__asset-price token-view__asset-price-left'
        : 'token-view__asset-price token-view__asset-price-right'
    }
    return (
      <NextLinkFromReactRouter to={`/assets/${contractAddress}/${id}`} className="token-view__shadow">
        <div
          className="token-view__shadow--holder"
          style={{ backgroundImage: `url(${thumbnail}?h=50&q=10&auto=format` }}
        />
        <div className={getPriceClass()}>
          {status === 'sold' ? (
            <p>Sold for</p>
          ) : saleType == 'buy' || saleType == 'unSold' ? (
            <p>Price</p>
          ) : auctionLive ? (
            <p>Current bid</p>
          ) : (
            <p>Reserve price</p>
          )}
          <div>
            <h4>
              {getPrice(price)} {unit}
            </h4>
            <h6>
              {getConversion(localRate)} {localUnit}
            </h6>
          </div>
        </div>
        <AssetWrapper
          className="token-view__asset-wrapper"
          ref={assetRef}
          height={['100%', '100%', 450]}
          width={['100%', '100%', 450]}
        >
          <Asset
            type={type}
            imageSrc={url}
            videoSrc={url}
            previewVideo={preview}
            thumbnail={`${thumbnail}?h=50&q=1&auto=format`}
            objectFit="cover"
          />
          <div className="token-view__token-badge">
            <TokenBadge batch={badge} />
          </div>
        </AssetWrapper>
      </NextLinkFromReactRouter>
    )
  }
  function renderInfo() {
    return (
      <div className="token-view__info-wrapper">
        <Text
          lineHeight={1.1}
          color="textTertiary"
          fontSize={[30, 30, 30, 60]}
          fontWeight={[600]}
          mt={10}
          mb={13}
          style={{ wordBreak: 'inherit' }}
          fontFamily="roc-grotesk"
        >
          {name}
        </Text>
        <div className="token-view__action-items">
          <NextLinkFromReactRouter to={`/assets/${contractAddress}/${id}`}>
            <StyledButton variant="primary" width={200} height={50} onClick={onClickView}>
              View NFT
            </StyledButton>
          </NextLinkFromReactRouter>
          <div className="token-view__divider-view-nft" />
          {auctionLive && (
            <Box>
              <Text
                mb={'8px'}
                fontSize={'14px'}
                color={(auctionEndingSoon || auctionEndingVerySoon) && !auctionEnded ? 'danger' : 'textTertiary'}
              >
                {auctionEnded
                  ? 'Auction ended'
                  : auctionEndingVerySoon
                  ? 'Auction ends soon'
                  : auctionEndingSoon
                  ? 'Auction ends soon'
                  : 'Auction ending in'}
              </Text>
              <Countdown
                date={moment.utc(auctionEndTime).toDate()}
                renderer={(props) => renderer(props, auctionEndTime)}
                onTick={setTimeDifference}
                onComplete={setAuctionComplete}
              />
            </Box>
          )}
        </div>
        <div className="token-view__asset-info">
          <Avatar
            avatarImage={`${creatorProfileImage}?h=100&auto=format,compress`}
            role="Creator"
            userName={`${tokenCreator}`}
            navTo={`/${tokenCreator}`}
            verified={creatorVerified}
          />
          <div className="token-view__asset-info--divider" />
          <Avatar
            avatarImage={`${ownerProfileImage}?h=100&auto=format,compress`}
            role="Owned By"
            userName={`${tokenOwner}`}
            navTo={`/${tokenOwner}`}
            verified={ownerVerified}
          />
        </div>
      </div>
    )
  }
  return (
    // @ts-ignore
    <StyledRow reverseContent={reverseContent}>
      <StyledCol xs={24} xl={12}>
        {reverseContent ? renderInfo() : renderAsset(reverseContent)}
      </StyledCol>
      <StyledCol xs={24} xl={12}>
        {reverseContent ? renderAsset(reverseContent) : renderInfo()}
      </StyledCol>
    </StyledRow>
  )
}

const renderer = ({ hours, minutes, seconds, completed }, auctionEndTime) => {
  if (completed)
    return (
      <Box color="textTertiary">
        <Text fontFamily="roc-grotesk" fontSize={24} fontWeight={700} lineHeight="28px">
          {moment.utc(auctionEndTime).local().format('ll')}
        </Text>
      </Box>
    )
  return (
    <Flex color="textTertiary">
      {hours > 0 && (
        <Box mr={10}>
          <Text fontFamily="roc-grotesk" fontSize={24} fontWeight={700} lineHeight="28px">
            {pad(hours, 2)}
          </Text>
          <Text>Hours</Text>
        </Box>
      )}
      <Box mr={10}>
        <Text fontFamily="roc-grotesk" fontSize={24} fontWeight={700} lineHeight="28px">
          {pad(minutes, 2)}
        </Text>
        <Text>Minutes</Text>
      </Box>
      <Box mr={10}>
        <Text fontFamily="roc-grotesk" fontSize={24} fontWeight={700} lineHeight="28px">
          {pad(seconds, 2)}
        </Text>
        <Text>Seconds</Text>
      </Box>
    </Flex>
  )
}

export default DropToken
