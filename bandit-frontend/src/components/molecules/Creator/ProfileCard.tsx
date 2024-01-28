import React, { useEffect, useState } from "react";
import startCase from "lodash/startCase";
import styled from "styled-components";
// import Link from "next/link";
import { Box, Flex, Text } from "../../atoms/StyledSystem";
import { isDefaultImage, makeFriendlyNumber, truncateUsername } from "../../../utils";
import { VerifiedIcon } from "../../../components/atoms/svg";
import { NextLinkFromReactRouter } from "../../atoms/NextLink";

import BoringAvatar from "../../atoms/Avatar/BoringAvatar";
import Button from "../../atoms/Button/Button";

const ProfileCard = ({ creator, to, handleFollow, isFollowing, stats, showFollow }: any) => {
  const [buttonCaption, setButtonCaption] = useState('Follow')
  const { profileImage, name, username, coverImage, is_verified } = creator

  useEffect(() => {
    if (isFollowing) {
      setButtonCaption('Following')
    } else {
      setButtonCaption('Follow')
    }
  }, [isFollowing])

  function onMouseHover() {
    setButtonCaption('Unfollow')
  }
  function onMouseOut() {
    setButtonCaption('Following')
  }

  function onButtonClick(e) {
    e.preventDefault()
    if (handleFollow) {
      handleFollow(isFollowing, username)
    }
  }

  return (
    <Card>
      <NextLinkFromReactRouter to={`${to}`}>
        <>
          <div className="profile">
            <div className="profile--padding" />
            <div
              className="profile--img-wrapper"
              style={{
                backgroundImage: `url("${coverImage}?w=640&auto=format,compress")`,
              }}
            />
          </div>
          <div className="profile--picture-wrapper">
            {!isDefaultImage(profileImage) ? (
              <img src={`${profileImage}?h=300&auto=format,compress`} alt="profile" />
            ) : (
              <BoringAvatar size={100} name={username} />
            )}
          </div>
          <Flex pt={0} color="text" flexDirection="column" alignItems="center" mt={'-50px'}>
            <Flex alignItems="center">
              <Title fontSize={16} fontWeight={700}>
                {startCase(name)}
              </Title>
              {is_verified && (
                <VerifiedIconWrapper style={{ marginLeft: '4px' }}>
                  <VerifiedIcon />
                </VerifiedIconWrapper>
              )}
            </Flex>

            <Text fontSize={14} fontWeight={500} mb={10} opacity="0.6">
              @{truncateUsername(username)}
            </Text>
            <Flex justifyContent="space-between" width="100%">
              {stats.map((item, index) => (
                <Flex fontSize={12} key={index}>
                  <Text fontSize={12} fontWeight={700} mr={'3px'}>
                    {makeFriendlyNumber(item.value || 0)}
                  </Text>{' '}
                  <Text fontSize={12}>{startCase(item.name)}</Text>
                </Flex>
                // <Box
                //   key={index}
                //   px={15}
                //   borderRight={index !== stats.length - 1 ? "1px solid" : ""}
                // >
                //   <Text
                //     fontSize={28}
                //     fontWeight={600}
                //     textAlign="center"
                //     lineHeight={"100%"}
                //   >
                //     {makeFriendlyNumber(item.value || 0)}
                //   </Text>
                //   <Text fontSize={12} textAlign="center">
                //     {item.name}
                //   </Text>
                // </Box>
              ))}
            </Flex>
            {!!showFollow && (
              <ActionButton
                variant="primaryLight"
                mt={20}
                minWidth={120}
                width="100%"
                {...(isFollowing && {
                  onMouseEnter: onMouseHover,
                  onMouseLeave: onMouseOut,
                })}
                onClick={onButtonClick}
              >
                {buttonCaption}
              </ActionButton>
            )}
          </Flex>
        </>
      </NextLinkFromReactRouter>
    </Card>
  )
}

const Card = styled(Box)`
  margin: 0px;
  min-width: 0px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 10px -2px #e7e5de;
  border-radius: 22px;
  overflow: hidden;
  background-color: ${(p) => p.theme.colors.bg2};
  text-decoration: none;
  color: ${(p) => p.theme.colors.text};
  flex: 1;
  transition: all 0.2s linear;
  padding: 14px;

  &:hover {
    transform: translateY(-10px);
  }

  .profile {
    margin: 0;
    min-width: 0;
    position: relative;
    overflow: hidden;
    border-radius: 22px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);

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
      background-image: linear-gradient(90deg, #ffffff 0%, #d2d5da 100%);
    }

    &--picture-wrapper {
      width: 120px;
      height: 120px;
      position: relative;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      margin-left: 50%;
      background-image: linear-gradient(90deg, #ffffff 0%, #d2d5da 100%);

      img,
      svg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        min-height: 100%;
        min-width: 100%;
        object-fit: cover;
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

const Title = styled(Text)`
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-weight: 600;
  color: ${(p) => p.theme.colors.textTertiary};

  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  position: relative;
  word-break: break-all;
  line-height: 1.5;

  &:after {
    content: ' ';
    font-size: 0;
    white-space: pre;
  }
`

const VerifiedIconWrapper = styled.div`
  width: 16px;
  height: 16px;

  svg {
    vertical-align: text-top;
  }
`

const ActionButton = styled(Button)`
  font-size: 14px;
`

export default ProfileCard
