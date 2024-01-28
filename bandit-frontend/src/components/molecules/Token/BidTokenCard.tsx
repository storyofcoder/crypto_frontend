import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import moment from "moment";
import styled from "styled-components";

import { makeFriendlyNumber, pad } from "../../../utils";
import { Text } from "../../atoms/StyledSystem";
import { TrophyIcon } from "../../../components/atoms/svg";
import { NextLinkFromReactRouter } from "../../atoms/NextLink";

import Button from "../../atoms/Button/Button";
import Avatar from "../../atoms/Avatar/Avatar";
import Asset from "../../atoms/Image/Asset";

const BidTokenCard = ({ token, isBlob = false, onClickClaim, hasWon, winning }: any) => {
  const [difference, setDifference] = useState<any>(null)
  const [count, setCount] = useState<any>(1)

  const {
    metaData: { url, name, type, thumbnail, preview },
    price,
    unit,
    onSale,
    id,
    localRate,
    localUnit,
    saleType,
    auctionLive,
    auctionEnded: tokenAuctionEnded,
    auctionEndTime,
    myBid,
    topBidderProfileImage,
    topBidBy,
    topBidderVerified,
    contractAddress,
  } = token

  useEffect(() => {
    // @ts-ignore
    setDifference(
      // @ts-ignore
      moment.utc(token.auctionEndTime).toDate() - moment().toDate(),
    )
  }, [count])

  const renderer = ({ hours, minutes, seconds, completed }, date) => {
    if (completed) {
      // Render a completed state
      return <>Ended on {moment(date).format('ll')}</>
    } else {
      return (
        <>
          Ends in {hours > 0 && `${pad(hours, 2)}h`} {`${pad(minutes, 2)}m`} {pad(seconds, 2)}s
        </>
      )
    }
  }

  function onClickButton(e) {
    e.stopPropagation()
    e.preventDefault()
    if (onClickClaim) onClickClaim(token)
  }

  function getPrice(price) {
    return String(parseInt(price)).length <= 6 ? price : makeFriendlyNumber(price)
  }

  function getConversion(price) {
    return String(parseInt(price)).length <= 6 ? parseFloat(price).toLocaleString() : makeFriendlyNumber(price)
  }

  const auctionEndingSoon = difference > 0 && difference < 900000
  const auctionEnded = difference <= 0 || (saleType === 'auction' && !onSale)

  // @ts-ignore
  // @ts-ignore
  return (
    <NextLinkFromReactRouter to={`/assets/${contractAddress}/${id}`}>
      <BidTokenCardWrapper>
        {/*<div className="bid-token-card__dropdown">*/}
        {/*    <p>dropdown</p>*/}
        {/*    <div className="">*/}

        {/*    </div>*/}
        {/*</div>*/}
        <ImageWrapper>
          <ImageWrapperPadding />
          <Asset
            type={type}
            imageSrc={isBlob ? url : url}
            videoSrc={url}
            previewVideo={preview}
            thumbnail={`${thumbnail}?h=50&q=10&auto=format`}
            objectFit="cover"
          />

          {/*{getBadge(auctionEnded)}*/}
        </ImageWrapper>
        <Details>
          {/*<Avatar*/}
          {/*    avatarImage={`${creatorProfileImage}?h=100&q=80&auto=format`}*/}
          {/*    role="Creator"*/}
          {/*    userName={`${tokenCreator}`}*/}
          {/*    navTo={`/${tokenCreator}`}*/}
          {/*    verified={creatorVerified}*/}
          {/*/>*/}
          <CardTitle>{name}</CardTitle>
          <CardPrice>
            <CardPriceWrapper>
              {auctionEnded ? <p>Winning bid</p> : <p>Current bid</p>}

              <Time>
                <Countdown
                  date={moment.utc(auctionEndTime).toDate()}
                  renderer={(props) => renderer(props, auctionEndTime)}
                  onTick={() => setCount(count + 1)}
                />
              </Time>
            </CardPriceWrapper>

            <PriceDetails>
              <h4>
                {getPrice(price)} {unit} ({getConversion(localRate)} {localUnit})
              </h4>
            </PriceDetails>
          </CardPrice>
          <Divider />
          {!auctionEnded ? (
            <CardPrice>
              <CardPriceWrapper>
                <p>Your bid</p>
                {winning && <Winning>Winning</Winning>}
              </CardPriceWrapper>

              <PriceDetails>
                <h4>{`${getPrice(myBid)} ${unit}`}</h4>
                <p>{`${getConversion(localRate)} ${localUnit}`}</p>
              </PriceDetails>
            </CardPrice>
          ) : hasWon ? (
            <Footer>
              <div>
                <TrophyIcon />
                <p>You Won</p>
              </div>
              {auctionLive && tokenAuctionEnded && (
                <Button variant="tertiary" onClick={onClickButton} height={40}>
                  <Text fontSize={'12px'} lineHeight="100%">
                    Claim NFT
                  </Text>
                </Button>
              )}
            </Footer>
          ) : (
            <Footer>
              <Avatar
                avatarImage={`${topBidderProfileImage}?h=100&auto=format,compress`}
                role="Won by"
                userName={`${topBidBy}`}
                navTo={`/${topBidBy}`}
                verified={topBidderVerified}
              />
            </Footer>
          )}
        </Details>
      </BidTokenCardWrapper>
    </NextLinkFromReactRouter>
  )
}

