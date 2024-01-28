import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import AvatarSkeleton from "../../../atoms/Avatar/skeleton/Avatar";
import Skeleton from "../../../atoms/Skeleton";
import styled from "styled-components";

const HistoryItemSkeleton = () => {
  return (
    <SkeletonTheme color="#808080" highlightColor="#444">
      <TokenListItemSkeleton>
        <div className="token-list-item-skeleton--transaction">
          <AvatarSkeleton />
        </div>
        <div className="token-list-item-skeleton--amount">
          <h4>
            <Skeleton />
          </h4>

          <p>
            <Skeleton />
          </p>
        </div>
      </TokenListItemSkeleton>
    </SkeletonTheme>
  )
}

const TokenListItemSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background-color: var(--bg-2);
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.1s linear;
  //box-shadow: 0 10px 22px -2px rgba(12, 37, 67, 0.08);
  border-radius: 6px;
  &:hover {
    transform: scale(1.01);
  }

  &:last-child {
    margin-bottom: 0 !important;
  }

  .token-list-item-skeleton--transaction {
    display: flex;
    align-items: center;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }

  .token-list-item-skeleton--transaction-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    h4 {
      color: ${(p) => p.theme.colors.text};
      font-size: 15px;
      font-weight: 600;
      margin: 0;

      a {
        color: ${(p) => p.theme.colors.textSecondary} !important;
        text-decoration: none;
      }
    }

    p {
      margin: 0;
      font-size: 12px;
      font-weight: 500;
    }
  }

  .token-list-item-skeleton--amount {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
    width: 30%;
    h4 {
      color: ${(p) => p.theme.colors.text};
      font-weight: 800;
      font-size: 16px;
      min-height: 20px;
      width: 60%;
    }

    p {
      margin: 0;
      font-size: 12px;
      min-height: 10px;
      width: 40%;
    }
  }
`

export default HistoryItemSkeleton
