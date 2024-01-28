import React from 'react'
import styled from 'styled-components'

import { truncateUsername } from '../../../../utils'
import { Box, Flex } from '../../../../components/atoms/StyledSystem'
import {
  ActionButtonWrapper,
  CoverImage,
  CoverImageWrapper,
  DetailsWrapper,
  EditIconWrapper,
  ProfileContainer,
  ProfileImage,
} from '../../../../views/Profile/components/ProfileDetails/styles'
import { Button } from '../../.././../components/atomsV2/Button'
import { ProfileAvatar } from 'components/atomsV2/Image'
import { Heading } from 'components/atomsV2/Heading'
import { PencilOutlineIcon } from 'components/atoms/svg/images2'
import InstagramIcon from '../../../../components/atoms/svg/social-media/instagram'

import UploadInput from '../../../../components/atoms/Form/UploadInput'
import CopyAddress from 'components/atomsV2/CopyAddress'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import useTheme from '../../../../hooks/useTheme'
import { useRouter } from 'next/router'
import { ChatIcon, DiscordIcon, TwitterIcon } from 'components/atoms/svg'
import { DISCORD, INSTAGRAM, TWITTER } from 'constant/socialMedia'

const Desktop = ({
  profileInfo = {},
  uploadCoverImage,
  uploadProfileImage,
  showChat = false,
  socialmedia,
  isEdit = false,
}: any) => {
  const { isMobile } = useMatchBreakpoints()
  const router = useRouter()

  function onChangeCoverImage(file: any) {
    uploadCoverImage(file)
  }
  function onChangePhotoImage(file: any) {
    uploadProfileImage(file)
  }

  const onClickChat = (address) => {
    window.open(`https://chat.blockscan.com/index?a=${address}`)
  }

  return (
    <EditProfileLayout>
      <ProfileContainer>
        <CoverImageWrapper>
          <CoverImage src={profileInfo?.coverImage} />
          <DetailsWrapper>
            {isEdit && (
              <Box position={'absolute'} top={'10px'} right={'40px'}>
                <Box ml="auto">
                  <UploadInput
                    id="cover-photo"
                    onChange={onChangeCoverImage}
                    customButton={() => (
                      <Button variant="default" scale="sm">
                        Upload Cover Photo
                      </Button>
                    )}
                    maxSize={5}
                    accept={'image/png, image/jpeg, image/webp,  image/gif'}
                  />
                </Box>
              </Box>
            )}
            <Flex alignItems="center">
              <Box position="relative">
                {isEdit && (
                  <ProfileImageWrapper>
                    <UploadInput
                      id="profile-pic"
                      customButton={() => <PencilOutlineIcon />}
                      onChange={onChangePhotoImage}
                      maxSize={5}
                      accept={'image/png, image/jpeg, image/webp, image/gif'}
                    />
                  </ProfileImageWrapper>
                )}
                <ProfileImage>
                  {profileInfo?.profileImage ||
                    (profileInfo?.username && (
                      <ProfileAvatar
                        width={120}
                        height={120}
                        src={profileInfo?.profileImage}
                        walletAddress={profileInfo?.username}
                      />
                    ))}
                </ProfileImage>
              </Box>

              <Box ml={20}>
                <Flex alignItems="center">
                  <Heading scale="lg" color="text">
                    {truncateUsername(profileInfo?.username)}
                  </Heading>
                  <Box ml={20}>
                    <ProfileLinks socialmedia={socialmedia} />
                  </Box>
                </Flex>
                <CopyAddress mt={10} address={profileInfo?.walletAddress} addressLength={6} />
              </Box>
            </Flex>
            {!isEdit && (
              <ActionButtonWrapper ml="auto" alignSelf="end">
                {showChat ? (
                  isMobile ? (
                    <EditIconWrapper scale="sm" mr={10} onClick={() => onClickChat(profileInfo?.walletAddress)}>
                      <ChatIcon />
                    </EditIconWrapper>
                  ) : (
                    <Button variant="default" scale="sm" onClick={() => onClickChat(profileInfo?.walletAddress)}>
                      Chat
                    </Button>
                  )
                ) : isMobile ? (
                  <EditIconWrapper scale="sm" mr={10} onClick={() => router.push('/edit-profile')}>
                    <PencilOutlineIcon />
                  </EditIconWrapper>
                ) : (
                  <Button variant="default" scale="sm" mr={10} onClick={() => router.push('/edit-profile')}>
                    Edit
                  </Button>
                )}
              </ActionButtonWrapper>
            )}
          </DetailsWrapper>
        </CoverImageWrapper>
      </ProfileContainer>
    </EditProfileLayout>
  )
}

