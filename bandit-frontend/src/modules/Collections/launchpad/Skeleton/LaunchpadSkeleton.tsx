import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";
import { Box } from "../../../../components/atoms/StyledSystem";
import Skeleton from "../../../../components/atoms/Skeleton";

const LaunchpadSkeleton = () => {
  return (
    <SkeletonTheme color="#808080" highlightColor="#444">
      <Wrapper>
        <CoverImageWrapper height={[230, 230, 550]}>
          <CoverImage>
            <Skeleton />
          </CoverImage>
        </CoverImageWrapper>
      </Wrapper>
    </SkeletonTheme>
  )
}

const Wrapper = styled(Box)`
  overflow: hidden;
  min-height: 300px;
`
const CoverImageWrapper = styled(Box)`
  //height: 400px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, rgba(57, 255, 20, 0) 0%, rgba(32, 34, 39, 1) 95%);
  }

  span {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const CoverImage = styled(Box)`
  width: 100%;
  height: 100%;
  object-fit: cover;

  position: absolute;
  bottom: 0;
  margin: 0 auto;
  background: transparent;
`

export default LaunchpadSkeleton
