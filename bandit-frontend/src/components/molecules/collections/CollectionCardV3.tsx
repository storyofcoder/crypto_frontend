import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Countdown from 'react-countdown'
import moment from 'moment'

import { CrossIcon, ThreeDotIcon, VerifiedIcon } from '../../../components/atoms/svg'
import { Box, Flex, Text } from '../../atoms/StyledSystem'
import { NextLinkFromReactRouter } from 'components/atoms/NextLink'

import DropDown from '../../atoms/Dropdown/Dropdown'
import TokenIcon from '../../atoms/svg/tokenIcon'
import mint from "../../atoms/svg/activity/mint";
import useMatchBreakpoints from "../../../hooks/useMatchBreakpoints";
import { getImageUrl } from 'utils'

const CollectionCard = ({ details, optionList = [], showDescription = true }: any) => {
  const [readMore, setReadMore] = useState(false)
  const {
    name,
    coverImage,
    profileImage,
    bio,
    isVerified,
    chainId,
    mintEnabled,
  } = details
  const isTimer = true

  const onHoverReadMore = (e) => {
    e.preventDefault()
    setReadMore(true)
  }

  const onMouseLeave = (e) => {
    e.preventDefault()
    setReadMore(false)
  }

  return (
    <CollectionCardWrapper className="collection-card" onMouseLeave={showDescription ? onMouseLeave : null}>
      <CoverImageWrapper>
        <Timer
          launchDate={details?.contract?.startDate}
          chainId={chainId}
          mintEnabled={mintEnabled}
          mintPercentage={details?.contract?.mintPercentage}
        />
        <img src={getImageUrl(coverImage, { height: 200, quality: 80 })} alt="cover image" />
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
      <MetaDataTop>
        <ProfileImageWrapper>
          <img src={getImageUrl(profileImage, { height: 100, quality: 80 })} alt="profile image" />
        </ProfileImageWrapper>
        <Box width={'100%'}>
          <StyledText fontSize="16px" fontWeight={600}>
            {name} {isVerified && <VerifiedIcon />}
          </StyledText>
          <Flex>
            <Text fontSize="12px" fontWeight={500} color="text" textAlign="left" mr={'4px'}>
              by{' '}
            </Text>
            <StyledText fontSize="12px" fontWeight={500} textAlign="left">
              @{name || 'Name'}
            </StyledText>
          </Flex>

          <CollectionDetails details={details} chainId={chainId} />
        </Box>
      </MetaDataTop>
      {showDescription && (
        <Box mt="14px" minHeight={'57px'}>
          <DescriptionText>
            {bio?.length > 130 ? (
              <>
                {bio?.substr(0, 130)}
                {'... '}
                <b onClick={onHoverReadMore}>Read More</b>
              </>
            ) : (
              bio
            )}
            <DescriptionOverlay show={readMore}>
              <StyledCrossIcon onClick={onMouseLeave} />
              <Description>
                <Text fontSize={12} fontWeight={500} color="foreground" lineHeight={'19px'}>
                  {bio}
                </Text>
              </Description>
            </DescriptionOverlay>
          </DescriptionText>
        </Box>
      )}
    </CollectionCardWrapper>
  )
}

const Timer = ({ launchDate, chainId , mintEnabled= false, mintPercentage}) => {
  const [timePassed, setTimePassed] = useState(false)
  const onComplete = () => {
    setTimePassed(true)
  }

  const renderer = ({ formatted }) => {
    return (
      <StyledText fontSize={12} fontWeight={600} color="white;">
        Starts in - {formatted.days}D : {formatted.hours}H : {formatted.minutes}M : {formatted.seconds}S
      </StyledText>
    )
  }


  const hasStarted =  moment.unix(launchDate).isBefore(moment())


  const hideTimer = timePassed || !launchDate || hasStarted

  const soldOut = mintPercentage >= 100

  return (
    <TimerWrapper >
      <Box mr="auto">
        {!soldOut && mintEnabled && hasStarted ? <Text fontSize={12} fontWeight={600} color="white">Mint Now</Text> : <Text fontSize={12} fontWeight={600} color="white">
          {soldOut ? "Sold Out" : hasStarted ?   "Mint Live" : ""}</Text>}
        {!hasStarted && !hideTimer && <Countdown date={moment.unix(launchDate).toDate()} renderer={renderer} onComplete={onComplete} />}
      </Box>
        <Chain>
          <TokenIcon width={16} height={16} chainId={chainId} />
        </Chain>
    </TimerWrapper>
  )
}

