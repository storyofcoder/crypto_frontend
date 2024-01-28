import React from "react";
import { isDefaultImage, makeFriendlyNumber } from "../../../utils";
import BoringAvatar from "../../atoms/Avatar/BoringAvatar";
import styled from "styled-components";

const HistoryItem = ({
  avatarImage,
  time,
  renderTitle,
  tokenPrice,
  unit,
  localRate,
  localUnit,
  username,
  onClickItem,
}: any) => {
  function getPrice(price) {
    return String(parseInt(price)).length <= 6 ? price : makeFriendlyNumber(price)
  }

  function getConversion(price) {
    return String(parseInt(price)).length <= 6 ? parseFloat(price).toLocaleString() : makeFriendlyNumber(price)
  }

  return (
    <TokenListItem onClick={onClickItem && onClickItem}>
      <Transaction>
        {!isDefaultImage(avatarImage) ? (
          <img src={`${avatarImage}?h=100&auto=format,compress`} alt="profile" />
        ) : (
          <BoringAvatar size={45} name={username} />
        )}
        <TransactionDetails>
          {renderTitle && <h4 className="">{renderTitle()}</h4>}
          <p>{time}</p>
        </TransactionDetails>
      </Transaction>
      <Amount>
        {tokenPrice && (
          <h4>
            {getPrice(tokenPrice)} {unit}
          </h4>
        )}
        {localRate && localUnit && (
          <div>
            <p>
              {getConversion(localRate)} {localUnit}
            </p>
          </div>
        )}
      </Amount>
    </TokenListItem>
  )
}

const TokenListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background-color: var(--bg-2);
  cursor: pointer;
  transition: all 0.1s linear;
  //box-shadow: 0 10px 22px -2px rgba(12, 37, 67, 0.08);
  border-radius: 6px;

  ${(props) => props.theme.media.small} {
    display: flex;
    align-items: flex-start;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

const Transaction = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
  }
`

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  h4 {
    color: ${(props) => props.theme.colors.text};
    font-size: 14px;
    font-weight: 400;
    margin: 0;

    a {
      text-decoration: none;
    }
  }

  p {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
  }
`

const Amount = styled.div`
  text-align: end;
  width: 30%;
  ${(props) => props.theme.media.small} {
    align-self: flex-end;
  }
  h4 {
    color: ${(props) => props.theme.colors.text};
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 4px;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: #11110f;
    opacity: 0.6;
    font-weight: 500;
  }
`

export default HistoryItem
