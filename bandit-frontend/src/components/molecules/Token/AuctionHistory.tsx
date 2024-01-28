import React from "react";
import { isDefaultImage } from "../../../utils";
import BoringAvatar from "../../atoms/Avatar/BoringAvatar";

const AuctionHistory = ({ avatarImage, time, renderTitle, tokenPrice, unit, localRate, localUnit, username }: any) => {
  return (
    <div className="auction-history-item">
      <div className="auction-history-item--avatar">
        {!isDefaultImage(avatarImage) ? (
          <img src={`${avatarImage}?h=100&auto=format,compress`} alt="profile" />
        ) : (
          <BoringAvatar size={45} name={username} />
        )}
      </div>
      <div className="auction-history-item--info">
        <div className="auction-history-item--transaction">
          <div className="auction-history-item--transaction-details">
            <h4 className="">{renderTitle()}</h4>
            <p>{time}</p>
          </div>
        </div>
        <div className="auction-history-item--amount">
          <h4>
            {tokenPrice} {unit}
          </h4>
          {localRate && localUnit && (
            <p>
              {localRate} {localUnit}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuctionHistory
