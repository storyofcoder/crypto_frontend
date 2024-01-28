import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

import { Box, Flex } from "../../../atoms/StyledSystem";

import Skeleton from "../../../atoms/Skeleton";

const ProfileDetailsLayoutSkeleton = () => {
  return (
    <SkeletonTheme color="#808080" highlightColor="#444">
      <Wrapper>
        <CoverImageWrapper height={[230]}>
          <CoverImage>
            <Skeleton />
          </CoverImage>
        </CoverImageWrapper>
        <DetailsWrapper>
          <Details>
            <Flex alignItems="center">
              <ProfileImageWrapper>
                <Skeleton />
              </ProfileImageWrapper>
              <SkeletonText height={50}>
                <Skeleton />
              </SkeletonText>
              <Box className="w-100">
                <SkeletonText height={[10, 10, 50, 50]} pl={30}>
                  <Skeleton />
                  <Skeleton />
                </SkeletonText>
              </Box>
            </Flex>
          </Details>
        </DetailsWrapper>
      </Wrapper>
    </SkeletonTheme>
  )
}

const Wrapper = styled(Box)`
  border-radius: 32px;
  overflow: hidden;
  min-height: 400px;
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
    background: linear-gradient(180deg, rgba(57, 255, 20, 0) 0%, rgba(32, 34, 39, 1) 95%);
    border-radius: 32px;
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

const DetailsWrapper = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
`
const Details = styled(Box)`
  padding: 0 5%;
  color: ${(p) => p.theme.colors.bg2};
  position: relative;
  // max-width: 1400px;
  margin: auto auto 0 auto;
  width: 100%;

  //&:before{
  //  content: '';
  //  position: absolute;
  //  top: -80px;
  //  left: 0;
  //  width: 120%;
  //  height: 100px;
  //  background-color: #202227;
  //  filter: blur(10px);
  //}
`

const ProfileImageWrapper = styled(Box)`
  width: 230px;
  min-width: 230px;
  height: 230px;
  background: lightgrey;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${(p) => p.theme.colors.bg2};
  span {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${(p) => p.theme.media.xs} {
    width: 92px;
    height: 92px;
    min-width: 92px;
  }
`

const SkeletonText = styled(Box)`
  span {
    width: 100%;
    height: 100%;
  }
`

export default ProfileDetailsLayoutSkeleton
