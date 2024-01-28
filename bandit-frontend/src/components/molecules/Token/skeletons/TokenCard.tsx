import React from "react";
import styled from "styled-components";

import { Skeleton } from "../../../atomsV2/Skeleton";
import { Flex } from "../../../atoms/StyledSystem";

const TokenDetailWrapper = styled.div`
  padding: 10px;
`

const TokenCardSkeletonWrapper = styled.div`
  text-decoration: none;
  box-shadow: 0px 2px 8px rgb(0 0 0 / 25%);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.1s linear;
  background-color: ${(props) => props.theme.colors.bg2};
  min-width: 0;

  .token-card-skeleton__img-wrapper {
    object-fit: contain;
    position: relative;
    margin: 0;
    min-width: 0;

    .nft-asset {
      min-height: 259px;
      border-radius: 0;
    }
  }
`

const NFTFooter = styled(Flex)`
  border-top: 1px solid ${(props) => props.theme.colors.inputSecondary};
  justify-content: space-between;
  padding-top: 10px;
  margin-top: 10px;
  .price {
    min-height: 12px;
    width: 20%;
  }
`

const TokenCardSkeleton = () => {
  return (
    <TokenCardSkeletonWrapper>
      <div className="token-card-skeleton__img-wrapper">
        <Skeleton className="nft-asset" />
      </div>
      <TokenDetailWrapper>
        <Skeleton mb={1} minHeight={12} width={'50%'} />
        <Skeleton minHeight={16} width={'75%'} />

        <NFTFooter>
          <Skeleton className="price" />
          <Skeleton className="price" />
        </NFTFooter>
      </TokenDetailWrapper>
    </TokenCardSkeletonWrapper>
  )
}

export default TokenCardSkeleton
