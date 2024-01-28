import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import moment from "moment";
import cx from "classnames";

import { makeFriendlyNumber, pad } from "../../../utils";
import { ThreeDotIcon } from "../../../components/atoms/svg";
import { NextLinkFromReactRouter } from "../../atoms/NextLink";

import DropDown from "../../atoms/Dropdown/Dropdown";
import TokenBadge from "../../atoms/Badge/Badge";
import Avatar from "../../atoms/Avatar/Avatar";
import Asset from "../../atoms/Image/Asset";

const TokenCard = ({
  onClick,
  token,
  isBlob = false,
  showOptions = false,
  optionList,
  tokenMinted = false,
  isCreateToken = false,
}: any) => {
  // const history = useHistory();
  const [difference, setDifference] = useState<any>(null)
  const [count, setCount] = useState<any>(1)

  const {
    metaData: { url, name, type, thumbnail, preview },
    creatorProfileImage,
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
  } = token

  useEffect(() => {
    // @ts-ignore
    setDifference(
      // @ts-ignore
      moment.utc(token.auctionEndTime).toDate() - moment().toDate(),
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

  const auctionEndingSoon = difference > 0 && difference < 900000
  const auctionEnded = difference <= 0

  const isPriceZero = Number(price) <= 0

  function getPrice(price) {
    return String(parseInt(price)).length <= 6 ? price : makeFriendlyNumber(price)
  }

  function getConversion(price) {
    return String(parseInt(price)).length <= 6 ? parseFloat(price).toLocaleString() : makeFriendlyNumber(price)
  }

  return (
    <div className="token-card" onClick={onClick && onClick}>
      {(tokenMinted || !isCreateToken) && (
        <NextLinkFromReactRouter to={`/${tokenCreator}/${id}`} className="token-card--link" />
      )}
      <div className="token-card__img-wrapper">
        <div className="token-card__img-wrapper--padding" />
        <Asset
          type={type}
          imageSrc={isBlob ? url : url}
          videoSrc={url}
          previewVideo={preview}
          thumbnail={`${thumbnail}?h=50&q=10&auto=format`}
          objectFit="cover"
        />

        {showOptions && (
          <DropDown
            trigger={['click']}
            placement="bottomRight"
            optionList={optionList}
            customButton={() => (
              <div className="token-card__settings">
                <ThreeDotIcon style={{ width: '15px', height: '15px' }} />
              </div>
            )}
          />
        )}

        {/*{getBadge(auctionEnded)}*/}
      </div>
      <div className="token-card__details">
        <div className="token-card__batch-badge">
          <TokenBadge batch={badge} />
        </div>
        <div className="token-card__title-wrapper">
          <h2 className="token-card__title">{name}</h2>
        </div>
        {!!price && (
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

              {auctionLive && !auctionEnded && <p className={cx({ 'token-card__time': auctionEndingSoon })}>Ends in</p>}
            </div>

            <div className="token-card__price--wrapper--1">
              {!isPriceZero ? (
                <h4>
                  {getPrice(price)} {unit} ({getConversion(localRate)} {localUnit})
                </h4>
              ) : (
                '--'
              )}
              <h4>
                <Countdown
                  date={moment.utc(auctionEndTime).toDate()}
                  renderer={renderer}
                  onTick={() => setCount(count + 1)}
                />
              </h4>
            </div>
          </div>
        )}
        <div className="token-card__divider" />

        <div className="token-card__details--1">
          <Avatar
            avatarImage={`${creatorProfileImage}?h=100&auto=format,compress`}
            role="Creator"
            userName={`${tokenCreator}`}
            navTo={`/${tokenCreator}`}
            verified={creatorVerified}
          />
          {tokenOwner && (
            <Avatar
              avatarImage={`${ownerProfileImage}?h=100&auto=format,compress`}
              role="Owner"
              userName={`${tokenOwner}`}
              navTo={`/${tokenOwner}`}
              verified={ownerVerified}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default TokenCard
