import React from "react";
import styled from "styled-components";
import { SkeletonTheme } from "react-loading-skeleton";

import Skeleton from "../../../atoms/Skeleton";

import { Box, Flex, Text } from "../../../atoms/StyledSystem";

const ProfileCardSkeleton = () => {
  return (
    <SkeletonTheme color="#808080" highlightColor="#444">
      <Card>
        <Text width={[100, 150, 200, 200]} height={[16, 18, 20, 20]} mb={'20px'} mt={'20px'}>
          <Skeleton />
        </Text>
        <Flex justifyContent={'space-between'}>
          <Flex>
            <div className="profile--picture-wrapper">{<Skeleton />}</div>
            <Box>
              <TopText width={[80, 180, 280, 300]} height={[10, 18, 18, 18]} ml={[10, 15, 30, 30]}>
                <Skeleton />
              </TopText>
              <BottomText width={[70, 150, 200, 200]} height={[8, 12, 14, 14]} ml={[10, 15, 30, 30]}>
                <Skeleton />
              </BottomText>
            </Box>
          </Flex>
          <Box>
            <div className="profile--picture-wrapper2">{<Skeleton />}</div>
          </Box>
        </Flex>
        <Flex justifyContent={'space-between'} mt={20}>
          <Flex>
            <div className="profile--picture-wrapper">{<Skeleton />}</div>
            <Box>
              <TopText width={[80, 180, 280, 300]} height={[10, 16, 18, 18]} ml={[10, 15, 30, 30]}>
                <Skeleton />
              </TopText>
              <BottomText width={[70, 150, 200, 200]} height={[8, 12, 14, 14]} ml={[10, 15, 30, 30]}>
                <Skeleton />
              </BottomText>
            </Box>
          </Flex>
          <Box>
            <div className="profile--picture-wrapper2">{<Skeleton />}</div>
          </Box>
        </Flex>
        <Flex justifyContent={'space-between'} mt={20}>
          <Flex>
            <div className="profile--picture-wrapper">{<Skeleton />}</div>
            <Box>
              <TopText width={[80, 180, 280, 300]} height={[10, 16, 18, 18]} ml={[10, 15, 30, 30]}>
                <Skeleton />
              </TopText>
              <BottomText width={[70, 150, 200, 200]} height={[8, 12, 14, 14]} ml={[10, 15, 30, 30]}>
                <Skeleton />
              </BottomText>
            </Box>
          </Flex>
          <Box>
            <div className="profile--picture-wrapper2">{<Skeleton />}</div>
          </Box>
        </Flex>
      </Card>
    </SkeletonTheme>
  )
}
const TopText = styled(Text)`
  margin-bottom: 20px;
  ${(p) => p.theme.media.xxs} {
    margin-bottom: 10px;
  }
`

const BottomText = styled(Text)`
  margin-top: 20px;
  ${(p) => p.theme.media.xxs} {
    margin-top: 10px;
  }
`

const Card = styled(Box)`
  margin: 0px;
  min-width: 0px;
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 20px;
  overflow: hidden;
  text-decoration: none;
  color: ${(p) => p.theme.colors.text};
  flex: 1;

  span {
    width: 100%;
    height: 100%;
  }

  .profile {
    margin: 0;
    min-width: 0;
    position: relative;
    overflow: hidden;
    border-radius: 22px;

    &--picture-wrapper {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;

      span {
        width: 100%;
        height: 100%;
      }

      .react-loading-skeleton {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
      }
      ${(p) => p.theme.media.xs} {
        width: 50px;
        height: 50px;
      }
      ${(p) => p.theme.media.xxs} {
        width: 30px;
        height: 30px;
      }
    }
    &--picture-wrapper2 {
      width: 70px;
      height: 70px;
      border-radius: 15%;
      overflow: hidden;
      position: relative;

      span {
        width: 100%;
        height: 100%;
      }

      .react-loading-skeleton {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
      }
      ${(p) => p.theme.media.xs} {
        width: 50px;
        height: 50px;
      }
      ${(p) => p.theme.media.xxs} {
        width: 30px;
        height: 30px;
      }
    }
  }
`

export default ProfileCardSkeleton
