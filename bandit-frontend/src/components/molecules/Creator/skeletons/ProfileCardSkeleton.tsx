import React from "react";
import styled from "styled-components";
import { SkeletonTheme } from "react-loading-skeleton";

import { Box, Flex, Text } from "../../../atoms/StyledSystem";

import Skeleton from "../../../atoms/Skeleton";

const ProfileCardSkeleton = () => {
  return (
    <SkeletonTheme color="#808080" highlightColor="#444">
      <Card>
        <div className="profile">
          <div className="profile--padding" />
          <div className="profile--img-wrapper">
            <Skeleton />
          </div>
        </div>
        <div className="profile--picture-wrapper">{<Skeleton />}</div>
        <Flex pt={0} color="text" flexDirection="column" alignItems="center" mt={'-50px'}>
          <Text width={150} height={20} mb={'5px'}>
            <Skeleton />
          </Text>
          <Text width={90} height={20} mb={'10px'}>
            <Skeleton />
          </Text>
          <Flex justifyContent="space-between" width="100%">
            <Box width={90} height={10} px={15}>
              <Skeleton />
            </Box>
            <Box width={90} height={10} px={15}>
              <Skeleton />
            </Box>
          </Flex>
          <Box width={'80%'} height={35} mt={20}>
            <Skeleton />
          </Box>
        </Flex>
      </Card>
    </SkeletonTheme>
  )
}

const Card = styled(Box)`
  margin: 0px;
  min-width: 0px;
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 20px;
  border-radius: 22px;
  overflow: hidden;
  background-color: ${(p) => p.theme.colors.bg2};
  text-decoration: none;
  color: ${(p) => p.theme.colors.text};
  flex: 1;
  padding: 14px;

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

    &--padding {
      margin: 0;
      min-width: 0;
      width: 100%;
      height: 0;
      padding-bottom: 40%;
    }

    &--img-wrapper {
      box-sizing: border-box;
      margin: 0;
      min-width: 0;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      span {
        width: 100%;
        height: 100%;
        position: relative;
      }

      .react-loading-skeleton {
        position: absolute;
        top: 0;
      }
    }

    &--picture-wrapper {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      margin-left: 50%;
      overflow: hidden;
      //background-image: linear-gradient(90deg, #ffffff 0%, #d2d5da 100%);
      background-color: white;
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
    }

    //width: 120px;
    //height: 120px;
    //overflow: hidden;
    //margin: 30px auto;
    //
    //
    //img{
    //  width: 100%;
    //  height: 100%;
    //  border-radius: 50%;
    //}
  }
`

export default ProfileCardSkeleton