const Mobile = ({
  profileInfo = {},
  uploadCoverImage,
  uploadProfileImage,
  showChat = false,
  socialmedia,
  isEdit = false,
}: any) => {
  const { isMobile } = useMatchBreakpoints()
  const router = useRouter()

  function onChangeCoverImage(file: any) {
    uploadCoverImage(file)
  }
  function onChangePhotoImage(file: any) {
    uploadProfileImage(file)
  }

  const onClickChat = (address) => {
    window.open(`https://chat.blockscan.com/index?a=${address}`)
  }

  return (
    <EditProfileLayout>
      <ProfileContainer>
        <CoverImageWrapper>
          <CoverImage src={profileInfo?.coverImage} />
          {isEdit && (
            <Box position={'absolute'} top={'10px'} right={['15px', '15px', '40px']} zIndex={'2'}>
              <Box ml="auto" zIndex={'2'}>
                <UploadInput
                  id="cover-photo"
                  onChange={onChangeCoverImage}
                  customButton={() => (
                    <Button variant="default" scale="sm" height={'30px'}>
                      Upload Cover
                    </Button>
                  )}
                  maxSize={5}
                  accept={'image/png, image/jpeg, image/webp,  image/gif'}
                />
              </Box>
            </Box>
          )}
        </CoverImageWrapper>
        <Box>
          <Box alignItems="center">
            <MDescriptionSection justifyContent="space-between">
              <Box position="relative">
                {isEdit && (
                  <ProfileImageWrapper>
                    <UploadInput
                      id="profile-pic"
                      customButton={() => <PencilOutlineIcon />}
                      onChange={onChangePhotoImage}
                      maxSize={5}
                      accept={'image/png, image/jpeg, image/webp, image/gif'}
                    />
                  </ProfileImageWrapper>
                )}
                <ProfileImage>
                  {profileInfo?.profileImage ||
                    (profileInfo?.username && (
                      <ProfileAvatar
                        width={96}
                        height={96}
                        src={profileInfo?.profileImage}
                        walletAddress={profileInfo?.username}
                      />
                    ))}
                </ProfileImage>
              </Box>
              <Flex>
                <Flex alignItems="end">
                  {!isEdit && <ProfileLinks socialmedia={socialmedia} />}
                  {!isEdit && (
                    <>
                      {showChat ? (
                        <Button
                          variant="default"
                          scale="sm"
                          height={'30px'}
                          onClick={() => onClickChat(profileInfo?.walletAddress)}
                        >
                          Chat
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          scale="sm"
                          height={'30px'}
                          onClick={() => router.push('/edit-profile')}
                        >
                          Edit
                        </Button>
                      )}
                    </>
                  )}
                </Flex>
              </Flex>
            </MDescriptionSection>

            <Box ml={20}>
              <Flex alignItems="center">
                <Heading scale="lg" color="text">
                  {truncateUsername(profileInfo?.username)}
                </Heading>
              </Flex>
              <CopyAddress mt={10} address={profileInfo?.walletAddress} addressLength={6} />
            </Box>
          </Box>
        </Box>
      </ProfileContainer>
    </EditProfileLayout>
  )
}

const ProfileDescriptionSection = (props: any) => {
  const { isDesktop } = useMatchBreakpoints()

  return isDesktop ? <Desktop {...props} /> : <Mobile {...props} />
}

function ProfileLinks({ socialmedia }) {
  const { theme } = useTheme()
  const { instagram, discord, twitter } = socialmedia || {}
  return (
    <Flex>
      {instagram && (
        <Icon href={`${INSTAGRAM}${instagram}`} target="_blank">
          <InstagramIcon iconcolor={theme.colors.text} />
        </Icon>
      )}
      {discord && (
        <Icon href={`${DISCORD}${discord}`} target="_blank">
          <DiscordIcon iconcolor={theme.colors.text} />
        </Icon>
      )}
      {twitter && (
        <Icon href={`${TWITTER}${twitter}`} target="_blank">
          <TwitterIcon iconcolor={theme.colors.text} />
        </Icon>
      )}
    </Flex>
  )
}

const Icon = styled.a`
  display: flex;
  margin-right: 10px;
`

const MDescriptionSection = styled(Flex)`
  padding: 0 15px;
  margin-top: -45px;
  z-index: 1;
  position: relative;
  margin-bottom: 25px;
`

const ProfileImageWrapper = styled(Box)`
  position: absolute;
  right: 5px;
  top: -5px;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.background};
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  svg {
    height: 16px;
    width: 16px;
  }
  ${(p) => p.theme.media.xs} {
    right: 10px;
    top: 0px;
  }
`
const EditProfileLayout = styled.div`
  ${(p) => p.theme.media.xlg} {
    width: 100% !important;
  }
`

export default ProfileDescriptionSection
