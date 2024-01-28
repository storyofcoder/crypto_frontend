import React from 'react'
import styled from 'styled-components'

import { ThreeDotIcon } from '../../../components/atoms/svg'
import { Box, Flex, Text } from '../../atoms/StyledSystem'

import DropDown from '../../atoms/Dropdown/Dropdown'

const CollectionCard = ({ details, optionList = [], showDetails = true }: any) => {
  const { name, coverImage, profileImage } = details

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
      <Flex mb={20}>
        <ProfileImageWrapper m={'16px 16px 0 16px'}>
          <img src={profileImage} alt="profile image" />
        </ProfileImageWrapper>
        <Box m={1}>
          <StyledText fontSize="12px" fontWeight={500} mt={1} color="textSubtle" textAlign="left">
            {name || 'Name'}
          </StyledText>
          <StyledText fontSize="16px" fontWeight={600} color="text" lineHeight="1">
            {name || 'Name'}
          </StyledText>
        </Box>
      </Flex>
      {showDetails && <CollectionDetails details={details} />}
    </CollectionCardWrapper>
  )
}

const CollectionDetails = ({ details }) => {
  const { statistics } = details
  return (
    <Flex ml={20} mr={20} mb={20} justifyContent="space-between">
      <Box>
        <Text fontSize={12} fontWeight={500} lineHeight="15px" color="textSubtle">
          Floor price
        </Text>
        <Text fontSize={14} fontWeight={500} lineHeight="17px" color="text" textAlign="center" mt={2}>
          0.1
        </Text>
      </Box>
      <Box>
        <Text fontSize={12} fontWeight={500} lineHeight="15px" color="textSubtle">
          Traded Vol
        </Text>
        <Text fontSize={14} fontWeight={500} lineHeight="17px" color="text" textAlign="center" mt={2}>
          10k
        </Text>
      </Box>
      <Box>
        <Text fontSize={12} fontWeight={500} lineHeight="15px" color="textSubtle">
          Total Supply
        </Text>
        <Text fontSize={14} fontWeight={500} lineHeight="17px" color="text" textAlign="center" mt={2}>
          {!!statistics?.items && statistics?.items}
        </Text>
      </Box>
    </Flex>
  )
}

const CollectionCardWrapper = styled(Box)`
  background-color: ${(p) => p.theme.colors.bg2};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  overflow: hidden;
`
const CoverImageWrapper = styled(Box)`
  width: 100%;
  height: 180px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`
const ProfileImageWrapper = styled(Box)`
  min-width: 100px;
  width: 100px;
  height: 100px;
  margin-top: -40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 1;
  border: 2px solid ${(p) => p.theme.colors.background};

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
const StyledText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
`

export default CollectionCard
