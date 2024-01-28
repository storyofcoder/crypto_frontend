import React, { useEffect, useState } from "react";
import cx from "classnames";
import Countdown from "react-countdown";
import moment from "moment";

import { NextLinkFromReactRouter } from "../../atoms/NextLink";
import styled from "styled-components";
import { makeFriendlyNumber, pad } from "../../../utils";

import TokenBadge from "../../atoms/Badge/Badge";
import Avatar from "../../atoms/Avatar/Avatar";
import Asset from "../../atoms/Image/Asset";

const FeedCard = ({ token, onClick }) => {
  const [height, setHeight] = useState('200px')
  const [difference, setDifference] = useState<any>(null)
  const [count, setCount] = useState<any>(1)

  useEffect(() => {
    setTimeDifference()
  }, [count])

  function setTimeDifference() {
    // @ts-ignore
    setDifference(moment.utc(token.auctionEndTime).toDate() - moment().toDate())
  }

  const {
    metaData: { url, name, type, thumbnail, preview },
    creatorProfileImage,
    tokenCreator,
    price,
    unit,
    id,
    creatorVerified,
    localRate,
    localUnit,
    tokenOwner,
    ownerProfileImage,
    ownerVerified,
    status,
    saleType,
    auctionLive,
    auctionEndTime,
    badge,
  } = token

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

  function handleWidth() {
    setHeight('initial')
  }
  function getPrice(price) {
    return String(parseInt(price)).length <= 6 ? price : makeFriendlyNumber(price)
  }

  function getConversion(price) {
    return String(parseInt(price)).length <= 6 ? parseFloat(price).toLocaleString() : makeFriendlyNumber(price)
  }

  const auctionEndingSoon = difference > 0 && difference < 900000
  const auctionEnded = difference <= 0
  return (
    <FeedCardWrapper onClick={onClick && onClick}>
      <NextLinkFromReactRouter to={`/${tokenCreator}/${id}`}>
        <div className="feed-card__asset-wrapper" style={{ minHeight: height }}>
          <Asset
            type={type}
            imageSrc={url}
            videoSrc={url}
            previewVideo={preview}
            thumbnail={`${thumbnail}?w=200&q=10&auto=format`}
            objectFit="contain"
            className={'feed-card--asset-fit'}
            assetLoadCallBack={handleWidth}
          />
          {/*{!onSale && price && <p className="feed-card__bidding-live">Sold</p>}*/}
          {/*{getBadge(auctionEnded)}*/}
        </div>
        <div className="feed-card__info">
          <div className="feed-card__batch-badge">
            <TokenBadge batch={badge} />
          </div>
          <h2 className="feed-card__info--title">{name}</h2>
          <div className="feed-card__price">
            <div className="feed-card__price--wrapper">
              {status === 'sold' ? (
                <p>Price</p>
              ) : saleType == 'buy' || saleType == 'unSold' ? (
                <p>Price</p>
              ) : auctionLive ? (
                <p>Current bid</p>
              ) : (
                <p>Reserve price</p>
              )}
              {auctionLive && !auctionEnded && <p className={cx({ 'feed-card__time': auctionEndingSoon })}>Ends in</p>}
            </div>
            <div>
              <h4>
                {getPrice(price)} {unit} ({getConversion(localRate)} {localUnit})
              </h4>
              <h4>
                <Countdown
                  date={moment.utc(auctionEndTime).toDate()}
                  renderer={renderer}
                  onTick={() => setCount(count + 1)}
                />
              </h4>
            </div>
          </div>
          <div className="feed-card__divider" />

          <div className="feed-card--avatar">
            <Avatar
              avatarImage={`${creatorProfileImage}?h=100&auto=format,compress`}
              role="Creator"
              userName={`${tokenCreator}`}
              navTo={`/${tokenCreator}`}
              verified={creatorVerified}
            />
            <Avatar
              avatarImage={`${ownerProfileImage}?h=100&auto=format,compress`}
              role="Owner"
              userName={`${tokenOwner}`}
              navTo={`/${tokenOwner}`}
              verified={ownerVerified}
            />
          </div>
        </div>
      </NextLinkFromReactRouter>
    </FeedCardWrapper>
  )
}

const FeedCardWrapper = styled.div`
  cursor: pointer;
  box-shadow: 0 5px 10px -2px #e7e5de;
  background: ${(p) => p.theme.colors.bg2};
  border-radius: 22px;
  transition: all 0.2s linear;
  margin-bottom: 30px;
  padding: 14px;
  //-webkit-filter: grayscale(0); /* Google Chrome, Safari 6+ & Opera 15+ */
  //filter: grayscale(0);
  &:hover {
    transform: translateY(-10px);
    .avatar {
    }
  }

  .feed-card--avatar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .avatar {
      flex: 1;
      //-webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
      //filter: grayscale(1);

      p,
      h4,
      .avatar__info--title-wrapper {
        font-size: 10px;
        line-height: 12px;
      }

      &:first-child {
        margin-right: 5px;
      }

      &:last-child {
        margin-left: 5px;
      }
    }
  }

  .feed-card--asset-fit {
    min-height: inherit;
  }

  .feed-card__bidding-live {
    position: absolute;
    bottom: 3%;
    margin: 0;
    left: 6%;
    color: ${(p) => p.theme.colors.bg1};
    background-color: #9a4ffa;
    font-size: 12px;
    padding: 1px 10px;
    border-radius: 4px;
    font-weight: 700;
  }

  .feed-card__batch-badge {
    position: absolute;
    top: -7px;
    right: 10px;
    z-index: 10;
  }

  .feed-card__info {
    padding: 10px;
    position: relative;

    .feed-card__info--title {
      font-weight: 600;
      margin: 15px 0;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      white-space: normal;
      font-size: 18px;
      color: ${(p) => p.theme.colors.testTertiary};
    }
  }
  .feed-card__divider {
    height: 0;
    width: 100%;
    border-top: 1px solid rgb(0, 0, 0);
    background-color: rgb(0, 0, 0);
    opacity: 0.2;
    margin: 15px 0;
  }

  .feed-card__time {
    color: #d81919 !important;
  }

  .feed-card__price {
    color: ${(p) => p.theme.colors.testPrimary};

    .feed-card__price--wrapper {
      display: flex !important;
      justify-content: space-between;
    }

    p {
      font-size: 12px;
      line-height: 16px;
      margin-bottom: 5px;
      opacity: 0.6;
      font-weight: 500;
      color: ${(p) => p.theme.colors.testTertiary};
    }

    h4 {
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 0;
      color: ${(p) => p.theme.colors.testTertiary};
    }

    span {
      color: #9a4ffa;
    }

    div {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }
  }

  .feed-card__asset-wrapper {
    position: relative;
    min-height: 200px;
    display: flex;
    border-radius: 22px;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    img,
    video {
    }

    .asset-img-loading--lazy {
      object-fit: cover !important;
    }
  }
`

export default FeedCard
