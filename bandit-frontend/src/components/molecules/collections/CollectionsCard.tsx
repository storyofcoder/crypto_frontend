import React from "react";
import moment from "moment";
import Countdown from "react-countdown";
import styled from "styled-components";

import { ThreeDotIcon } from "../../../components/atoms/svg";
import { Box, Flex, Text } from "../../atoms/StyledSystem";
import { NextLinkFromReactRouter } from "../../atoms/NextLink";
import { makeFriendlyNumber, pad } from "../../../utils";

import DropDown from "../../atoms/Dropdown/Dropdown";

const CollectionCard = ({ details, optionList = [], type = null, cardType }: any) => {
  const { name, bio, coverImage, profileImage, TotalVolumeByUnit, changePercent, collectionOwner, contract } = details

  let footer = (
    <StyledDescription fontSize="14px" fontWeight={500} color="text6" mt={10}>
      {bio || 'Description'}
    </StyledDescription>
  )

  if (cardType === 'STATS') {
    footer = (
      <>
        <Text textAlign="center" fontSize={'11px'} color="text" opacity="0.6" height={17}>
          {collectionOwner && (
            <NextLinkFromReactRouter to={`/${collectionOwner}`} style={{ color: '#000000' }}>
              By @{collectionOwner}
            </NextLinkFromReactRouter>
          )}
        </Text>
        <Flex justifyContent="space-evenly" mt={13}>
          <Text color="text" fontSize="14px" fontWeight="600" lineHeight={'28px'}>
            <span style={{ fontWeight: 400 }}>Vol. </span>
            {TotalVolumeByUnit?.value} {TotalVolumeByUnit?.unit}
          </Text>
          <Text
            lineHeight={'28px'}
            fontSize="14px"
            color={changePercent.includes('-') ? '#E11900' : '#05944F'}
            fontWeight="600"
          >
            {changePercent.includes('-') ? changePercent : '+' + changePercent}%
          </Text>
        </Flex>
      </>
    )
  }

  if (cardType === 'DETAILS') {
    footer = <CollectionDetails type={type} contract={contract} />
  }

  return (
    <CollectionCardWrapper className="collection-card">
      <CoverImageWrapper>
        <img src={coverImage} alt="cover image" />
        {!!optionList.length && (
          <DropDown
            trigger={['click']}
            placement="bottomRight"
            optionList={optionList}
            customButton={() => (
              <OptionDropdown>
                <ThreeDotIcon style={{ width: '15px', height: '15px' }} />
              </OptionDropdown>
            )}
          />
        )}
      </CoverImageWrapper>
      <ProfileImageWrapper>
        <img src={profileImage} alt="profile image" />
      </ProfileImageWrapper>
      <StyledText fontSize="18px" fontWeight={700} mt={10} color="text" lineHeight="22px">
        {name || 'Name'}
      </StyledText>
      {footer}
    </CollectionCardWrapper>
  )
}

const CollectionDetails = ({ type, contract }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return null
    } else {
      return (
        <>
          {days > 0 && `${pad(days, 2)}d`} {`${pad(hours, 2)} :`} {`${pad(minutes, 2)} :`} {pad(seconds, 2)}
        </>
      )
    }
  }
  return (
    <>
      {type && (
        <Text
          textAlign="center"
          fontSize={'14px'}
          color="text"
          // opacity="0.6"
          mt={10}
          fontWeight={700}
        >
          {type === 'ongoing' ? (
            'Live'
          ) : type === 'ended' ? (
            'Sold out'
          ) : (
            <>
              <span style={{ opacity: '0.6' }}>Starts in </span>
              <Countdown date={moment.unix(contract?.collectionReleaseDate).utc().toDate()} renderer={renderer} />
            </>
          )}
        </Text>
      )}

      <Flex mt={10} ml={30} mr={30} justifyContent="space-between">
        <Text fontSize={14} color="text">
          Price: <span style={{ fontWeight: 600 }}>{contract.price} BNB</span>
        </Text>
        <Text fontSize={14} color="text">
          Items: <span style={{ fontWeight: 600 }}>{makeFriendlyNumber(contract.totalSupply)}</span>
        </Text>
      </Flex>
    </>
  )
}

const CollectionCardWrapper = styled(Box)`
  padding: 14px;
  background-color: ${(p) => p.theme.colors.bg2};
  border-radius: 22px;
  transition: all 0.2s linear;

  &:hover {
    transform: translateY(-10px);
  }
`
const CoverImageWrapper = styled(Box)`
  width: 100%;
  height: 120px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border-radius: 22px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`
const ProfileImageWrapper = styled(Box)`
  width: 115px;
  height: 115px;
  margin: -70px auto 0 auto;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const OptionDropdown = styled(Box)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 3;
  margin-left: 5px;
  position: absolute;
  top: 4%;
  right: 4%;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    //transform: scale(1.05);
    background-color: ${(p) => p.theme.colors.text};
  }
`
const StyledText = styled(Text)`
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  word-break: break-all;
`

const StyledDescription = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
  height: 47px;
  word-break: break-all;
  margin: 10px auto 0 auto;
`

export default CollectionCard