const BidTokenCardWrapper = styled.div`
  text-decoration: none;
  box-shadow: 0 5px 10px -2px #e7e5de;
  display: block;
  padding: 14px;
  border-radius: 22px;
  transition: all 0.2s linear;
  background-color: #fbfbf9;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: fit-content;
  min-width: 0;
  &:hover {
    transform: translateY(-10px);
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  object-fit: contain;
  border-radius: 22px;
  position: relative;
  margin: 0;
  min-width: 0;
  flex: 1;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
`

const ImageWrapperPadding = styled.div`
  margin: 0;
  min-width: 0;
  width: 100%;
  height: 0;
  /* padding-bottom: 100%; */
`

const Details = styled.div`
  padding: 10px;
  flex: 1;
`

const CardTitle = styled.h2`
  font-weight: 700 !important;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.textTertiary};
  margin: 15px 0;
  line-height: 118%;
`

const CardPrice = styled.div`
  color: ${(props) => props.theme.colors.textTertiary};
  margin-top: 10px;
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
    color: ${(props) => props.theme.colors.testTertiary};
  }

  span {
    color: #9a4ffa;
  }

  div {
    display: flex;
    align-items: baseline;
  }
`

const PriceDetails = styled.div`
  h4 {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 0;
    color: ${(props) => props.theme.colors.testTertiary};
  }

  p {
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 5px;
    opacity: 0.6;
    font-weight: 500;
    margin-left: 5px;
  }
`

const CardPriceWrapper = styled.div`
  display: flex !important;
  justify-content: space-between;
`

const Time = styled.p`
  color: #d81919;
`

const Winning = styled.p`
  color: #1cad45;
`

const Divider = styled.div`
  height: 0;
  width: 100%;
  border-top: 1px solid rgb(0, 0, 0);
  background-color: rgb(0, 0, 0);
  opacity: 0.2;
  margin: 15px 0;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  height: 45px;

  .avatar {
    p,
    h4 {
      font-size: 10px;
      line-height: 12px;
    }
  }

  div {
    display: flex;
    color: ${(props) => props.theme.colors.textTertiary};
    font-size: 18px;
    font-weight: 600;
    line-height: 12px;

    p {
      margin-left: 10px;
      align-self: flex-end;
    }
  }

  h5 {
    margin: 0;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  button {
    box-shadow: 2px 1000px 1px #ffffff inset;
  }
`

export default BidTokenCard
