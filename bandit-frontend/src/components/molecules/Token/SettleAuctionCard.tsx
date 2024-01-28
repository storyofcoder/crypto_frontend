import React from "react";

import { NextLinkFromReactRouter } from "../../atoms/NextLink";
import styled from "styled-components";

import Asset from "../../atoms/Image/Asset";
import Avatar from "../../atoms/Avatar/Avatar";

const BidTokenCard = ({ token = {}, isBlob = false }: any) => {
  const {
    metaData: { url, name, type, thumbnail, preview },
    price,
    unit,
    id,
    localRate,
    localUnit,
    topBidderProfileImage,
    topBidBy,
    topBidderVerified,
    contractAddress,
  } = token

  return (
    <Settle to={`/assets/${contractAddress}/${id}`}>
      <div className="settle__img-wrapper">
        <div className="settle__img-wrapper--padding" />
        <Asset
          type={type}
          imageSrc={isBlob ? url : url}
          videoSrc={url}
          previewVideo={preview}
          thumbnail={`${thumbnail}?h=50&q=10&auto=format`}
          objectFit="cover"
        />
      </div>
      <div className="settle__details">
        <Avatar
          avatarImage={`${topBidderProfileImage}?h=100&auto=format,compress`}
          role="Won by"
          userName={`${topBidBy}`}
          navTo={`/${topBidBy}`}
          verified={topBidderVerified}
        />
        <h2 className="settle__title">{name}</h2>
        <div className="settle__divider" />
        <div className="settle__price">
          <div className="settle__price--wrapper">
            <p>Winning bid</p>
          </div>

          <div>
            <h4>
              {price} {unit}
            </h4>
            <h6>
              {parseFloat(localRate).toLocaleString()} {localUnit}
            </h6>
          </div>
        </div>
      </div>
    </Settle>
  )
}

const Settle = styled(NextLinkFromReactRouter)`
  text-decoration: none;
  box-shadow: 0 5px 10px -2px #e7e5de;
  display: block;
  padding: 10px;
  border-radius: 22px;
  transition: all 0.2s linear;
  background-color: #fbfbf9;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: fit-content;
  min-width: 0;

  &:hover {
    transform: translateY(-10px);
  }

  .settle__img-wrapper {
    width: 100%;
    overflow: hidden;
    object-fit: contain;
    border-radius: 22px;
    position: relative;
    margin: 0;
    min-width: 0;
    flex: 1;

    .settle__img-wrapper--padding {
      margin: 0;
      min-width: 0;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
    }
    .asset-img-wrapper,
    .asset-video-wrapper {
      width: 100%;
      height: 100%;
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
    }
  }

  .settle__img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .settle__details {
    padding: 20px 10px 10px 10px;
    flex: 1;
  }

  .settle__bidding-live {
    position: absolute;
    bottom: 3%;
    margin: 0;
    left: 3%;
    color: ${(props) => props.theme.colors.bg2};
    background-color: #9a4ffa;
    font-size: 12px;
    padding: 1px 10px;
    border-radius: 4px;
    font-weight: 700;
  }

  .settle__title {
    text-transform: capitalize;
    font-weight: 600 !important;
    font-size: 21px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.colors.textTertiary};
    margin: 15px 0 10px 0;
    line-height: 118%;
  }

  .settle__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    height: 45px;

    h5 {
      margin: 0;
      font-size: 24px;
    }
  }

  .settle__divider {
    height: 0;
    width: 30%;
    border: 1px solid #787775;
    background-color: #787775;
    opacity: 0.2;
  }
  .settle__divider--1 {
    width: 100%;
    margin-top: 10px;
  }

  .settle__time {
    color: #d81919;
  }

  .settle__bid {
    .settle__bid--winning {
      color: #1cad45;
    }

    .settle__bid--outbid {
      color: #e25d5c;
    }
  }

  .settle__price {
    color: ${(props) => props.theme.colors.text};
    margin-top: 10px;

    .settle__price--wrapper {
      display: flex !important;
      justify-content: space-between;
    }
    p {
      font-size: 13px;
      line-height: 16px;
      margin-bottom: 5px;
    }

    h4 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 0;
      color: ${(props) => props.theme.colors.textTertiary};
    }

    h6 {
      font-size: 15px;
      margin-bottom: 0;
      font-weight: 500;
      margin-left: 5px;
      color: ${(props) => props.theme.colors.textTertiary};
    }

    span {
      color: #9a4ffa;
    }

    div {
      display: flex;
      align-items: baseline;
    }
  }
`

export default BidTokenCard