const CollectionDetails = ({ details, chainId }) => {
 const {isMobile} = useMatchBreakpoints()
  const { contract } = details

  return (
    <Flex justifyContent="space-between" mt={'10px'}>
      <StatsBox
        mr="5px"
        value={`${contract?.mintPercentage}%`}
        title="Mint %"
        tokenIcon={false}
        showValue={!!contract?.mintPercentage}
        chainId={chainId}
      />
      {!isMobile && <StatsBox mr="5px" value={contract?.maxMint} title="Total Supply" tokenIcon={false} chainId={chainId} />}
      <StatsBox
        mr="0px"
        value={contract?.price}
        title="Mint Price"
        tokenIcon={true}
        showValue={!!contract?.price}
        chainId={chainId}
      />
    </Flex>
  )
}

const StatsBox = ({ title, value, tokenIcon = false, showValue = true, mr, chainId }) => {
  return (
    <Box mr={mr}>
      <Box>
        <Text fontSize={12} fontWeight={400} lineHeight="15px" color="text" mb={'5px'}>
          {title}
        </Text>
        <Flex alignItems="center">
          {showValue ? (
            <>
              {tokenIcon && <TokenIcon width={12} height={12} chainId={chainId} />}
              <Text fontSize={12} fontWeight={700} lineHeight="15px" textAlign={'center'} ml={'2px'}>
                {value || 0}
              </Text>
            </>
          ) : (
            <Text lineHeight="18px">--</Text>
          )}
        </Flex>
      </Box>
    </Box>
  )
}

const DescriptionPopoverText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  word-break: break-all;

  font-size: 10px;
`

const CollectionCardWrapper = styled(Box)`
  background-color: ${(p) => p.theme.colors.background};
  border: 1px solid;
  border-color: ${(p) => p.theme.colors.cardBorder};
  box-shadow: ${(p) => p.theme.colors.shadows.small};
  border-radius: 12px;
  overflow: hidden;
  padding: 10px;
  position: relative;

  &:hover {
    background-color: ${(p) => p.theme.colors.background};
    border-color: ${(p) => p.theme.colors.foreground};
  }
`
const CoverImageWrapper = styled(Box)`
  width: 100%;
  height: 120px;
  position: relative;
  border-radius: 10.96px 10.96px 0px 0px;
  overflow: hidden;
  background-color: ${({theme})=>theme.colors.backgroundAlt};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const MetaDataTop = styled(Flex)`
  grid-gap: 14px;
  margin-top: 14px;
`

const ProfileImageWrapper = styled(Box)`
  min-width: 100px;
  width: 95px;
  height: 95px;
  min-width: 95px !important;
  background-color: ${({theme})=>theme.colors.backgroundAlt};


  border-radius: 12%;
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
    background-color: ${(p) => p.theme.colors.text};
  }
`

const DescriptionText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  cursor: pointer;

  font-size: 12px;
  font-weight: 400;
  line-height: 19px;
  color: ${(p) => p.theme.colors.text};

  b {
    &:hover {
      border-bottom: 2px solid;
      border-color: ${(p) => p.theme.colors.foreground};
    }
  }
`
const DescriptionOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  margin-top: 100%;
  background-color: ${(p) => p.theme.colors.backgroundAlt};
  z-index: 4;
  transition: all 0.2s ease-out;

  ${({ show }) =>
    show &&
    css`
      height: 100%;
      margin-top: 0;
      padding: 10px;
    `}
`

const Description = styled(Flex)`
  word-break: break-word;
  overflow: scroll;
  height: 100%;
  position: relative;
`
const StyledCrossIcon = styled(CrossIcon)`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 10px;
  height: 10px;
`

const StyledText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  cursor: pointer;
`

const INO = styled(Text)`
  margin-top: -15px;
  background-color: ${(p) => p.theme.colors.background};
  padding: 5px 8px;
  border-radius: 10px;
  z-index: 2;

  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TimerWrapper = styled(Flex)`
  position: absolute;
  bottom: 0;
  z-index: 2;
  border-radius: 0;
  padding: 5px 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  
  -webkit-backdrop-filter: blur(46px);
  backdrop-filter: blur(46px);
  background: rgba(0, 0, 0, 0.2);

`
const Chain = styled(Box)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default CollectionCard
