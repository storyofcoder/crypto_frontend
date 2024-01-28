import React from "react";
import styled from "styled-components";
import { Box, Text } from "../../../components/atoms/StyledSystem";
import Skeleton from "../../../components/atoms/Skeleton";
import { SkeletonTheme } from "react-loading-skeleton";

const DropCardContainer = styled(Box)`
  height: 360px;
  position: relative;
  box-sizing: border-box;
  padding: 5px 5px 0 5px;
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 10px;
  cursor: pointer;

  a {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`

const AssetWrapper = styled(Box)`
  position: relative;
  overflow: hidden;
  border-radius: 6px;

  span {
    border-radius: 6px;
    height: 312px;
  }
`

const DropCardSkeleton = () => {
  return (
    <SkeletonTheme color="#808080" highlightColor="#444">
      <DropCardContainer>
        <AssetWrapper>
          <Skeleton />
        </AssetWrapper>
        <Text
          fontFamily="roc-grotesk"
          fontSize={18}
          fontWeight={600}
          paddingX={'5px'}
          paddingY={10}
          color="textTertiary"
        >
          <Skeleton />
        </Text>
      </DropCardContainer>
    </SkeletonTheme>
  )
}

export default DropCardSkeleton
