import React from 'react'
import styled from 'styled-components'
import ReadMoreAndLess from 'react-read-more-less'
import { CoverImage, CoverImageWrapper, DetailsWrapper, ProfileContainer, ProfileImage } from './styles'
import BackgroundImage from '../../../../components/atomsV2/Image/BackgroundImage'
import { Box, Flex, Text } from '../../../../components/atoms/StyledSystem'
import { Heading } from '../../../../components/atomsV2/Heading'
import CopyAddress from '../../../../components/atomsV2/CopyAddress'
import InstagramIcon from '../../../../components/atoms/svg/social-media/instagram'
import { DiscordIcon, TwitterIcon, WebsiteIcon } from '../../../../components/atoms/svg'
import useTheme from '../../../../hooks/useTheme'
import { Button } from '../../../../components/atomsV2/Button'
import Stats from './Stats'
import { DISCORD, INSTAGRAM, TWITTER } from 'constant/socialMedia'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import { getImageUrl } from 'utils'
import { Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

const Icon = styled.a`
  display: flex;
  margin-right: 10px;
  position: relative;
`

const Description = styled(Box)`
  font-size: 14px;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};

  .readMoreText {
    color: ${({ theme }) => theme.colors.foreground} !important;
  }

  ${(p) => p.theme.media.md} {
    width: 60%;
  }
`

const PopoverWrapper = styled.div`
  position: absolute;
  right: -3px;
  top: 4px;

  svg {
    height: 13px;
    fill: red;
  }
`

const CollectionDetails = (props) => {
  const { isDesktop } = useMatchBreakpoints()

  const { theme } = useTheme()

  const {
    name,
    contractAddress,
    bio = '',
    isVerified,
    profileImage,
    coverImage,
    statistics,
    socialMedia,
    canEdit,
    contract,
    chainId,
  } = props
  const { twitter, instagram, website, discord } = socialMedia || {}
  const { price, totalSupply, mintPercentage } = contract || {}
  return (
    <ProfileContainer>
      <CoverImageWrapper>
        <CoverImage src={getImageUrl(coverImage, { height: 250, quality: 80 })} />

        <DetailsWrapper>
          <Flex>
            <Flex alignItems="center">
              <ProfileImage>
                <BackgroundImage
                  src={getImageUrl(profileImage, { height: 120, quality: 80 })}
                  width={isDesktop ? 120 : 96}
                  height={isDesktop ? 120 : 96}
                />
              </ProfileImage>
              {isDesktop && (
                <Box ml={20}>
                  <MetaData
                    name={name}
                    bio={bio}
                    contractAddress={contractAddress}
                    socialMedia={socialMedia}
                    chainId={chainId}
                  />
                </Box>
              )}
            </Flex>
            <Flex ml="auto" justifyContent="space-between" alignItems={['end', 'end', 'end', 'start']}>
              {!isDesktop && <CollectionLinks socialMedia={socialMedia} />}
              {canEdit && (
                <Box>
                  <Button variant="default" scale="sm" mr={10}>
                    Edit
                  </Button>
                </Box>
              )}
            </Flex>
          </Flex>

          {!isDesktop && (
            <Box mt={3}>
              <MetaData
                name={name}
                bio={bio}
                contractAddress={contractAddress}
                socialMedia={socialMedia}
                chainId={chainId}
              />
            </Box>
          )}
        </DetailsWrapper>
      </CoverImageWrapper>
      <Stats {...contract} chainId={chainId} />
    </ProfileContainer>
  )
}

const CollectionLinks = ({ socialMedia }) => {
  const { theme } = useTheme()
  const { twitter, instagram, website, discord } = socialMedia || {}

  return (
    <Flex height={'40px'} ml={20}>
      <IconWrapper href={website} Iconfor={"Website"}>
        <WebsiteIcon iconcolor={theme.colors.text} />
      </IconWrapper>
      <IconWrapper href={instagram && `${INSTAGRAM}${instagram}`} Iconfor={'Instagram'}>
        <InstagramIcon iconcolor={theme.colors.text} />
      </IconWrapper>
      <IconWrapper href={discord && `${DISCORD}${discord}`} Iconfor={'Discord'}>
        <DiscordIcon iconcolor={theme.colors.text} />
      </IconWrapper>
      <IconWrapper href={twitter && `${TWITTER}${twitter}`} Iconfor={'Twitter'}>
        <TwitterIcon iconcolor={theme.colors.text} />
      </IconWrapper>
    </Flex>
  )
}

const IconWrapper = ({ href, children, Iconfor }) => {
  return (
    <Icon href={href || undefined} target="_blank">
      {children}
      {!href && (
        <PopoverWrapper>
          <Popover
            content={() => (
              <Text fontSize="12px" p={10}>
                {Iconfor} not available
              </Text>
            )}
          >
            <Flex alignItems="center">
              <InfoCircleOutlined style={{ cursor: 'pointer' }} />
            </Flex>
          </Popover>
        </PopoverWrapper>
      )}
    </Icon>
  )
}

const MetaData = ({ name, bio, contractAddress, socialMedia, chainId }) => {
  const { isDesktop } = useMatchBreakpoints()
  return (
    <>
      <Heading scale="md" color="foreground">
        {name}
      </Heading>
      <Flex alignItems="center">
        <CopyAddress address={contractAddress} addressLength={6} chainId={chainId} />
        {isDesktop && <CollectionLinks socialMedia={socialMedia} />}
      </Flex>
      <Description>
        <ReadMoreAndLess className="read-more-content" charLimit={100} readMoreText="  More" readLessText="  Less">
          {bio || ''}
        </ReadMoreAndLess>
      </Description>
    </>
  )
}

export default CollectionDetails
